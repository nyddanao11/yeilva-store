import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login
  const login = () => {
    // Perform your login logic here, e.g., set a token in local storage.
     localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const logout = () => {
    // Perform your logout logic here, e.g., remove the token from local storage.
     localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Check if the user is logged in based on data in local storage.
    const storedLoginState = localStorage.getItem('isLoggedIn');
    if (storedLoginState === 'true') {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array to run this effect only once on component mount

  // Update the context value with login and logout functions
  const contextValue = {
    isLoggedIn,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
