import React, { useEffect, useState } from 'react';
import {Link} from'react-router-dom';
import { Container, Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';

export default function ConfirmPage () {
  const [confirmationStatus, setConfirmationStatus] = useState('pending');

  useEffect(() => {
  const token = new URLSearchParams(window.location.search).get('token');
  console.log(token);

  if (token) {
    // Define the server address (replace with your server's actual address)
    const serverAddress = `${process.env.REACT_APP_SERVER_URL}`;

    // Make the GET request using Axios
    axios.get(`${serverAddress}/confirm?token=${token}`)
      .then((response) => {
        const data = response.data;
        if (data.message === 'Email verified successfully') {
          setConfirmationStatus('success');
        } else {
          setConfirmationStatus('error');
        }
      })
      .catch((error) => {
        console.error('Error confirming email:', error);
        setConfirmationStatus('error');
      });
  }
}, []);

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
            <Alert variant="danger" className="text-center">
              <h4>🚨 Error</h4>
              <p>Error confirming your email. The link may be invalid or expired. Please request a new confirmation link.</p>
              <Button as={Link} to="/resend-confirmation" variant="danger">
                Resend Confirmation Email
              </Button>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
