// Inside modalCheckout.js (SuccessModal component)

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SuccessModal = ({ show, onClose}) => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleCloseAndNavigate = () => {
        onClose(); // This will set showModal to false in CheckoutForm
        navigate('/'); // Or wherever you want to go after success
    };

    return (
        <Modal show={show} onHide={handleCloseAndNavigate} centered>
            <Modal.Header closeButton>
                <Modal.Title>Order Placed Successfully!</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
                <p>Your order has been placed successfully.</p>
             
                <p>Thank you for your purchase!</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCloseAndNavigate}>
                    Continue Shopping
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;