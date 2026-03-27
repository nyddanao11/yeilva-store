import React, { useState } from 'react';
import { Form, Container, Row, Col, Button, Spinner, Card, Alert } from 'react-bootstrap';
import { FaEnvelope, FaComment, FaPaperPlane, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function NeedHelp() {
  const [email, setEmail] = useState('');
  const [mainMessage, setMainMessage] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(''); // Clear previous messages

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/messages`, {
        email,
        mainMessage,
      });

      if (response.data.status === 'success') {
        setMessage('Message sent successfully! We will get back to you shortly.');
        setMessageType('success');
        setTimeout(() => navigate('/'), 3000);
      } else {
        setMessage(response.data.message || 'Failed to send message.');
        setMessageType('danger');
      }
    } catch (error) {
      // Accessing the specific error message from your backend response
      const errMsg = error.response?.data?.message || 'Error: Connection lost.';
      setMessage(errMsg);
      setMessageType('danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          {/* Back Button */}
          <Link to="/" className="text-decoration-none text-muted small mb-3 d-inline-block">
            <FaArrowLeft className="me-1" /> Back to Home
          </Link>

          <Card className="border-0 shadow-lg rounded-4">
            <Card.Body className="p-4 p-md-5">
              <div className="text-center mb-4">
                <div className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '60px', height: '60px' }}>
                  <FaPaperPlane size={24} />
                </div>
                <h3 className="fw-bold">Need Help?</h3>
                <p className="text-muted">Send us a message and our team will reach out to you.</p>
              </div>

              {/* Enhanced Feedback UI */}
              {message && (
                <Alert variant={messageType} className="rounded-3 border-0 shadow-sm">
                  {message}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="fw-semibold small text-uppercase">
                    <FaEnvelope className="me-2 text-primary" /> Email Address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    className="py-2 border-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="mainMessage">
                  <Form.Label className="fw-semibold small text-uppercase">
                    <FaComment className="me-2 text-primary" /> How can we help?
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Describe your issue in detail..."
                    className="py-2 border-2"
                    value={mainMessage}
                    onChange={(e) => setMainMessage(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 py-3 rounded-3 fw-bold shadow-sm d-flex align-items-center justify-content-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>
          
          <p className="text-center mt-4 text-muted small">
            Typical response time: <strong>Under 24 hours</strong>
          </p>
        </Col>
      </Row>
    </Container>
  );
}