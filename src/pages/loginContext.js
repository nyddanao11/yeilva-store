import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

// Create a custom Axios instance that will be configured for token handling
const apiClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true, // IMPORTANT: Allows sending the HTTP-only Refresh Token cookie
});

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    // Stores the short-lived Access Token in memory (not localStorage!)
    const [accessToken, setAccessToken] = useState(null);
    
    // Auth status is derived from whether we have an accessToken
    const isLoggedIn = !!accessToken;
    const [userEmail, setUserEmail] = useState(null);
    const isRefreshing = useRef(false);

    // --- Core Renewal Logic ---
    const refreshAccessToken = async () => {
        if (isRefreshing.current) return; // Prevent multiple simultaneous refresh calls
        isRefreshing.current = true;
        
        try {
            // This call relies on the browser automatically sending the long-lived, 
            // secure HTTP-only Refresh Token cookie to the server.
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/refresh`, {}, { withCredentials: true });
            
            const newAccessToken = response.data.token; // Server sends new access token
            
            // 1. Update the in-memory access token
            setAccessToken(newAccessToken);
            
            // 2. Decode for user info
            const decodedToken = jwtDecode(newAccessToken);
            if (decodedToken) {
                setUserEmail(decodedToken.email);
            }

            isRefreshing.current = false;
            return newAccessToken;

        } catch (error) {
            console.error("Token refresh failed. Forcing logout.", error);
            // If refresh fails (e.g., Refresh Token expired or revoked), force a full logout
            await logout(); 
            isRefreshing.current = false;
            throw error; // Propagate the error to the interceptor
        }
    };
    // ----------------------------


    // Login function updated to store token in state
    const login = async (email, password) => {
        try {
            // Step 1: Login call
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signin`, { email, password }, { withCredentials: true });
            
            const { token } = response.data; // This is the Access Token
            // NOTE: The Refresh Token MUST be set by the server as an HTTP-only cookie here.

            // Step 2: Store Access Token in state/memory
            setAccessToken(token);
            
            // Step 3: Extract and store user data
            const decodedToken = jwtDecode(token);
            if (decodedToken) {
                 setUserEmail(decodedToken.email);
            }
            
            return { success: true };
        } catch (error) {
            console.error('Login failed:', error);
            setAccessToken(null);
            setUserEmail(null);
            return { 
                success: false, 
                error: error.response?.data?.error || 'An unexpected error occurred.' 
            };
        }
    };

    // Logout function updated to hit the server endpoint to clear the HTTP-only cookie
    const logout = async () => {
        try {
            // Tell the server to revoke the Refresh Token (clear the HTTP-only cookie)
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/logout`, {}, { withCredentials: true });
        } catch (error) {
            console.error('Server-side logout failed (cookie clearance):', error);
        } finally {
            // Clear client-side state
            setAccessToken(null);
            setUserEmail(null);
        }
    };
    
    // --- Proactive Refresh on Window Focus (THE FIX) ---
    useEffect(() => {
        const handleWakeup = async () => {
            // Only run if the user thinks they are logged in and the access token is missing or null
            if (isLoggedIn && !accessToken) { 
                console.log("Window focused/woke up. Attempting proactive token refresh...");
                try {
                    // This call will fail silently if the Refresh Token is truly expired,
                    // and refreshAccessToken will handle the necessary logout.
                    await refreshAccessToken(); 
                } catch (error) {
                    // Error already handled and logged by refreshAccessToken.
                }
            }
        };

        // Listen for the window regaining focus
        window.addEventListener('focus', handleWakeup);
        
        // Clean up the event listener
        return () => {
            window.removeEventListener('focus', handleWakeup);
        };
        // We include dependencies here to ensure we capture the latest version of these values
    }, [isLoggedIn, accessToken, refreshAccessToken]); 


    // --- Axios Interceptor Setup ---
    useEffect(() => {
        let isMounted = true;
        
        // 1. REQUEST INTERCEPTOR: Attach the current Access Token to every request header
        const requestInterceptor = apiClient.interceptors.request.use(
            (config) => {
                if (accessToken) {
                    config.headers.Authorization = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // 2. RESPONSE INTERCEPTOR: Handle 401 Unauthorized errors (token expired)
        const responseInterceptor = apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                // Check if the token expired (401) and if we haven't already tried to refresh
                if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        // THIS IS THE LINE THAT WAS FAILING ON WAKE UP
                        const newAccessToken = await refreshAccessToken();
                        // Update the header of the original failed request with the new token
                        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                        
                        // Retry the original request
                        return apiClient(originalRequest);
                    } catch (refreshError) {
                        // Refresh failed (user truly needs to log in again)
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        // Initial check on mount: Use the refresh endpoint to see if a session is active
        const checkInitialSession = async () => {
            // Skip initial check if we already have a token (e.g., after login)
            if (accessToken) return;
            try {
                // Attempt to refresh. This relies on the long-lived HTTP-only cookie.
                await refreshAccessToken(); 
            } catch (error) {
                // No valid Refresh Token found. Session is not active.
                setAccessToken(null);
                setUserEmail(null);
            }
        };

        if (isMounted) {
            // Only run initial session check if we don't have an access token yet
            if (!accessToken) {
                checkInitialSession();
            }
        }
        
        // Cleanup function: Remove interceptors when the component unmounts
        return () => {
            isMounted = false;
            apiClient.interceptors.request.eject(requestInterceptor);
            apiClient.interceptors.response.eject(responseInterceptor);
        };
    }, [accessToken, refreshAccessToken]); // Rerun interceptor setup if accessToken or refreshFn changes
    // ----------------------------

    const contextValue = {
        isLoggedIn,
        login,
        logout,
        userEmail,
        accessToken,
        // Provide the configured client so all other components use it for API calls
        apiClient, 
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
