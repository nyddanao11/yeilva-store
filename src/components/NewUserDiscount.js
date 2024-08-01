import React, { useState } from 'react';
import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap';
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
        <Container>
            <Row className="mt-2 mb-4 form-group d-flex flex-column justify-content-center align-items-center">
                <Col lg={6} md={6} xs={12} className="mt-2" style={{ width: "300px", padding:"15px", backgroundColor:"white", borderRadius:"5px" }}>
                    <h4>Register to Get Your 15% Discount Voucher</h4>
                     <p>(Valid until August 31, 2024)</p>
                    <Formik
                        initialValues={{ email: '' }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, actions) => {
                            setLoading(true); // Set loading to true when the form is submitted
                            setStatus(null); // Clear any previous status messages
                            try {
                                const response = await axios.post('https://yeilva-store-server.up.railway.app/registerfreecode', { email: values.email });
                                setStatus({ success: response.data.success });
                            } catch (error) {
                                setStatus({ error: error.response ? error.response.data.error : 'Server error' });
                            } finally {
                                setLoading(false); // Set loading to false when the request is complete (success or failure)
                                actions.setSubmitting(false); // Ensure form submission state is reset
                                
                                // Reset form after a delay of 5 seconds
                                setTimeout(() => {
                                    actions.resetForm();
                                    setStatus(null); // Clear status messages after form reset
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
                </Col>
            </Row>
        </Container>
    );
};

export default NewUserDiscount;
