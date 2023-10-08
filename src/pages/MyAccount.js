import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const MyAccountPage = () => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
  });

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');

    if (!storedUserEmail) {
      // Email is missing in local storage
      console.log('Email is missing in local storage');
      return;
    }

    // Fetch user data using the email from local storage
    console.log('Fetching user data for email:', storedUserEmail);
    
    fetchUserData(storedUserEmail.replace(/"/g, '')); // Remove double quotes

  }, []); // Removed the dependencies array to ensure this effect runs once

  const fetchUserData = (email) => {
    if (!email) {
      console.error('Email is undefined');
      return;
    }

    axios
      .get(`http://localhost:3001/api/user?email=${encodeURIComponent(email)}`)
      .then((response) => {
        const user = response.data;
        setUserData(user);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  const handleUpdateInformation = () => {
    // Handle updating user information here
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">My Account</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Personal Information</h5>

              {userData && (
                <Form>
                  <Form.Group controlId="formBasicFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your First name"
                      value={userData.firstname}
                      onChange={(e) =>
                        setUserData({ ...userData, firstname: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Your Last name"
                      value={userData.lastname}
                      onChange={(e) =>
                        setUserData({ ...userData, lastname: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      value={userData.email}
                      onChange={(e) =>
                        setUserData({ ...userData, email: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="New Password" />
                  </Form.Group>
                  <Button
                    variant="primary"
                    type="submit"
                    onClick={handleUpdateInformation}
                    className="mt-2"
                  >
                    Update Information
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <h5>Order History</h5>
              {/* Display a list of user's order history */}
              <ul>
                <li>
                  <strong>Order #12345</strong> - Date: January 1, 2023
                </li>
                {/* Add more order history items */}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default MyAccountPage;
