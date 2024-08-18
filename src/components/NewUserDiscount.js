import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Spinner, Card } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import UAParser from 'ua-parser-js'; // Import UAParser.js

// Validation schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required')
});

const NewUserDiscount = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState('');

    // Set the raffle date
    const voucherExpiry = new Date('August 31, 2024 00:00:00');

    useEffect(() => {
        const updateCountdown = () => {
            const now = new Date();
            const difference = voucherExpiry - now;

            if (difference <= 0) {
                setTimeRemaining('0');
            } else {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                setTimeRemaining(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }
        };

        updateCountdown();
        const intervalId = setInterval(updateCountdown, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Function to get device information
    const getDeviceInfo = () => {
        const parser = new UAParser();
        const result = parser.getResult();
        return {
            browser: result.browser.name,
            browserVersion: result.browser.version,
            os: result.os.name,
            osVersion: result.os.version,
            device: result.device.model || 'Desktop',
            deviceType: result.device.type || 'Desktop'
        };
    };

    return (
        <Container fluid className="d-flex justify-content-center align-items-center " style={{ backgroundColor: "#f8f9fa" }}>
            <Row className="w-100 ">
                <Col lg={10} md={10} xs={12} className="mx-auto mt-4">
                    <Card className="p-4 shadow">
                        <Card.Body>
                          <div style={{lineHeight:"5px", marginBottom:"30px", textAlign:'center'}}>
                            <h4>Register to Get Your 15% Discount Voucher</h4>
                            <p>(Expires on August 31, 2024)</p>
                             <h5>Time Remaining:</h5>
                             <p>{timeRemaining}</p>
                            </div>
                            <Formik
                                initialValues={{ email: '' }}
                                validationSchema={validationSchema}
                                onSubmit={async (values, actions) => {
                                    setLoading(true);
                                    setStatus(null);

                                    // Capture device info
                                    const deviceInfo = getDeviceInfo();

                                    try {
                                        const response = await axios.post('https://yeilva-store-server.up.railway.app/registerfreecode', {
                                            email: values.email,
                                            deviceInfo // Send device info along with the email
                                        });
                                        setStatus({ success: response.data.success });
                                    } catch (error) {
                                        setStatus({ error: error.response ? error.response.data.error : 'Server error' });
                                    } finally {
                                        setLoading(false);
                                        actions.setSubmitting(false);
                                        setTimeout(() => {
                                            actions.resetForm();
                                            setStatus(null);
                                        }, 5000);
                                    }
                                }}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    isSubmitting
                                }) => (
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="email">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={values.email}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.email && !!errors.email}
                                                placeholder="Enter your email"
                                                required
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.email}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                            <Button 
                                              variant="primary" 
                                              type="submit" 
                                              className="w-100 mt-3" 
                                              disabled={loading || isSubmitting || timeRemaining === '0'}
                                            >
                                              {loading ? <Spinner animation="border" size="sm" /> : 'Register'}
                                            </Button>

                                        {status && (
                                            <div className={`mt-3 ${status.success ? 'text-success' : 'text-danger'}`}>
                                                {status.success ? 'Registration successful!' : status.error}
                                            </div>
                                        )}
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default NewUserDiscount;
