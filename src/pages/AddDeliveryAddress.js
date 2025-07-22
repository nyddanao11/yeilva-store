import React, { useState, useEffect } from 'react';
import { Card, Form, FloatingLabel, Button, Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Formik, Field, ErrorMessage } from 'formik'; // Make sure Field and ErrorMessage are imported
import * as Yup from 'yup';
import { fetchUserData } from '../components/userService';

// AddDeliveryAddress component for users to input a new delivery address
export default function AddDeliveryAddress() {
    const [serverResponse, setServerResponse] = useState('');
    const [isAddingSuccessful, setIsAddingSuccessful] = useState(false);
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });

    useEffect(() => {
        const storedUserEmail = localStorage.getItem('email');
        if (storedUserEmail) {
            fetchUserData(storedUserEmail.replace(/"/g, ''))
                .then((user) => {
                    setUserData({
                        firstname: user.firstname || '',
                        lastname: user.lastname || '',
                        email: user.email || '',
                    });
                })
                .catch((error) => console.error('Error setting user data:', error));
        } else {
            console.log('Email is missing in local storage');
        }
    }, []);

    // Define initial form values based on userData
    const initialFormValues = {
        fullName: userData.firstname && userData.lastname
            ? `${userData.firstname} ${userData.lastname}`
            : '',
        userEmail: userData.email || '',
        streetAddress: '',
        apartmentSuite: '',
        city: '',
        stateProvince: '',
        postalCode: '',
        phoneNumber: '',
    };

    const validationSchema = Yup.object().shape({
        fullName: Yup.string()
            .trim()
            .required('Full name is required'),
         userEmail: Yup.string()
            .trim()
            .required('Full name is required'),   
        streetAddress: Yup.string()
            .trim()
            .required('Street Address is required'),
        apartmentSuite: Yup.string()
            .trim(),
        city: Yup.string()
            .trim()
            .required('City is required'), // Corrected error message
        stateProvince: Yup.string()
            .trim()
            .required('State/Province is required'), // Corrected error message
        postalCode: Yup.string()
            .trim()
            .required('Postal Code is required'), // Corrected error message
        phoneNumber: Yup.string()
            .matches(/^\d{10,15}$/, 'Phone number must be between 10 to 15 digits')
            .required('Phone number is required'), // Corrected error message
    });

     const handleSubmit = async (values, { setSubmitting, resetForm, actions}) => {
        setLoading(true);
        setServerResponse(''); // Clear previous server messages

        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/adddeliveryaddress`, values);
            console.log('Address added successfully:', response.data);
            setIsAddingSuccessful(true); // Indicate success
            setServerResponse('Address added successfully!');
            alert('Address added successfully!');
            resetForm(); // Reset form after successful submission
        } catch (error) {
            console.error('Error adding address:', error);
            setIsAddingSuccessful(false); // Indicate failure
            setServerResponse('There was an error adding your address. Please try again.');
            alert('There was an error adding your address. Please try again.');
        } finally {
            setLoading(false);
            actions.setSubmitting(false); // Formik's submission state 
        }
    };

    // Render the form only when userData is available
    return userData.email ? (
        <Formik
            initialValues={initialFormValues} // Use initialValues
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize // Keep this if you want to re-initialize when userData changes
        >
            {({ isSubmitting, errors, touched, values, handleChange, handleBlur, handleSubmit }) => ( // Destructure formik props
                <Card className="shadow-lg rounded-lg">
                    <Card.Body>
                        <h5 className="mb-4 text-gray-800">Add a New Address</h5>
                        <Form noValidate onSubmit={handleSubmit}> {/* Use Formik's handleSubmit */}
                            {/* Full Name Input */}
                            <Form.Group controlId="formFullName" className="mb-3">
                                <FloatingLabel controlId="floatingFullName" label="Full Name (First and Last Name)">
                                    <Form.Control
                                        type="text"
                                        placeholder="Full Name (First and Last Name)"
                                        name="fullName"
                                        value={values.fullName} // Bind to Formik's values
                                        onChange={handleChange} // Use Formik's handleChange
                                        onBlur={handleBlur} // Use Formik's handleBlur for touched state
                                        isInvalid={touched.fullName && !!errors.fullName} // Apply invalid styling
                                        className="rounded-md"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <ErrorMessage name="fullName" /> {/* Display error message */}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>
                             <Form.Group controlId="formUserEmail" className="mb-3">
                                <FloatingLabel controlId="floatingUserEmail" label="User Email">
                                    <Form.Control
                                        type="text"
                                        placeholder="user email "
                                        name="userEmail"
                                        value={values.userEmail} // Bind to Formik's values
                                        onChange={handleChange} // Use Formik's handleChange
                                        onBlur={handleBlur} // Use Formik's handleBlur for touched state
                                        isInvalid={touched.userEmail && !!errors.userEmail} // Apply invalid styling
                                        className="rounded-md"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <ErrorMessage name="userEmail" /> {/* Display error message */}
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            {/* Street Address Input */}
                            <Form.Group controlId="formStreetAddress" className="mb-3">
                                <FloatingLabel controlId="floatingStreetAddress" label="Street Address">
                                    <Form.Control
                                        type="text"
                                        placeholder="Street Address"
                                        name="streetAddress"
                                        value={values.streetAddress}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.streetAddress && !!errors.streetAddress}
                                        className="rounded-md"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <ErrorMessage name="streetAddress" />
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            {/* Apartment, Suite, etc. Input (Optional) */}
                            <Form.Group controlId="formApartmentSuite" className="mb-3">
                                <FloatingLabel controlId="floatingApartmentSuite" label="Apt, Suite, Unit (Optional)">
                                    <Form.Control
                                        type="text"
                                        placeholder="Apt, Suite, Unit (Optional)"
                                        name="apartmentSuite"
                                        value={values.apartmentSuite}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.apartmentSuite && !!errors.apartmentSuite}
                                        className="rounded-md"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        <ErrorMessage name="apartmentSuite" />
                                    </Form.Control.Feedback>
                                </FloatingLabel>
                            </Form.Group>

                            <Row>
                                {/* City Input */}
                                <Col md={6}>
                                    <Form.Group controlId="formCity" className="mb-3">
                                        <FloatingLabel controlId="floatingCity" label="City">
                                            <Form.Control
                                                type="text"
                                                placeholder="City"
                                                name="city"
                                                value={values.city}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.city && !!errors.city}
                                                className="rounded-md"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <ErrorMessage name="city" />
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>

                                {/* State/Province Input */}
                                <Col md={6}>
                                    <Form.Group controlId="formStateProvince" className="mb-3">
                                        <FloatingLabel controlId="floatingStateProvince" label="State/Province">
                                            <Form.Control
                                                type="text"
                                                placeholder="State/Province"
                                                name="stateProvince"
                                                value={values.stateProvince}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.stateProvince && !!errors.stateProvince}
                                                className="rounded-md"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <ErrorMessage name="stateProvince" />
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                {/* Postal Code Input */}
                                <Col md={6}>
                                    <Form.Group controlId="formPostalCode" className="mb-3">
                                        <FloatingLabel controlId="floatingPostalCode" label="Postal Code">
                                            <Form.Control
                                                type="text"
                                                placeholder="Postal Code"
                                                name="postalCode"
                                                value={values.postalCode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.postalCode && !!errors.postalCode}
                                                className="rounded-md"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <ErrorMessage name="postalCode" />
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>

                                {/* Phone Number Input */}
                                <Col md={6}>
                                    <Form.Group controlId="formPhoneNumber" className="mb-3">
                                        <FloatingLabel controlId="floatingPhoneNumber" label="Phone Number">
                                            <Form.Control
                                                type="tel"
                                                placeholder="Phone Number"
                                                name="phoneNumber"
                                                value={values.phoneNumber}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                isInvalid={touched.phoneNumber && !!errors.phoneNumber}
                                                className="rounded-md"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                <ErrorMessage name="phoneNumber" />
                                            </Form.Control.Feedback>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* Submit Button */}
                            <Button
                                variant="primary"
                                type="submit"
                                className="w-full mt-4 py-2 rounded-md font-semibold text-lg bg-yellow-500 hover:bg-yellow-600 border-none transition duration-300 ease-in-out"
                                style={{ backgroundColor: '#FFD700', borderColor: '#FFD700' }}
                                disabled={isSubmitting || loading} // Disable button during submission or loading
                            >
                                {isSubmitting || loading ? 'Adding Address...' : 'Add Address'}
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            )}
        </Formik>
    ) : (
        <div>Loading...</div>
    );
}