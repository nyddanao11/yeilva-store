import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userEmail, setUserEmail] = useState(null);

  // The login function now handles the API call
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signin`, { email, password });
      
      const { token } = response.data;
      
      localStorage.setItem('authToken', token);
      
      const decodedToken = jwtDecode(token);
      setUserEmail(decodedToken.email);
      
      setIsLoggedIn(true);
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      setIsLoggedIn(false);
      // Return a structured error response
      return { 
        success: false, 
        error: error.response?.data?.error || 'An unexpected error occurred.'
      };
    }
  };

  const logout = async () => {
    try {
      await axios.post('/api/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUserEmail(null);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // This call also validates the token
          const response = await axios.get('/api/check-auth', {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (response.status === 200) {
            const decodedToken = jwtDecode(token);
            setUserEmail(decodedToken.email);
            setIsLoggedIn(true);
          }
        } catch (error) {
          console.error('Authentication check failed:', error);
          localStorage.removeItem('authToken');
          setUserEmail(null);
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    };
    
    checkAuthStatus();
  }, []);

  const contextValue = {
    isLoggedIn,
    login,
    logout,
    userEmail,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};