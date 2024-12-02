import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Card, Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchUserData } from '../components/userService';
import { useMediaQuery } from 'react-responsive';

export default function GcashToRecieved({isLoggedIn}) {
  const [showGcash, setShowGcash] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const [settlements, setSettlements] = useState({
    amount: 0,
  deadline: '',
  purpose: 'N/A',
  status:'',
  });
  const [error, setError] = useState('');
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });  
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  // Fetch user data
useEffect(() => {
  const storedUserEmail = localStorage.getItem('email');
  if (storedUserEmail) {
    fetchUserData(storedUserEmail.replace(/"/g, ''))
      .then((user) => setUserData(user))
      .catch((error) => console.error('Error fetching user data:', error));
  } else {
    console.log('Email is missing in local storage');
  }
}, []);
console.log('userData.emal', userData.email);

useEffect(() => {
  const fetchSettlements = async () => {
    if (!userData.email) return; // Ensure email exists before making the API call
    try {
      const response = await axios.get(`https://yeilva-store-server.up.railway.app/gcash_received`, {
        params: { email: userData.email }, // Use the `params` option for query parameters
      });
      setSettlements(response.data || {});
      setError('No transactions to settle');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred while fetching settlements');
      setSettlements({});
    }
  };

  fetchSettlements();
}, [userData.email]);


console.log('settlements', settlements);

  // Handle successful payment navigation
  useEffect(() => {
    if (paymentSuccessful) {
      navigate('/', { state: { ewalletStatus: true } });
    }
  }, [paymentSuccessful, navigate]);

  useEffect(()=>{
    if(!isLoggedIn){
      alert('Please login to continue!')
    }
  });


  const handleShow = () => {
    setShowGcash(true);
  };

  const handleClose = () => {
    setShowGcash(false);
  };

const isEmptyObject = (obj) => Object.keys(obj).length === 0;

const isButtonDisabled = !isLoggedIn || isEmptyObject(settlements);


  const submit = async () => {
    setLoading(true);
  
    const paymentData = {
      transactionCode: settlements.transaction_code,
      amount: settlements.amount,
      firstname: userData.firstname,
      lastname: userData.lastname,
      email: userData.email,
      deadline: settlements.deadline,
      purpose: settlements.purpose,
    };

    try {
      await axios.post('https://yeilva-store-server.up.railway.app/receivedgcash', paymentData);
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
                <p>Please Pay: <strong>₱{settlements.amount || 'N/A'}</strong></p>
                <p>Deadline: <strong>{settlements.deadline || 'No deadline specified'}</strong></p>
                <p>Purpose: <strong>{settlements.purpose || 'No purpose specified'}</strong></p>
                <p>Transaction Code: <strong>{settlements.transaction_code || 'No code specified'}</strong></p>

                <Button variant="primary" onClick={handleShow} disabled={isButtonDisabled}className="p-2 mt-3 mb-3">
                  <img
                    src={`${process.env.PUBLIC_URL}/images/gcashlogo.png`}
                    alt="GCash Logo"
                    style={{ width: '35px', height: '35px' }} 
                  />{' '}
                  Pay with GCash
                </Button>
              </div>

              <Modal show={showGcash} onHide={handleClose} centered>
                <Modal.Header closeButton>
                  <Modal.Title>GCash Payment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="text-center">
                    <p>Scan the QR code below to pay with GCash</p>
                     <p>or Pay through GCash account <strong>09497042268</strong></p>
                    <img
                      src={`${process.env.PUBLIC_URL}/images/gcashqrcode.jpg`}
                      alt="GCash QR Code"
                      className="img-fluid mb-3"
                      style={{ width: '250px', height: '250px' }}
                    />
                    <p>
                     <p>Please Pay: <strong>{settlements.amount || 'N/A'}</strong></p>
                      <strong>Transaction Code:</strong> {settlements.transaction_code || 'No code specified'}

                    </p>
                    {errorMessage && <p className="text-danger">{errorMessage}</p>}
                  </div>
                    <div className="w-100"  style={{ marginTop: '15px' }}>
                <p><strong>Reminder:</strong></p>
                <p>Please click <mark>Submit</mark> only after completing payment via the GCash app. An email will be sent once your payment is successfully verified.</p>
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
}
