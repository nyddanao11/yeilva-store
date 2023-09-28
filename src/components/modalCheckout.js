import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const SuccessModal = ({ show, onClose }) => {
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleClose = () => {
    onClose(); // Close the modal first
    navigate('/'); // Navigate to the home page
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Order Submitted Successfully</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your order has been submitted successfully. You will receive an email confirmation shortly.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
