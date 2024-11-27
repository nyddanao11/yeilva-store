import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ChangePassword () {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
    const location = useLocation();

  // Retrieve email from location state
  const email = location.state?.email || '';
   console.log('Location State:', location.state);
   console.log('Email:', email);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add additional client-side validation as needed
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      // Make a request to your server to handle password change logic
      const response = await axios.post('https://yeilva-store-server.up.railway.app/change-password', {
        email: email,
        password: password,
      });

      if (response.data.status === 'success') {
        setMessage('Password changed successfully');

      navigate('/login');

      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error('An error occurred during password change:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

 
  return (
    <Container className="py-4 border">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Change Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="password">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Change Password
            </Button>
          </Form>

          {message && <p className="mt-3">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};

