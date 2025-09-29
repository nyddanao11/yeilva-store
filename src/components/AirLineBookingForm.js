import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form as BootstrapForm, Button, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { fetchUserData } from '../components/userService';
import { useMediaQuery } from 'react-responsive';
import { useAuth} from '../pages/loginContext';

const generateTransactionCode = () => uuidv4().slice(0, 8).toUpperCase();

const getInitialValues = (userData) => ({
    fullName: userData.firstname && userData.lastname
        ? `${userData.firstname} ${userData.lastname}`
        : '',
    email: userData.email || '',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    returnDate: '',
    birthday: '',
    address: '',
    phone: '',
    passengers: 1,
    class: '',
    itinerary: '',
    transactionCode: generateTransactionCode(),
    accountName: `${userData.firstname} ${userData.lastname}` || '',
});

export default function AirlineBookingForm() {
   const{userEmail} = useAuth();
    const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
    });
    // 1. Add a new state for the submission message
    const [submissionStatus, setSubmissionStatus] = useState(null);

    useEffect(() => {
       
        if (userEmail) {
            fetchUserData(userEmail.replace(/"/g, ''))
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

    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

    const validationSchema = Yup.object().shape({
        fullName: Yup.string().required('Full name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        departureCity: Yup.string().required('Departure city is required'),
        arrivalCity: Yup.string().required('Arrival city is required'),
        departureDate: Yup.date().required('Departure date is required'),
        returnDate: Yup.date()
            .nullable()
            .when('itinerary', (itineraryValue, schema) => {
                if (itineraryValue === 'roundtrip') {
                    return schema.required('Return date is required for round trip');
                }
                return schema;
            }),
        birthday: Yup.date().required('Birthday is required'),
        address: Yup.string().required('Address is required'),
        phone: Yup.string()
            .matches(/^\d{10,15}$/, 'Phone number must be between 10 to 15 digits')
            .required('Phone is required'),
        passengers: Yup.number()
            .min(1, 'At least one passenger is required')
            .max(10, 'Maximum of 10 passengers')
            .required('Number of passengers is required'),
        class: Yup.string().required('Class is required'),
        itinerary: Yup.string().required('Itinerary is required'),
        transactionCode: Yup.string().required('Transaction Code is required'),
        accountName: Yup.string().required('accountName is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setSubmissionStatus(null); // Clear previous message
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/booking`, values);
            console.log('Booking successful:', response.data);
            setSubmissionStatus({ type: 'success', message: 'Booking submitted successfully!' }); // Set success message
            resetForm();
        } catch (error) {
            console.error('Error submitting booking:', error);
            setSubmissionStatus({ type: 'danger', message: 'There was an error submitting your booking. Please try again.' }); // Set error message
        } finally {
            setSubmitting(false);
        }
    };

     return userData.email ? (
        <Formik
            initialValues={getInitialValues(userData)}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
        >
            {({ isSubmitting, values, setFieldValue }) => (
                <BootstrapForm as={Form} className="p-4 border rounded bg-light">
                    <h3 className="mb-4">Airline Booking Form</h3>
                    <div className={isSmallScreen ? "w-100" : "w-50"}>
                        <p><strong>Reminder:</strong></p>
                        <p>
                            Once we receive your details, we will promptly search for available flights and contact you via phone or email for confirmation.
                            After your confirmation, we will proceed with the booking process. Please ensure that your GCash wallet has sufficient funds
                            and that your contact number and email are accessible during this period to avoid delays.
                        </p>
                    </div>

                    {/* 3. Conditionally render the message */}
                    {submissionStatus && (
                        <Alert variant={submissionStatus.type} className="mt-3">
                            {submissionStatus.message}
                        </Alert>
                    )}



          <Row className="mb-3">
            <Col>
              <BootstrapForm.Group controlId="fullName">
                <BootstrapForm.Label>Full Name</BootstrapForm.Label>
                <Field
                  name="fullName"
                  className="form-control"
                  placeholder="Enter your full name"
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
            <Col>
              <BootstrapForm.Group controlId="email">
                <BootstrapForm.Label>Email</BootstrapForm.Label>
                <Field
                  name="email"
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Group controlId="departureCity">
                <BootstrapForm.Label>Departure City</BootstrapForm.Label>
                <Field
                  name="departureCity"
                  className="form-control"
                  placeholder="Enter departure city"
                />
                <ErrorMessage
                  name="departureCity"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
            <Col>
              <BootstrapForm.Group controlId="arrivalCity">
                <BootstrapForm.Label>Arrival City</BootstrapForm.Label>
                <Field
                  name="arrivalCity"
                  className="form-control"
                  placeholder="Enter arrival city"
                />
                <ErrorMessage
                  name="arrivalCity"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Group controlId="departureDate">
                <BootstrapForm.Label>Departure Date</BootstrapForm.Label>
                <Field
                  name="departureDate"
                  type="date"
                  className="form-control"
                />
                <ErrorMessage
                  name="departureDate"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
            <Col>
              <BootstrapForm.Group controlId="returnDate">
                <BootstrapForm.Label>Return Date</BootstrapForm.Label>
                <Field
                  name="returnDate"
                  type="date"
                  className="form-control"
                  disabled={values.itinerary !== 'roundtrip'}
                />
                <ErrorMessage
                  name="returnDate"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Group controlId="birthday">
                <BootstrapForm.Label>Birthday</BootstrapForm.Label>
                <Field
                  name="birthday"
                  type="date"
                  className="form-control"
                />
                <ErrorMessage
                  name="birthday"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
            <Col>
              <BootstrapForm.Group controlId="address">
                <BootstrapForm.Label>Address</BootstrapForm.Label>
                <Field
                  name="address"
                  type="text"
                  className="form-control"
                  placeholder="Enter your address"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Group controlId="passengers">
                <BootstrapForm.Label>Number of Passengers</BootstrapForm.Label>
                <Field
                  name="passengers"
                  type="number"
                  className="form-control"
                  min="1"
                  max="10"
                />
                <ErrorMessage
                  name="passengers"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
            <Col>
              <BootstrapForm.Group controlId="phone">
                <BootstrapForm.Label>Phone</BootstrapForm.Label>
               <Field
                  name="phone"
                  type="text"
                  className="form-control"
                  placeholder="Enter phone number"
                  onKeyDown={(e) => {
                    if (!/^[0-9]$/i.test(e.key) && e.key !== 'Backspace') {
                      e.preventDefault(); // Block non-numeric input
                    }
                  }}
                />
                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col>
              <BootstrapForm.Group controlId="class">
                <BootstrapForm.Label>Class</BootstrapForm.Label>
                <Field
                  name="class"
                  as="select"
                  className="form-control"
                >
                  <option value="">Select class</option>
                  <option value="economy">Economy</option>
                  <option value="business">Business</option>
                  <option value="firstclass">First Class</option>
                </Field>
                <ErrorMessage
                  name="class"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
              <BootstrapForm.Group controlId="itinerary">
                <BootstrapForm.Label>Itinerary</BootstrapForm.Label>
                <Field
                  name="itinerary"
                  as="select"
                  className="form-control"
                >
                  <option value="">Select itinerary</option>            
                  <option value="onewaytrip">One Way Trip</option>
                  <option value="roundtrip">Round Trip</option>
                </Field>
                <ErrorMessage
                  name="itinerary"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
               <Col>
              <BootstrapForm.Group controlId="transactionCode">
                <BootstrapForm.Label>Transaction Code</BootstrapForm.Label>
                <Field
                  name="transactionCode"
                  type="text"
                  className="form-control"
                  readOnly // Make it read-only
                />
                <ErrorMessage
                  name="transactionCode"
                  component="div"
                  className="text-danger"
                />
              </BootstrapForm.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
               <BootstrapForm.Group controlId="account">
                  <BootstrapForm.Label>Account Name</BootstrapForm.Label>
                  <Field
                    name="accountName"
                    type="text"
                    className="form-control"
                    readOnly // Make it read-only
                  />
                  <ErrorMessage
                    name="accountName"
                    component="div"
                    className="text-danger"
                  />
                </BootstrapForm.Group>
            </Col>
          </Row>
             <Button variant="primary" type="submit" disabled={isSubmitting} className='w-100'>
                        {isSubmitting ? 'Submitting...' : 'Book Now'}
                </Button>
        </BootstrapForm>
      )}
    </Formik>
  ) : (
    <div>Loading...</div>
  );
};

