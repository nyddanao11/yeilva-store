import React, { useEffect } from 'react';
import { Alert, Button } from 'react-bootstrap';

const AlertFreeShipping = ({ onClose }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // Auto close after 5 seconds

    return () => clearTimeout(timer); // Clear timer if component unmounts
  }, [onClose]);

  return (
    <Alert variant="success" className="d-flex justify-content-between align-items-center mt-3" style={{ position: 'fixed', top: '20px', right: '20px', zIndex: 1000}}>
      <div >
        <Alert.Heading>YeilvaSTORE</Alert.Heading>
        <p>You have reached the Free Shipping Threshold!</p>
      </div>
      <div style={{marginLeft:"15px"}}>
      <Button variant="outline-success" size="sm"  onClick={onClose}>X</Button>
      </div>
    </Alert>
  );
};

export default AlertFreeShipping;
