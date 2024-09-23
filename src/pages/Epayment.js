import React, { useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Epayment = () => {
  const [ewalletStatus, setEwalletStatus] = useState(false); // Assume payment status starts as false
    const [paymentSuccessful, setPaymentSuccessful] = useState(false);

  const navigate = useNavigate();

  const gcashPayment = () => {
   
    if (paymentSuccessful === true) {
      setEwalletStatus(true);
      console.log("E-wallet payment status set to true");
      // Navigate back to checkout with ewalletStatus as true
      navigate('/checkoutform', { state: { ewalletStatus: true } });
    } else {
      setEwalletStatus(false);
      console.log("E-wallet payment not completed");
      alert("E-wallet payment is not completed. Please try again.");
    }
  };


  return (
    <div>
      {ewalletStatus ? (
      	<>
        <Alert variant="success">
          <Alert.Heading>Payment Successful</Alert.Heading>
          <p>Your payment was successful!</p>
        </Alert>

         <Button
        variant="success"
        style={{ marginTop: '15px', marginBottom: '10px', marginRight: '10px' }}
        onClick={gcashPayment}
        disabled ={ewalletStatus}
      >
        Confirm Payment Status
      </Button>
      </>
      ) : (
      <>
        <Alert variant="danger">
          <Alert.Heading>Payment Unsuccessful</Alert.Heading>
          <p> Sorry this Service is not yet Available.</p>
        </Alert>

         <Button
        variant="danger"
        style={{ marginTop: '15px', marginBottom: '10px', marginRight: '10px' }}
        onClick={gcashPayment}
        disabled ={!ewalletStatus}
        
      >
        Confirm Payment Status
      </Button>
      </>
      )}

      <Button
        variant="primary"
        style={{ marginTop: '15px', marginBottom: '10px' }}
      >
        <Link to="/checkoutform" style={{ textDecoration: 'none', color: 'white' }}>
          Back to Checkout
        </Link>
      </Button>
    </div>
  );
};

export default Epayment;
