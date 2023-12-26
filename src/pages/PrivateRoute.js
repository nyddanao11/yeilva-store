import React, { useEffect, useState } from 'react';
import { Route, Navigate } from 'react-router-dom';
import axios from 'axios';

const PrivateRoute = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // Send a request to a protected endpoint to check authentication
        const response = await axios.get('https://yeilva-store-server.up.railway.app/api/check-auth', { withCredentials: true });
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

export default PrivateRoute;
