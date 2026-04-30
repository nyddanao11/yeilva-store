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

                {/* 🚀 NEW DOWNLOAD SECTION */}
                {downloadUrl && (
                    <div className="my-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px', border: '1px dashed #28a745' }}>
                        <h5 className="mb-3">Your Digital Product is Ready!</h5>
                        <Button 
                            variant="success" 
                            href={downloadUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="w-100 py-2 shadow-sm"
                        >
                            📥 Download Your Ebook Now
                        </Button>
                        <small className="text-muted d-block mt-2">
                            Link expires in 15 mins. We also sent a copy to your email.
                        </small>
                    </div>
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