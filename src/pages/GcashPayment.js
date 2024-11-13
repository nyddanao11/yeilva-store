import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Card, Col, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { fetchUserData } from '../components/userService';

const GcashPaymentModal = ({ formattedGrandTotal }) => {
  const [showGcash, setShowGcash] = useState(false);
  const [transactionCode, setTransactionCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserEmail) {
      fetchUserData(storedUserEmail.replace(/"/g, ''))
        .then((user) => setUserData({ ...user }))
        .catch((error) => console.error('Error setting user data:', error));
    } else {
      console.log('Email is missing in local storage');
    }
  }, []);

  useEffect(() => {
    if (paymentSuccessful) {
      navigate('/checkoutform', { state: { ewalletStatus: true } });
    }
  }, [paymentSuccessful, navigate]);

  const generateTransactionCode = () => uuidv4().slice(0, 8).toUpperCase();

  const handleShow = () => {
    setTransactionCode(generateTransactionCode());
    setShowGcash(true);
  };

  const handleClose = () => {
    setShowGcash(false);
    setTransactionCode('');
  };

const gcashPaymentTotal = parseFloat(formattedGrandTotal.replace(/[^0-9.-]+/g, ''));


  const submit = async () => {
    setLoading(true);
    const newTransactionCode = transactionCode || generateTransactionCode();

    const paymentData = {
      transactionCode: newTransactionCode,
      amount: gcashPaymentTotal,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
    };
    console.log('paymentData', paymentData);
  
    try {
      await axios.post('https://yeilva-store-server.up.railway.app/api/save-transaction-code', paymentData);
      setPaymentSuccessful(true);
      alert('Transaction Code Successfully Saved!');
    } catch (error) {
      console.error('Error saving transaction code:', error);
      setErrorMessage('There was an issue saving your transaction. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
      <Row className="w-100">
        <Col lg={10} md={10} xs={12} className="mx-auto mt-4">
          <Card className="p-3 shadow">
            <Card.Body>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <Button variant="primary" onClick={handleShow} className="p-2">
                  <img src={`${process.env.PUBLIC_URL}/images/gcashlogo.png`} alt="GCash Logo" style={{ width: '35px', height: '35px' }} /> Pay with GCash
                </Button>
                <div style={{ lineHeight: '5px', marginTop: '25px' }}>
                  <p><strong>Reminder:</strong></p>
                  <p>Email will be sent after</p>
                  <p>Successful Payment Verification</p>
                </div>
                 <p style={{fontSize:'20px'}}>Please Pay: <strong>{formattedGrandTotal}</strong></p>
              </div>

              <Button variant="secondary" className="btn-sm mt-4 mb-2">
                <Link to="/checkoutform" style={{ textDecoration: 'none', color: 'white' }}>
                  Back to Checkout
                </Link>
              </Button>

              <Modal show={showGcash} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>GCash Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="text-center">
                    <div style={{ lineHeight: '5px' }}>
                      <p>Scan the QR code below to pay with GCash</p>
                      <p>or Pay through GCash account <strong>09497042268</strong></p>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/gcashqrcode.jpg`}
                      alt="GCash QR Code"
                      className="img-fluid mb-3"
                      style={{ width: '250px', height: '250px' }}
                    />
                    <p><strong>Transaction Code:</strong> {transactionCode}</p>
                    <p style={{fontSize:'20px'}}>Please Pay: <strong>{formattedGrandTotal}</strong></p>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="success" onClick={submit} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                </Modal.Footer>
              </Modal>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GcashPaymentModal;
