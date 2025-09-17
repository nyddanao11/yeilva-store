import React, { useState, useEffect } from 'react';
import { Button, Modal, Container, Card, Col, Row } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import { fetchUserData } from '../components/userService';
import { useMediaQuery } from 'react-responsive';
import { useCart } from './CartContext'; // Correct path to your context

export default function GcashPaymentModal () {
  const [showGcash, setShowGcash] = useState(false);
  const [transactionCode, setTransactionCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentSuccessful, setPaymentSuccessful] = useState(false);
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
 const {formattedGrandTotal} = useCart();
  const navigate = useNavigate();
   const location = useLocation(); // <--- NEW: Get location object
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

const [checkoutItemsFromNav, setCheckoutItemsFromNav] = useState([]); // <--- NEW STATE: To store items

 useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserEmail) {
      fetchUserData(storedUserEmail.replace(/"/g, ''))
        .then((user) => setUserData({ ...user }))
        .catch((error) => console.error('Error setting user data:', error));
    } else {
      console.log('Email is missing in local storage');
    }

    // <--- NEW: Retrieve checkoutItems when GcashPaymentModal mounts
    if (location.state && location.state.checkoutItems) {
      setCheckoutItemsFromNav(location.state.checkoutItems);
    } else {
      console.warn('GcashPaymentModal: No checkout items received via navigation state.');
      // You might want to add logic here to handle this case, e.g., redirect to cart
    }

  }, [location.state]); // Add location.state to dependency array


  useEffect(() => {
    if (paymentSuccessful) {
      navigate('/checkoutform', {
        state: {
          ewalletStatus: true,
        },
      });
    }
  }, [paymentSuccessful, navigate, checkoutItemsFromNav]); // Add checkoutItemsFromNav to dependency array

const backToCheckout=()=>{
  navigate('/checkoutform')
};

  const generateTransactionCode = () => uuidv4().slice(0, 8).toUpperCase();

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
      // You might want to send checkoutItems here too for backend record keeping
      // checkoutItems: checkoutItemsFromNav,
    };
    console.log('paymentData', paymentData);
  
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/save-transaction-code`, paymentData);
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
        <Col lg={10} md={10} xs={12} className="mx-auto mt-2">
          <Card className="p-3 shadow">
            <Card.Body>
              <div className="d-flex flex-column justify-content-center align-items-center">
              
               
                <div className={isSmallScreen ? "w-100" : "w-50"} style={{ marginTop: '25px' }}>
                <p><strong>Reminder:</strong></p>
                <p>Please click <strong><mark>Submit</mark></strong> only after completing payment via the E-Wallet(gcash, Maya,etc..) and bank(BPI,BDO,etc..) app.
                 An email will be sent once your payment is successfully verified.</p>
               </div>

                 <p style={{fontSize:'25px', marginTop:'10px'}}>Please Pay: <strong>{formattedGrandTotal}</strong></p>
                   <div className="p-2 mt-2 mb-3">
                  <img src={`${process.env.PUBLIC_URL}/images/qrph.jpg`} alt="QR ph" style={{width:"360px", heigth:"auto" }} /> 
                </div>

              </div>
              <div className="d-flex flex-column justify-content-center align-items-center">
                <Button variant="success" onClick={submit} disabled={loading} style={{width:"100%", marginBottom:"10px", marginTop:"10px"}}>
                    {loading ? 'Submitting...' : 'Submit'}
                  </Button>

                  <Button variant="outline-secondary" onClick={backToCheckout} className=" mt-3 mb-2" style={{width:"100%", marginBottom:"10px", marginTop:"10px"}}>
                    Back to Checkout
                  </Button>
              
             </div>

              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

