import React, { useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';

const AlertEmptyCart = ({ onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, [onClose]);

  return (
    <Alert variant="danger" className="d-flex justify-content-between align-items-center mt-3" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000 }}>
      <div>
        <Alert.Heading>Empty Cart</Alert.Heading>
        <p>Your cart is empty. Please add items to proceed.</p>
      </div>
      <Button variant="outline-danger" size="sm" onClick={onClose}>X</Button>
    </Alert>
  );
};

export default AlertEmptyCart;
