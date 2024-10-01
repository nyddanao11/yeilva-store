import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Spinner} from 'react-bootstrap';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

// Validation schema
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const NewsLetterForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);

  return (
    <Container className="my-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Stay Updated on Deals & Freebies!</h2>
          <p className="text-center text-muted mb-4">
            Sign up for our newsletter and be the first to know about ongoing promotions, upcoming deals, and exclusive freebies.
          </p>

          {error && <Alert variant="danger">{error}</Alert>}
          {submitted && <Alert variant="success">Thank you! You'll receive our updates soon.</Alert>}

         <Formik
                initialValues={{ fullname: '', email: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  setLoading(true);
                  setStatus(null);
                 
                  try {
                    const response = await axios.post('https://yeilva-store-server.up.railway.app/newsletter', {
                      fullname: values.fullname,
                      email: values.email,
                     
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
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="fullname">
                      <Form.Label>Fullname</Form.Label>
                      <Form.Control
                        type="text"
                        name="fullname"
                        value={values.fullname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.fullname && !!errors.fullname}
                        placeholder="Enter your fullname"
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.fullname}
                      </Form.Control.Feedback>
                    </Form.Group>

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

                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading || isSubmitting }>
                      {loading ? <Spinner animation="border" size="sm" /> : 'Subscribe'}
                    </Button>
                    {status && (
                      <div className={`mt-3 ${status.success ? 'text-success' : 'text-danger'}`}>
                        {status.success ? 'Subscribe successful!' : status.error}
                      </div>
                    )}
                  </Form>
                )}
              </Formik>

          <p className="text-center mt-4 text-muted">
            We respect your privacy and will only send relevant updates. You can unsubscribe at any time.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default NewsLetterForm ;
