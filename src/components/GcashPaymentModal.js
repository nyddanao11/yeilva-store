import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Col, Row, Spinner, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
// Corrected import path assumptions for relative structure
import { fetchUserData } from './userService'; 
import { useMediaQuery } from 'react-responsive';
import { useCart } from '../pages/CartContext'; 
import { useAuth} from '../pages/loginContext';

// Using an inline SVG icon as a fallback for FiCheckCircle
const CheckCircleIcon = ({ size, color, className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke={color} 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);


export default function GcashPaymentModal({ showGcash, setShowGcash }) {
    const{userEmail} = useAuth();
    const [selectedMethod, setSelectedMethod] = useState('gcash');
    const [transactionCode, setTransactionCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const { formattedGrandTotal } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });
    const [checkoutItemsFromNav, setCheckoutItemsFromNav] = useState([]);

    
    const qrCodes = {
        gcash: `${process.env.PUBLIC_URL}/images/nangcash.jpg`,
        bpi: `${process.env.PUBLIC_URL}/images/bpiqr.jpg`,
    };

    
    useEffect(() => {
        if (showGcash) {
            setTransactionCode(uuidv4().slice(0, 8).toUpperCase());
            setSelectedMethod('gcash'); // Reset to GCash every time the modal opens
        }
    }, [showGcash]);

   
    useEffect(() => {
       
        if (userEmail) {
            
            fetchUserData(userEmail.replace(/"/g, '')) 
                .then((user) => setUserData({ ...user }))
                .catch((error) => console.error('Error setting user data:', error));
        } else {
            console.log('Email is missing in local storage');
        }

        if (location.state && location.state.checkoutItems) {
            setCheckoutItemsFromNav(location.state.checkoutItems);
        } else {
            console.warn('GcashPaymentModal: No checkout items received via navigation state.');
        }
    }, [location.state]);

    const handleClose = () => {
        setShowGcash(false);
        setErrorMessage('');
        setPaymentSuccessful(false);
        setTransactionCode('');
        if (paymentSuccessful) {
            navigate('/checkoutform', {
                state: { ewalletStatus: true },
            });
        }
    };

    const gcashPaymentTotal = parseFloat(formattedGrandTotal.replace(/[^0-9.-]+/g, ''));

    const submit = async () => {
        setLoading(true);
        setErrorMessage('');

        const paymentData = {
            transactionCode,
            amount: gcashPaymentTotal,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
            payment_method: selectedMethod, 
        };

        try {
            await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/save-transaction-code`, paymentData);
            setPaymentSuccessful(true);
        } catch (error) {
            console.error('Error saving transaction code:', error);
            setErrorMessage('There was an issue saving your transaction. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    
    const currentMethodName = selectedMethod.toUpperCase();

    return (
        <Modal show={showGcash} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center">
                    Complete Your QR Payment
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="p-4">
                {errorMessage && (
                    <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                        {errorMessage}
                    </Alert>
                )}
                {paymentSuccessful ? (
                    <div className="text-center py-5">
                        <CheckCircleIcon size={60} color="green" className="mb-3" />
                        <h3>Payment Successful!</h3>
                        <p>Your payment has been successfully recorded. We will send an email once your transaction is verified.</p>
                        <Button variant="success" onClick={handleClose}>Done</Button>
                    </div>
                ) : (
                    <Container>
                        <Row className="mb-4">
                            <Col md={6} className="d-flex flex-column align-items-center">
                                {/* Payment Method Selection Buttons */}
                                <div className="btn-group mb-4 w-100" role="group">
                                    <Button
                                        variant={selectedMethod === 'gcash' ? 'success' : 'outline-success'}
                                        onClick={() => setSelectedMethod('gcash')}
                                        className="fw-bold"
                                    >
                                        GCash
                                    </Button>
                                    <Button
                                        variant={selectedMethod === 'bpi' ? 'primary' : 'outline-primary'}
                                        onClick={() => setSelectedMethod('bpi')}
                                        className="fw-bold"
                                    >
                                        BPI
                                    </Button>
                                </div>

                                <h5 className="text-center mb-3">Scan {currentMethodName} QR Code</h5>
                                {/* Dynamic QR Code Display */}
                                <div className="p-3 border rounded shadow-lg bg-white">
                                    <img 
                                        src={qrCodes[selectedMethod]} 
                                        alt={`${currentMethodName} QR Code`} 
                                        className="img-fluid"
                                        style={{ maxWidth: '250px', maxHeight: '250px' }}
                                    />
                                </div>
                                
                                <p className="mt-3 fs-4">Amount to Pay: <strong>{formattedGrandTotal}</strong></p>
                                <p>Transaction Code: <span className="text-primary fw-bold">{transactionCode}</span></p>
                            </Col>
                            <Col md={6}>
                                <div className="p-3">
                                    <h5 className="mb-3">Instructions for {currentMethodName}:</h5>
                                    <ol>
                                        <li>Open your **{currentMethodName}** app.</li>
                                        <li>Tap **Scan QR** (or similar function) and scan the code on the left.</li>
                                        <li>Enter the exact amount: **{formattedGrandTotal}**.</li>
                                        <li>Confirm the payment.</li>
                                        <li>After paying, click the **"I Have Paid"** button below to complete your order.</li>
                                    </ol>
                                    <p className="mt-4 text-muted fst-italic">
                                        Note: Do not close this window until you have submitted your payment confirmation.
                                    </p>
                                </div>
                            </Col>
                        </Row>
                        <Row className="justify-content-center">
                            <Col md={8}>
                                <Button
                                    variant="success"
                                    onClick={submit}
                                    disabled={loading}
                                    className="w-100 mb-3"
                                >
                                    {loading ? (
                                        <>
                                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Submitting...
                                        </>
                                    ) : 'I Have Paid'}
                                </Button>
                                <Button
                                    variant="outline-secondary"
                                    onClick={handleClose}
                                    className="w-100"
                                >
                                    Back to Checkout
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                )}
            </Modal.Body>
        </Modal>
    );
}
