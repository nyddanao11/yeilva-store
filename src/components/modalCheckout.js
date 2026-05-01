// Inside modalCheckout.js (SuccessModal component)

import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const SuccessModal = ({ show, onClose, downloadUrl}) => {
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

                {downloadUrl && downloadUrl.length > 0 ? (
                  downloadUrl.map((link, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-2 border rounded">
                      <span>{link.name}</span>
                      {/* 🟢 Check if link.url exists and is a string before rendering */}
                      {typeof link.url === 'string' ? (
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-primary btn-sm"
                        >
                          📥 Download Your Ebook Now
                        </a>
                      ) : (
                        <span className="text-danger small">Link Generation Failed</span>
                      )}
                    </div>
                  ))
                ) : (
                  <p>Processing your items...</p>
                )}
             
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