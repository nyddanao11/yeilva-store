import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function GcashSettlement() {
  // Generate a new transaction code
  const generateTransactionCode = () => uuidv4().slice(0, 8).toUpperCase();

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    amount: Yup.string().required('Amount is required'),
    purpose: Yup.string().required('Purpose is required'),
    deadline: Yup.date().required('Deadline is required').nullable(),
    transactionCode: Yup.string().required('Transaction Code is required'),
  });

  const [loading, setLoading] = useState(false);
  const [transactionCode, setTransactionCode] = useState('');

  // Generate transaction code when the component loads
  useEffect(() => {
    setTransactionCode(generateTransactionCode());
  }, []);

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
      <Row className="w-100">
        <Col lg={10} md={10} xs={12} className="mx-auto mt-4">
          <Card className="p-3 shadow">
            <Card.Body>
              <Formik
                enableReinitialize
                initialValues={{
                  firstname: '',
                  lastname: '',
                  email: '',
                  amount: '',
                  purpose: '',
                  deadline: '',
                  transactionCode: transactionCode, // Initialize with generated code
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                  setLoading(true);

                  axios
                    .post('https://yeilva-store-server.up.railway.app/gcashsettlement', values)
                    .then((response) => {
                      if (response.status === 200) {
                        alert('Transaction Successfully Recorded!');
                        actions.resetForm({
                          values: {
                            firstname: '',
                            lastname: '',
                            email: '',
                            amount: '',
                            purpose: '',
                            deadline: '',
                            transactionCode: generateTransactionCode(), // Regenerate code
                          },
                        });
                        setTransactionCode(generateTransactionCode()); // Update state with new code
                      }
                    })
                    .catch((error) => {
                      console.error('Error submitting form data:', error);
                      alert('Error recording transaction. Please try again.');
                    })
                    .finally(() => {
                      setLoading(false);
                      actions.setSubmitting(false);
                    });
                }}
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
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="firstname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.firstname && !!errors.firstname}
                      />
                      <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="lastname">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="lastname"
                        value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.lastname && !!errors.lastname}
                      />
                      <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
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
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="amount">
                      <Form.Label>Amount</Form.Label>
                      <Form.Control
                        type="text"
                        name="amount"
                        value={values.amount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.amount && !!errors.amount}
                      />
                      <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="purpose">
                      <Form.Label>Purpose</Form.Label>
                      <Form.Control
                        type="text"
                        name="purpose"
                        value={values.purpose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.purpose && !!errors.purpose}
                      />
                      <Form.Control.Feedback type="invalid">{errors.purpose}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="deadline">
                      <Form.Label>Deadline</Form.Label>
                      <Form.Control
                        type="date"
                        name="deadline"
                        value={values.deadline}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.deadline && !!errors.deadline}
                      />
                      <Form.Control.Feedback type="invalid">{errors.deadline}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="transactionCode">
                      <Form.Label>Transaction Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="transactionCode"
                        value={values.transactionCode}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.transactionCode && !!errors.transactionCode}
                        readOnly
                      />
                      <Form.Control.Feedback type="invalid">{errors.transactionCode}</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading || isSubmitting}>
                      {loading ? <Spinner animation="border" size="sm" /> : 'Submit'}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
