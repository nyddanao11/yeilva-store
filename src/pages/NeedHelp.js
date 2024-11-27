import React, { useState, useEffect } from 'react';
import { Form, Container, Row, Col, Button, Spinner, Card} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NeedHelp ()  {
  const [email, setEmail] = useState('');
  const [mainMessage, setMainMessage] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // State for tracking message type
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('https://yeilva-store-server.up.railway.app/api/messages', {
        email,
        mainMessage,
      });

      if (response.data.status === 'success') {
        setMessage('Message sent successfully');
        setMessageType('success'); // Set message type to success

        // Redirect to homepage after 3 seconds
        setTimeout(() => {
          navigate('/'); // Redirect to the homepage
        }, 3000); // 3-second delay
      } else {
        setMessage(response.data.error);
        setMessageType('error'); // Set message type to error
      }
    } catch (error) {
      setMessage('Error: Message not sent.');
      setMessageType('error'); // Set message type to error
    } finally {
      setLoading(false); // Stop loading
    }
  };

 return (
    <>
    <Container >
      <Row className="mt-4 d-flex justify-content-center align-items-center ">
        <Col sm={12} md={6} lg={6} style={{ maxWidth: '400px'}}>
           <Card className="mx-auto mt-4">
              <Card.Body className="p-4 shadow">
          <h3 className="text-center">Need Help?</h3>

          {message && (
            <p
              className="mt-3"
              style={{ color: messageType === 'success' ? 'green' : 'red' }} // Set color based on message type
            >
              {message}
            </p>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
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

            <Button
              variant="primary"
              type="submit"
              className="w-100 mt-3"
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
            </Button>
          </Form>
          </Card.Body>
          </Card>
        </Col>
      </Row>
     
    </Container>

     </>
  );
};

