import React, { useState } from 'react';
import { Form, Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NeedHelp = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // New state to track message type
  const [loading, setLoading] = useState(false);
  const [mainMessage, setMainMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://yeilva-store-server.up.railway.app/api/messages', {
        email,
        mainMessage,
      });

      if (response.data.status === 'success') {
        setMessage('Message sent successfully');
        setMessageType('success'); // Success message type
      } else {
        setMessage(response.data.error);
        setMessageType('error'); // Error message type
      }
    } catch (error) {
      setMessage('Error: Message not sent.');
      setMessageType('error'); // Error message type
    } finally {
      setLoading(false); // Reset loading
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col sm={12} md={6}>
          <h2>Need Help?</h2>

          {message && (
            <p
              className="mt-3"
              style={{ color: messageType === 'success' ? 'green' : 'red' }} // Conditional styling based on message type
            >
              {message}
            </p>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="mainMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter your message"
                value={mainMessage}
                onChange={(e) => setMainMessage(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </Form>
        </Col>
      </Row>
      <Footer />
    </Container>
  );
};

export default NeedHelp;
