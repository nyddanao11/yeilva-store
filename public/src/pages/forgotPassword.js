import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true); // Set loading to true during form submission

      // Make a request to your server to handle forgot password logic
      const response = await axios.post('http://localhost:3001/api/send-otp', {
        email: email,
      });

      if (response.data.status === 'success') {
        setMessage('An OTP has been sent to your email. Check your inbox.');

        navigate('/otpconfirmation', { state: { email: email } });
      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error('An error occurred during forgot password:', error);
      setMessage('Error: User not found. Please try again.');
    } finally {
      setLoading(false); // Set loading back to false after form submission
    }
  };

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Forgot Password</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </Form>

          {message && <p className="mt-3">{message}</p>}
        </Col>
      </Row>

      {/* Footer Section */}
      <section className="w-100 mt-4">
        <Footer />
      </section>
    </Container>
  );
};

export default ForgotPassword;
