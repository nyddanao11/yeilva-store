import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router

const LoanFormModal = ({ show, onClose }) => {
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleClose = () => {
    onClose(); // Close the modal first
    navigate('/'); // Navigate to the home page
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Application Submitted Successfully</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Your Loan Application has been submitted successfully. You will receive an email or Text to Confirm the status of your application.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default LoanFormModal;
