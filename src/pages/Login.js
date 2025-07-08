import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner, Card, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './loginContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';

export default function Login({ handleLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' }); // { type: 'success' | 'danger', text: 'message' }
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // For client-side validation errors

  const { login } = useAuth();
  const navigate = useNavigate();

  // Effect to clear server message after a few seconds if it's a success message
  useEffect(() => {
    if (serverMessage.type === 'success' && serverMessage.text) {
      const timer = setTimeout(() => {
        setServerMessage({ type: '', text: '' });
      }, 3000); // Clear success message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [serverMessage]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid.';
    }
    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) { // Example: minimum password length
        errors.password = 'Password must be at least 6 characters.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear validation error for the specific field as user types
    setValidationErrors(prev => ({ ...prev, [name]: '' }));
    // Clear server message on input change if it was an error
    if (serverMessage.type === 'danger') {
        setServerMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      setServerMessage({ type: 'danger', text: 'Please correct the errors in the form.' });
      return;
    }

    setLoading(true);
    setServerMessage({ type: '', text: '' }); // Clear previous server messages

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/signin`, {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === 'success') {
        // Storing email in localStorage is generally okay, but be mindful of sensitive data
        localStorage.setItem('email', JSON.stringify(response.data.email));
        // You might consider storing a non-sensitive flag or session ID, not tokens
        setServerMessage({ type: 'success', text: 'Login successful. Redirecting...' });
        login(response.data.email);
        handleLogin(); // This should trigger the parent's login logic, likely a redirect
      } else {
        setServerMessage({ type: 'danger', text: response.data.error || 'Login failed. Please try again.' });
      }
    } catch (error) {
      console.error('An error occurred during login:', error);

      if (error.response && error.response.data && error.response.data.error) {
        setServerMessage({ type: 'danger', text: error.response.data.error });
      } else {
        setServerMessage({ type: 'danger', text: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-page-container'>
      <Container className="h-100 d-flex align-items-center justify-content-center py-5">
        <Row className="w-100">
          <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0 d-flex flex-column justify-content-center align-items-center align-items-md-start">
            <div className="login-intro-content">
              <h1 className="display-4 fw-bold mb-3">
                WELCOME <br />BACK
              </h1>
              <p className="lead text-muted mb-4">
                Sign in to your account to continue your journey!
              </p>
              <p className="text-muted mb-2">
                Don't have an account? <Link to="/signupform" style={{ textDecoration: 'none' }}>Sign up</Link>
              </p>
              <p className="text-muted">
                <Link to="/needhelp" className="login-link">Need help?</Link>
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} style={{ maxWidth: '400px' }}>
            <Card className="mx-auto mt-4 shadow-lg border-0 rounded-lg">
              <Card.Body className="p-4 ">
                <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h4>

                {/* Server Response Messages */}
                {serverMessage.text && (
                  <Alert variant={serverMessage.type} className="mb-3">
                    {serverMessage.text}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isInvalid={!!validationErrors.email} // Highlight invalid input
                      aria-describedby="email-error" // For accessibility
                      required
                    />
                    <Form.Control.Feedback type="invalid" id="email-error">
                      {validationErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        isInvalid={!!validationErrors.password} // Highlight invalid input
                        aria-describedby="password-error" // For accessibility
                        required
                      />
                      <InputGroup.Text
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer", background: '#E8F0FE' }}
                        aria-label={showPassword ? "Hide password" : "Show password"} // For accessibility
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid" id="password-error">
                        {validationErrors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Logging in...
                      </>
                    ) : (
                      'Log in'
                    )}
                  </Button>
                </Form>

                <div className="mt-3 text-center">
                  <p>
                    <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>Forgot password?</Link>
                  </p>
                  {/* This "Don't have an account?" is redundant on desktop as it's shown on the left */}
                  <p className="d-md-none">
                    Don't have an account? <Link to="/signupform" style={{ textDecoration: 'none' }}>Sign up</Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}