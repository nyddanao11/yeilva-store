// NotFoundPage.js
import React from 'react';
import { Alert } from 'react-bootstrap';

const NotFoundPage = () => {
  return (
    <div className="mt-3">
      <Alert variant="danger">
        <Alert.Heading>404 - Not Found</Alert.Heading>
        <p>The page you are looking for does not exist.</p>
      </Alert>

      <Alert variant="warning">
        <Alert.Heading>Route Restriction</Alert.Heading>
        <p>
          Access to this route is restricted. Please check your permissions.
        </p>
      </Alert>

      {/* Add more alerts for different scenarios as needed */}
    </div>
  );
};

export default NotFoundPage;
