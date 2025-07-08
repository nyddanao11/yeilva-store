import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner, Card, InputGroup, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './SignupForm.css';

// You might want to define some constants for styling or text
const BRAND_COLOR_PRIMARY = '#007bff'; // Example primary color
const BRAND_COLOR_SECONDARY = '#6c757d'; // Example secondary color

export default function SignUpForm() {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const [serverResponse, setServerResponse] = useState('');
    const [isSignupSuccessful, setIsSignupSuccessful] = useState(false); // Renamed for clarity
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev); // Use functional update for state toggling
    };

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .trim() // Trim whitespace
            .min(2, 'First Name must be at least 2 characters')
            .max(50, 'First Name must not exceed 50 characters')
            .required('First Name is required'),
        lastname: Yup.string()
            .trim() // Trim whitespace
            .min(2, 'Last Name must be at least 2 characters')
            .max(50, 'Last Name must not exceed 50 characters')
            .required('Last Name is required'),
        email: Yup.string()
            .email('Invalid email address') // More specific error message
            .required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .matches(/[^a-zA-Z0-9]/, 'Password must contain at least one special character (e.g., !@#$%^&*)'),
    });

    // Use useEffect for side effects, like showing an alert and redirecting
    useEffect(() => {
        if (isSignupSuccessful) {
            // Provide feedback without blocking UI (use a toast/modal if more complex)
            // For simple case, alert is okay but not ideal for UX
            alert('Sign up successful! Please confirm your email to log in.');
            // Redirect after a short delay to allow user to read the alert
            const redirectTimer = setTimeout(() => {
                navigate('/login');
            }, 100); // Small delay to ensure alert pops up first
            return () => clearTimeout(redirectTimer); // Clean up timer
        }
    }, [isSignupSuccessful, navigate]); // Add navigate to dependency array

    const handleServerSubmit = async (values, actions) => {
        setLoading(true);
        setServerResponse(''); // Clear previous server messages

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, values);

            if (response.status === 200 || response.status === 201) { // 201 Created is common for signups
                setIsSignupSuccessful(true);
            } else {
                // Handle cases where status is not 200/201 but not an error catch
                setIsSignupSuccessful(false);
                setServerResponse(response.data.message || 'An unexpected error occurred.');
            }
        } catch (error) {
            console.error('Error submitting form data:', error);
            setIsSignupSuccessful(false);
            // More robust error message extraction
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setServerResponse(error.response.data.message || error.response.data.error || 'Server error. Please try again.');
            } else if (error.request) {
                // The request was made but no response was received
                setServerResponse('No response from server. Check your internet connection.');
            } else {
                // Something happened in setting up the request that triggered an Error
                setServerResponse('An error occurred. Please try again.');
            }
        } finally {
            setLoading(false);
            actions.setSubmitting(false); // Formik's submission state
        }
    };

    return (
        <div className="signup-page-container">
            <Container className="h-100 d-flex align-items-center justify-content-center py-5">
                <Row className="w-100">
                    {/* Left Column - Marketing/Intro */}
                    <Col xs={12} md={6} className="text-center text-md-start mb-4 mb-md-0 d-flex flex-column justify-content-center align-items-center align-items-md-start">
                        <div className="signup-intro-content">
                            <h1 className="display-4 fw-bold mb-3">CREATE <br />NEW ACCOUNT</h1>
                            <p className="lead text-muted mb-4">
                                Join our community and discover amazing deals!
                            </p>
                            <p className="text-muted mb-2">
                                Already have an account? <Link to="/login" className="signup-link">Login</Link>
                            </p>
                            <p className="text-muted">
                                <Link to="/needhelp" className="signup-link">Need help?</Link>
                            </p>
                        </div>
                    </Col>

                    {/* Right Column - Sign Up Form */}
                    <Col xs={12} md={6} className="d-flex justify-content-center">
                        <Card className="signup-form-card shadow-lg border-0 rounded-lg">
                            <Card.Body className="p-4 p-lg-5">
                                <h4 className="text-center mb-4 signup-form-title">Sign up</h4>

                                {/* Server Response Message */}
                                {serverResponse && (
                                    <Alert variant={isSignupSuccessful ? 'success' : 'danger'} className="text-center mb-3">
                                        {serverResponse}
                                    </Alert>
                                )}
                                {/* More explicit success message if needed, or rely on useEffect alert */}
                                {/* {isSignupSuccessful && (
                                    <Alert variant="success" className="text-center mb-3">
                                        Sign up successful! Redirecting to login...
                                    </Alert>
                                )} */}

                                <Formik
                                    initialValues={{
                                        firstname: '',
                                        lastname: '',
                                        email: '',
                                        password: '',
                                    }}
                                    validationSchema={validationSchema}
                                    onSubmit={handleServerSubmit} // Use the new handler
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <Form onSubmit={handleSubmit} noValidate> {/* noValidate for HTML5 validation */}
                                            <Row className="mb-3">
                                                <Col md={6}>
                                                    <Form.Group controlId="firstname">
                                                        <Form.Label>First Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="firstname"
                                                            value={values.firstname}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.firstname && !!errors.firstname}
                                                            aria-describedby="firstname-feedback" // For accessibility
                                                        />
                                                        <Form.Control.Feedback type="invalid" id="firstname-feedback">
                                                            {errors.firstname}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group controlId="lastname">
                                                        <Form.Label>Last Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="lastname"
                                                            value={values.lastname}
                                                            onChange={handleChange}
                                                            onBlur={handleBlur}
                                                            isInvalid={touched.lastname && !!errors.lastname}
                                                            aria-describedby="lastname-feedback" // For accessibility
                                                        />
                                                        <Form.Control.Feedback type="invalid" id="lastname-feedback">
                                                            {errors.lastname}
                                                        </Form.Control.Feedback>
                                                    </Form.Group>
                                                </Col>
                                            </Row>

                                            <Form.Group controlId="email" className="mb-3">
                                                <Form.Label>Email Address</Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    name="email"
                                                    value={values.email}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    isInvalid={touched.email && !!errors.email}
                                                    aria-describedby="email-feedback" // For accessibility
                                                />
                                                <Form.Control.Feedback type="invalid" id="email-feedback">
                                                    {errors.email}
                                                </Form.Control.Feedback>
                                            </Form.Group>

                                            <Form.Group controlId="password" className="mb-3">
                                                <Form.Label>Password</Form.Label>
                                                  <InputGroup>
                                                     <Form.Control
                                                        type={showPassword ? "text" : "password"}
                                                        name="password"
                                                        value={values.password}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        isInvalid={touched.password && !!errors.password}
                                                        aria-describedby="password-feedback password-requirements"
                                                        required
                                                      />

                                                      {/* Eye icon toggle button */}
                                                      <InputGroup.Text
                                                        onClick={togglePasswordVisibility}
                                                        style={{ cursor: "pointer", background: '#E8F0FE' }}
                                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                                      >
                                                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                                                      </InputGroup.Text>
                          
                                                        <Form.Control.Feedback type="invalid" id="password-feedback">
                                                            {errors.password}
                                                        </Form.Control.Feedback>
                                                    </InputGroup>
                                                {/* Password requirements as descriptive text for better UX */}
                                                <Form.Text id="password-requirements" className="text-muted mt-2">
                                                    Password must be at least 8 characters, contain uppercase, lowercase, number, and a special character.
                                                </Form.Text>
                                            </Form.Group>

                                            <Button
                                                variant="primary"
                                                type="submit"
                                                className="w-100 mt-4 signup-button"
                                                disabled={loading || isSubmitting} // Use Formik's isSubmitting
                                            >
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
                                                        Loading...
                                                    </>
                                                ) : (
                                                    'Sign up'
                                                )}
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                                {/* Moved these links inside the card or near the form */}
                                <div className="text-center mt-3 "> {/* Hide on medium+ screens if already in left col */}
                                    <p className="mb-2 d-md-none" >Have an account? <Link to="/login" className="signup-link">Login</Link></p>
                                    <p className="mb-0">By signing up you agree to YeilvaSTORE <Link to="/termsandconditions" className="signup-link">Terms of service & Privacy policy</Link></p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}