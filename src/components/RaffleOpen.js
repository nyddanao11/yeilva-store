import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Spinner, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { fetchUserData } from './userService';
import { Link } from 'react-router-dom';
import UAParser from 'ua-parser-js';

// Validation schema
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const RaffleOpen = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [firstWinner, setFirstWinner] = useState(null);
  const [secondWinner, setSecondWinner] = useState(null);
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  const raffleDate = new Date('October 31, 2024 00:00:00');

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = raffleDate - now;

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

  const getDeviceInfo = () => {
    const parser = new UAParser();
    const result = parser.getResult();
    return {
      browser: result.browser.name,
      browserVersion: result.browser.version,
      os: result.os.name,
      osVersion: result.os.version,
      device: result.device.model || 'Desktop',
      deviceType: result.device.type || 'Desktop',
    };
  };

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserEmail) {
      fetchUserData(storedUserEmail.replace(/"/g, ''))
        .then((user) => {
          setUserData({ ...user });
        })
        .catch((error) => console.error('Error setting user data:', error));
    } else {
      console.log('Email is missing in local storage');
    }
  }, []);

  const handleSelectWinners = async () => {
    try {
      const response = await axios.get('https://yeilva-store-server.up.railway.app/openraffle/winner');
      setFirstWinner(response.data.firstWinnerName);
      setSecondWinner(response.data.secondWinnerName);
    } catch (error) {
      console.error('Error selecting winner:', error);
      setStatus({ error: 'Error selecting winner' });
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
      <Row className="w-100">
        <Col lg={10} md={10} xs={12} className="mx-auto mt-4">
          <Card className="p-3 shadow">
            <Card.Body>
              <div style={{ lineHeight: "5px", marginBottom: "30px", textAlign: 'center' }}>
                <h4>Raffle Registration</h4>
                <h6>Prizes </h6>
                <p>1st - 3 boxes of barley</p>
                <p>2nd - 3 boxes of mangosteen</p>
                <p> coffee </p>
                <p>(Raffle on October 31, 2024)</p>
                <Link to="/rafflemechanics" style={{ marginBottom: '5px' }}>Mechanics</Link>
              </div>

              {timeRemaining === "0" && (
                <div className="mx-auto text-center mb-4">
                  <h3 style={{ color: "orange" }}>Congratulations! to our Raffle Winners</h3>
                  <h6>1st prize - {firstWinner}</h6>
                  <h6>2nd prize - {secondWinner}</h6>
                </div>
              )}

              <div className="text-center mb-4">
                <h5>Time Remaining:</h5>
                <p>{timeRemaining}</p>
              </div>

              <Formik
                initialValues={{ fullname: '', email: '' }}
                validationSchema={validationSchema}
                onSubmit={async (values, actions) => {
                  setLoading(true);
                  setStatus(null);
                  const deviceInfo = getDeviceInfo();

                  try {
                    const response = await axios.post('https://yeilva-store-server.up.railway.app/openraffle', {
                      fullname: values.fullname,
                      email: values.email,
                      deviceInfo,
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

                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading || isSubmitting || timeRemaining === '0'}>
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

              {userData.email === 'bonifacioamoren@gmail.com' && (
                <div className="text-center mt-4">
                  <Button variant="success" onClick={handleSelectWinners}>
                    Select Winner
                  </Button>
                  {firstWinner && secondWinner && (
                    <div className="mt-3">
                      <h5>1st Prize Winner: {firstWinner}</h5>
                      <h5>2nd Prize Winner: {secondWinner}</h5>
                    </div>
                  )}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RaffleOpen;
