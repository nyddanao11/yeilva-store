import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Spinner, Alert, Modal, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { FiCreditCard,FiBook, FiPhone } from 'react-icons/fi'; // Import icons for better visuals

const CheckoutButton = () => {
    const [loading, setLoading] = useState(false);
    const [voucherCode, setVoucherCode] = useState('');
    const [error, setError] = useState(null);
    const [showPaymentOptions, setShowPaymentOptions] = useState(false); // State to control the modal
    const { cartItems } = useCart();
    const navigate = useNavigate();

    // The function to create a checkout session for card payment
    const createAndRedirect = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/create-checkout-session`, {
                data: {
                    attributes: {
                        line_items: cartItems,
                        voucher_code: voucherCode,
                    },
                },
            });
            const checkoutUrl = response.data.data.attributes.checkout_url;
            window.location.href = checkoutUrl;
        } catch (err) {
            console.error('Error creating checkout session:', err.response ? err.response.data : err.message);
            setLoading(false);
            setError('An error occurred. Please try again or contact support.');
        }
    };

    // New function to handle the Gcash payment button click
    const handleGcashPayment = () => {
        setShowPaymentOptions(false); // Close the modal
        navigate('/gcash-payment'); // Navigate to the Gcash payment component
    };

    return (
        <>
            <div className="d-grid gap-2 p-4 border rounded shadow-sm bg-light">
                {error && <Alert variant="danger" className="text-center">{error}</Alert>}
                <h4 className="text-center mb-3">Proceed to Payment</h4>
                
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter voucher code"
                        value={voucherCode}
                        onChange={(e) => setVoucherCode(e.target.value)}
                    />
                </Form.Group>
                
                <Button
                    variant="success"
                    size="lg"
                    onClick={() => setShowPaymentOptions(true)} // Open the modal instead of redirecting
                    disabled={loading || cartItems.length === 0}
                >
                    {loading ? (
                        <>
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                            <span className="ms-2">Processing...</span>
                        </>
                    ) : (
                        'Select Payment Method'
                    )}
                </Button>
                
                <Link to="/checkoutform" className="text-decoration-none">
                    <Button variant="link" className="w-100 text-muted">
                        Back to Checkout
                    </Button>
                </Link>
            </div>

            {/* Payment Options Modal */}
            <Modal show={showPaymentOptions} onHide={() => setShowPaymentOptions(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Choose Your Payment Method</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p className="text-center text-muted">Select an option below to complete your order securely.</p>
                    <Row xs={1} md={2} className="g-3 text-center">
                        <Col>
                            <Card className="h-100 shadow-sm p-3 hover-effect" onClick={createAndRedirect} style={{ cursor: 'pointer' }}>
                                <FiCreditCard size={40} className="text-primary mb-2 mx-auto" />
                                <Card.Title>Credit/Debit Card</Card.Title>
                                <Card.Text className="text-muted">
                                    Pay securely using your Mastercard, Visa, etc.
                                </Card.Text>
                            </Card>
                        </Col>
                        <Col>
                            <Card className="h-100 shadow-sm p-3 hover-effect" onClick={createAndRedirect} style={{ cursor: 'pointer' }}>
                                <FiPhone size={40} className="text-success mb-2 mx-auto" />
                                <Card.Title>E-Wallets (Gcash/Maya)</Card.Title>
                                <Card.Text className="text-muted">
                                    Pay via QR code or bank transfer.
                                </Card.Text>
                            </Card>
                        </Col>
                        {/* You can add more options like Bank Transfer */}
                        <Col className="mt-3">
                            <Card className="h-100 shadow-sm p-3 hover-effect" onClick={createAndRedirect} style={{ cursor: 'pointer' }}>
                                <FiBook size={40} className="text-info mb-2 mx-auto" />
                                <Card.Title>Bank Transfer</Card.Title>
                                <Card.Text className="text-muted">
                                    Transfer directly from your bank account.
                                </Card.Text>
                            </Card>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default CheckoutButton;