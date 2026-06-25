import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Container, Row, Col, Spinner, Card, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './loginContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [serverMessage, setServerMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(true);
  const [recaptchaUnavailable, setRecaptchaUnavailable] = useState(false);

  const recaptchaRef = useRef(null);

  const handleOnLoad = () => {
    setIsRecaptchaLoading(false);
  };
  const GOOGLE_SITE_KEY = process.env.REACT_APP_GOOGLE_SITE_KEY;

  useEffect(() => {
    if (!GOOGLE_SITE_KEY) {
      // Keep the technical detail in the console for developers;
      // never show infra/config details to real users.
      console.error('REACT_APP_GOOGLE_SITE_KEY is missing from environment variables.');
      setRecaptchaUnavailable(true);
      setIsRecaptchaLoading(false);
    }
  }, [GOOGLE_SITE_KEY]);

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  const resetCaptcha = () => {
    setCaptchaToken(null);
    recaptchaRef.current?.reset?.();
  };

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (serverMessage.type === 'success' && serverMessage.text) {
      const timer = setTimeout(() => {
        setServerMessage({ type: '', text: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [serverMessage]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const handleTogglePasswordKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      togglePasswordVisibility();
    }
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
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setValidationErrors(prev => ({ ...prev, [name]: '' }));
    if (serverMessage.type === 'danger') {
      setServerMessage({ type: '', text: '' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    if (!captchaToken) {
      setServerMessage({ type: 'danger', text: 'Please complete the reCAPTCHA.' });
      return;
    }

    setLoading(true);
    setServerMessage({ type: '', text: '' });

    try {
      const result = await login(formData.email, formData.password, captchaToken);

      if (result.success) {
        setServerMessage({ type: 'success', text: 'Login successful. Redirecting...' });
        // Brief pause so the success message is actually visible before navigating away.
        setTimeout(() => navigate('/'), 600);
      } else {
        setServerMessage({ type: 'danger', text: result.error });
        // The token is single-use and may now be stale/expired — force re-verification
        // so the next attempt isn't silently rejected by a reused captcha token.
        resetCaptcha();
      }
    } catch (error) {
      console.error('An unexpected error occurred during login:', error);
      setServerMessage({ type: 'danger', text: 'An unexpected error occurred. Please try again.' });
      resetCaptcha();
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

                {serverMessage.text && (
                  <Alert variant={serverMessage.type} className="mb-3" role="alert" aria-live="polite">
                    {serverMessage.text}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      isInvalid={!!validationErrors.email}
                      aria-describedby="email-error"
                      required
                    />
                    <Form.Control.Feedback type="invalid" id="email-error">
                      {validationErrors.email}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <InputGroup className="mb-3 has-validation">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        name="password"
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleInputChange}
                        isInvalid={!!validationErrors.password}
                        aria-describedby="password-error"
                        required
                      />
                      <InputGroup.Text
                        onClick={togglePasswordVisibility}
                        onKeyDown={handleTogglePasswordKeyDown}
                        role="button"
                        tabIndex={0}
                        style={{ cursor: "pointer", background: '#E8F0FE' }}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      >
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                      </InputGroup.Text>
                      <Form.Control.Feedback type="invalid" id="password-error">
                        {validationErrors.password}
                      </Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <div className="mb-3">
                    {isRecaptchaLoading && !recaptchaUnavailable && (
                      <div
                        className="d-flex align-items-center justify-content-center border rounded bg-light"
                        style={{ width: "304px", height: "78px", margin: "0 auto" }}
                      >
                        <Spinner animation="border" size="sm" variant="secondary" className="me-2" />
                        <span className="text-muted small">Loading Security...</span>
                      </div>
                    )}

                    <div
                      className="mb-3 d-flex justify-content-center"
                      style={{ display: isRecaptchaLoading ? 'none' : 'flex' }}
                    >
                      {GOOGLE_SITE_KEY ? (
                        <ReCAPTCHA
                          ref={recaptchaRef}
                          sitekey={GOOGLE_SITE_KEY}
                          asyncScriptOnLoad={handleOnLoad}
                          onChange={handleCaptchaChange}
                        />
                      ) : (
                        <div className="p-3 border rounded border-warning text-muted bg-light small text-center">
                          Security verification is temporarily unavailable. Please try again shortly or contact support.
                        </div>
                      )}
                    </div>
                  </div>

                  <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading || isRecaptchaLoading || !captchaToken}>
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
