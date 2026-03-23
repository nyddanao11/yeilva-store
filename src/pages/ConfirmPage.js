import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';

export default function ConfirmPage() {
  const [confirmationStatus, setConfirmationStatus] = useState('pending');
  const [resending, setResending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [resendMessage, setResendMessage] = useState(null);

  // Get email/token from URL (assuming email is passed or stored)
  const queryParams = new URLSearchParams(window.location.search);
  const token = queryParams.get('token');
  const email = queryParams.get('email'); // Best practice: include email in the URL or state

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.REACT_APP_SERVER_URL}/confirm?token=${token}`)
        .then(() => setConfirmationStatus('success'))
        .catch(() => setConfirmationStatus('error'));
    }
  }, [token]);

  // Cooldown timer logic
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    if (cooldown > 0) return;
    
    setResending(true);
    setResendMessage(null);
    try {
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/resend-confirmation`, { email });
      setResendMessage({ variant: 'success', text: 'A new link has been sent to your email!' });
      setCooldown(60); // Start 60s cooldown
    } catch (error) {
      const msg = error.response?.data?.error || "Failed to resend.";
      setResendMessage({ variant: 'danger', text: msg });
    } finally {
      setResending(false);
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
          
          {confirmationStatus === 'error' && (
            <Alert variant="danger" className="text-center shadow-sm">
              <h4>🚨 Verification Failed</h4>
              <p>The link is invalid or expired.</p>
              
              {resendMessage && <Alert variant={resendMessage.variant}>{resendMessage.text}</Alert>}

              <Button 
                variant="primary" 
                onClick={handleResend} 
                disabled={resending || cooldown > 0}
              >
                {resending ? <Spinner animation="border" size="sm" /> : 
                 cooldown > 0 ? `Wait ${cooldown}s` : "Resend Confirmation Email"}
              </Button>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}