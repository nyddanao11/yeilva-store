// src/OfflineIndicator.js
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

const OfflineIndicator = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const updateOnlineStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);

  return (
    !isOnline && (
      <Alert variant="danger">
        You are currently offline. Some features may not be available.
      </Alert>
    )
  );
};

export default OfflineIndicator;
