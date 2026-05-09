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

             {Array.isArray(downloadUrl) && downloadUrl.length > 0 ? (
                  downloadUrl.map((link, index) => (
                    <div key={index} className="d-flex justify-content-between align-items-center mb-3 p-3 border rounded bg-light">
                      <div className="me-3">
                        <strong className="d-block">{link.name}</strong>
                        <small className="text-muted">Digital Download</small>
                      </div>

                      {typeof link.url === 'string' && link.url.trim() !== '' ? (
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="btn btn-danger btn-sm px-3 shadow-sm"
                        >
                          📥 Download
                        </a>
                      ) : (
                        <span className="badge bg-warning text-dark">Link Pending</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center p-4">
                    <div className="spinner-border text-danger mb-2" role="status"></div>
                    <p>Preparing your download links...</p>
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