import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Card, Col, Row, Spinner, Alert } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchUserData } from '../components/userService';
import { useMediaQuery } from 'react-responsive';
import { useCart } from '../pages/CartContext';
import { FiCheckCircle } from 'react-icons/fi';

export default function GcashPaymentModal({ showGcash, setShowGcash }) {
    const [transactionCode, setTransactionCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const { formattedGrandTotal } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });
    const [checkoutItemsFromNav, setCheckoutItemsFromNav] = useState([]);

    useEffect(() => {
        const storedUserEmail = localStorage.getItem('email');
        if (storedUserEmail) {
            fetchUserData(storedUserEmail.replace(/"/g, ''))
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

    useEffect(() => {
        if (paymentSuccessful) {
            navigate('/checkoutform', {
                state: {
                    ewalletStatus: true,
                },
            });
        }
    }, [paymentSuccessful, navigate]);

    const handleClose = () => {
        setShowGcash(false);
        setErrorMessage('');
        setPaymentSuccessful(false);
    };

    const gcashPaymentTotal = parseFloat(formattedGrandTotal.replace(/[^0-9.-]+/g, ''));

    const submit = async () => {
        setLoading(true);
        setErrorMessage('');
        const newTransactionCode = transactionCode || uuidv4().slice(0, 8).toUpperCase();

        const paymentData = {
            transactionCode: newTransactionCode,
            amount: gcashPaymentTotal,
            firstname: userData.firstname,
            lastname: userData.lastname,
            email: userData.email,
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

    return (
        <Modal show={showGcash} onHide={handleClose} centered size="lg">
            <Modal.Header closeButton>
                <Modal.Title className="d-flex align-items-center">
                   
                    Complete Your Payment
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
                        <FiCheckCircle size={60} color="green" className="mb-3" />
                        <h3>Payment Successful!</h3>
                        <p>Your payment has been successfully recorded. You will receive an email once your transaction is verified.</p>
                        <Button variant="success" onClick={handleClose}>Done</Button>
                    </div>
                ) : (
                    <Container>
                        <Row className="mb-4">
                            <Col md={6} className="d-flex flex-column align-items-center">
                                <h5 className="text-center mb-3">Scan to Pay</h5>
                                <div className="p-3 border rounded shadow-sm">
                                    <img src={`${process.env.PUBLIC_URL}/images/qrph.jpg`} alt="QR ph" className="img-fluid" />
                                </div>
                                <p className="mt-3 fs-4">Amount to Pay: <strong>{formattedGrandTotal}</strong></p>
                            </Col>
                            <Col md={6}>
                                <div className="p-3">
                                    <h5 className="mb-3">Instructions:</h5>
                                    <ol>
                                        <li>Open your **E-Wallet or Bank** app.</li>
                                        <li>Tap **"Scan QR"** and scan the code on the left.</li>
                                        <li>Enter the exact amount: **{formattedGrandTotal}**.</li>
                                        <li>Confirm the payment.</li>
                                        <li>After paying, click the **"I Have Paid"** button below to complete your order.</li>
                                    </ol>
                                    <p className="mt-4 text-muted fst-italic">
                                        Note: Do not refresh this page or close the window until you have submitted your payment confirmation.
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
};