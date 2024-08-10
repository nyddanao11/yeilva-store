import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Spinner, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { fetchUserData } from './userService';
import {Link} from 'react-router-dom';

// Validation schema
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const Raffle = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const [ticketNumber, setTicketNumber] = useState(null);
  const [takenTickets, setTakenTickets] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState('');
  const [winningTicket, setWinningTicket] = useState(null);
   const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  // Set the raffle date
  const raffleDate = new Date('August 07, 2024 00:00:00');

  useEffect(() => {
    const fetchTakenTickets = async () => {
      try {
        const response = await axios.get('https://yeilva-store-server.up.railway.app/raffletickets');
        setTakenTickets(response.data.tickets);
      } catch (error) {
        console.error('Error fetching tickets:', error);
      }
    };

    fetchTakenTickets();
  }, []);

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

  

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserEmail) {
      fetchUserData(storedUserEmail.replace(/"/g, ''))
        .then((user) => {
          // Set user data including joinedDate
           console.log('User data:', user);
          setUserData({ ...user});
        })
        .catch((error) => console.error('Error setting user data:', error));
    } else {
      console.log('Email is missing in local storage');
    }
  }, []);


  const handleTicketSelection = (ticket) => {
    setTicketNumber(ticket);
    alert(`Your Number is ${ticket}`);
  };

  const handleSelectWinner = async () => {
    try {
      const response = await axios.get('https://yeilva-store-server.up.railway.app/raffle/winner');
      setWinningTicket(response.data.winningTicket);
    } catch (error) {
      console.error('Error selecting winner:', error);
      setStatus({ error: 'Error selecting winner' });
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f8f9fa" }}>
      <Row className="w-100">
        <Col lg={10} md={10} xs={12} className="mx-auto mt-4">
          <Card className="p-4 shadow">
            <Card.Body>
              <div style={{ lineHeight: "5px", marginBottom: "30px" }}>
                <h4 className="text-center">Raffle Registration</h4>
                <h6 className="text-center">Prizes to be Won </h6>
                <p className="text-center"> 1st - 1box of barley</p>
                <p className="text-center"> 2nd - 1box of mangosteen coffee </p>
                <p className="text-center">(Raffle on October 08, 2024)</p>
              </div>
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
                  try {
                    const response = await axios.post('https://yeilva-store-server.up.railway.app/raffleregister', {
                      fullname: values.fullname,
                      email: values.email,
                      ticket: ticketNumber,
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
                      setTicketNumber(null);
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

                    <div className="mt-3 p-2">
                      <div className="mt-2 mb-2 d-flex flex-column justify-content-center align-items-center" style={{ lineHeight: "5px" }}>
                        <h6>Raffle Tickets</h6>
                        <p>{30 - takenTickets.length} out of 30 remaining</p>
                        <p style={{ fontSize: "18px", fontWeight: "600", color: "#0D6EFD" }}>Your Number: {ticketNumber}</p>
                        <Link to="/rafflemechanics" style={{marginBottom:"20px"}}> mechanics </Link>
                      </div>
                      <div className="mt-2 mb-2 mx-1 d-flex justify-content-center align-items-center flex-wrap">
                        {[...Array(30)].map((_, index) => (
                          <Button
                            key={index}
                            variant="primary"
                            size="sm"
                            className="mx-1 mb-1"
                            onClick={() => handleTicketSelection(index + 1)}
                            disabled={takenTickets.includes(index + 1) || ticketNumber === index + 1 || timeRemaining === '0'} // Disable the button if the ticket is already taken or selected
                          >
                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading || isSubmitting || !ticketNumber}>
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
                  <Button variant="success" onClick={handleSelectWinner}>
                    Select Winner
                  </Button>
                  {winningTicket && (
                    <div className="mt-3">
                      <h5>Winning Ticket: {winningTicket}</h5>
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

export default Raffle;
