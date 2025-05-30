import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

export default function PrivateRoute ({ element }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Send a request to a protected endpoint to check authentication
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/check-auth`, { withCredentials: true });
      //    console.log('Server response:', response.data);
      // console.log('Document cookies:', document.cookie);


        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  // While checking authentication, show a loading state
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/adminloginpage" />;
};

