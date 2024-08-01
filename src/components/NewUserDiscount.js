import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Spinner, Card } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

// Validation schema
const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required')
});

const NewUserDiscount = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

    return (
        <Container fluid className="d-flex justify-content-center align-items-center " style={{ backgroundColor: "#f8f9fa" }}>
            <Row className="w-100 ">
                <Col lg={4} md={6} xs={12} className="mx-auto mt-4">
                    <Card className="p-4 shadow">
                        <Card.Body>
                            <h4 className="text-center mb-4">Register to Get Your 15% Discount Voucher</h4>
                            <p className="text-center">(Expires on August 31, 2024)</p>
                            <Formik
                                initialValues={{ email: '' }}
                                validationSchema={validationSchema}
                                onSubmit={async (values, actions) => {
                                    setLoading(true);
                                    setStatus(null);
                                    try {
                                        const response = await axios.post('https://yeilva-store-server.up.railway.app/registerfreecode', { email: values.email });
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
                                        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading || isSubmitting}>
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
