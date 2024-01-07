import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const OTPConfirmation = () => {
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || ''; // Retrieve email from location state
  console.log('Location State:', location.state);
console.log('Email:', email);

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('https://yeilva-store-server.up.railway.app/verify-otp', {
      email: email,
      otp: otp,
    });

    if (response.data.status === 'success') {
      setMessage('OTP verified successfully. You can reset your password now.');
      // Redirect or perform further actions upon successful OTP verification
     navigate('/changepassword', { state: { email: email } });
    } else {
      setMessage(response.data.error);
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      setMessage(`Error: ${error.response.status} - ${error.response.data.error}`);
    } else if (error.request) {
      // The request was made but no response was received
      setMessage('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an Error
      setMessage(`Error: ${error.message}`);
    }
  }
};


  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>OTP Confirmation</h2>
          <p>Enter the OTP sent to your email to verify your identity.</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="otp">
              <Form.Label>OTP</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Verify OTP
            </Button>
          </Form>

          {message && <p className="mt-3">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

export default OTPConfirmation;
