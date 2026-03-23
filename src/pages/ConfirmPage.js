import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import {Link} from'react-router-dom';

export default function ConfirmPage() {
  const [confirmationStatus, setConfirmationStatus] = useState('pending');
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(0); // Seconds remaining
  const [resendSuccess, setResendSuccess] = useState(false);

  // 1. Logic for the Countdown Timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setResendSuccess(false); // Reset success message when timer hits 0
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // 2. Initial Confirmation Logic
  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/confirm?token=${token}`)
        .then(() => setConfirmationStatus('success'))
        .catch(() => setConfirmationStatus('error'));
    }
  }, []);

  // 3. Resend Function
  const handleResend = async () => {
    const email = new URLSearchParams(window.location.search).get('email');
    
    setIsResending(true);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/resend-confirmation`, { email });
      setResendSuccess(true);
      setCountdown(60); // Set 60-second cooldown
    } catch (error) {
      alert(error.response?.data?.error || "Check your connection and try again.");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>

         {confirmationStatus === 'pending' && (
            <Alert variant="info" className="text-center">
              <Spinner animation="border" size="sm" className="me-2" />
              Confirmation in progress...
            </Alert>
          )}

          {confirmationStatus === 'success' && (
            <Alert variant="success" className="text-center">
              <h4>🎉 Success!</h4>
              <p>Your email has been confirmed. You can now log in.</p>
              <Button as={Link} to="/login" variant="success">
                Go to Login
              </Button>
            </Alert>
          )}
          
          {/* ERROR STATE WITH COUNTDOWN */}
          {confirmationStatus === 'error' && (
            <Alert variant="danger" className="text-center shadow-sm">
              <h4>🚨 Link Expired</h4>
              <p>This verification link is no longer valid. Don't worry, you can request a new one below.</p>
              
              {resendSuccess && (
                <Alert variant="success" className="py-2">
                  ✅ A new link is on its way to your inbox!
                </Alert>
              )}

              <div className="d-grid gap-2 mt-3">
                <Button 
                  variant="primary" 
                  onClick={handleResend} 
                  disabled={isResending || countdown > 0}
                >
                  {isResending ? (
                    <><Spinner animation="border" size="sm" className="me-2" /> Sending...</>
                  ) : countdown > 0 ? (
                    `Resend available in ${countdown}s`
                  ) : (
                    "Resend Confirmation Email"
                  )}
                </Button>
                
                {countdown > 0 && (
                  <small className="text-muted mt-2">
                    Please check your spam folder if you don't see it within a minute.
                  </small>
                )}
              </div>
            </Alert>
          )}

          {/* ... Handle Pending and Success states similarly ... */}
        </Col>
      </Row>
    </Container>
  );
}