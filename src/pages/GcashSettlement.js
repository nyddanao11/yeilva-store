import React, { useState, useEffect } from 'react';
import { Button, Container, Card, Col, Row, Form, Spinner } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';

const GcashSettlement = () => {
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    amount: Yup.string().required('Amount is required'),
    purpose:Yup.string().required('Purpose is required'),
    transactionCode: Yup.string().required('Transaction Code is required'),
    image: Yup.mixed().required('An image is required'),
  });

  const [loading, setLoading] = useState(false);
  const [transactionCode, setTransactionCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [initialImageFile, setInitialImageFile] = useState(null); // To store image file in initial values

  const generateTransactionCode = () => uuidv4().slice(0, 8).toUpperCase();

  useEffect(() => {
  const loadDefaultImage = async () => {
    try {
      const response = await fetch(`${process.env.PUBLIC_URL}/images/gcashqrcode.jpg`);
      const blob = await response.blob();
      const defaultFile = new File([blob], 'default-image.jpg', { type: blob.type });
      const imageUrl = URL.createObjectURL(blob);
      setPreviewImage(imageUrl);
      setInitialImageFile(defaultFile); // Save the default file
    } catch (error) {
      console.error('Error loading default image:', error);
    }
  };

  setTransactionCode(generateTransactionCode());
  loadDefaultImage();
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
                      transactionCode: transactionCode,
                      image: initialImageFile, // Dynamically set the initial file
                    }}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                      setLoading(true);
                      const formData = new FormData();
                      Object.keys(values).forEach((key) => formData.append(key, values[key]));
                      axios
                        .post('https://yeilva-store-server.up.railway.app/gcashsettlement', formData, {
                          headers: { 'Content-Type': 'multipart/form-data' },
                        })
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
                                transactionCode: generateTransactionCode(),
                                image: initialImageFile, // Reset to default image
                              },
                            });
                            setPreviewImage(null);
                              // Refresh the page after successful transaction
                             window.location.reload();
                          }
                        })
                        .catch((error) => {
                          console.error('Error submitting form data:', error);
                          setErrorMessage('Error recording transaction. Please try again.');
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
                  setFieldValue,
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
                        required
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
                        required
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
                        required
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
                        required
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
                        required
                      />
                      <Form.Control.Feedback type="invalid">{errors.purpose}</Form.Control.Feedback>
                    </Form.Group>

                      <Form.Group controlId="image">
                      <Form.Label>Upload GCash QR Code</Form.Label>
                      <Form.Control
                        type="file"
                        name="image"
                        onChange={(event) => {
                          const file = event.currentTarget.files[0];
                          setFieldValue("image", file);
                          setPreviewImage(URL.createObjectURL(file));
                        }}
                        isInvalid={touched.image && !!errors.image}
                      />
                      <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                    </Form.Group>

                    {/* Preview the loaded or selected image */}
                    {previewImage && (
                      <div className="my-3">
                        <img src={previewImage} alt="Preview" style={{ maxWidth: '200px', height: 'auto' }} />
                      </div>
                    )}

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
};

export default GcashSettlement;
