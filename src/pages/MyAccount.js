import React from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';

const MyAccountPage = () => {
  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">My Account</h1>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Personal Information</h5>
              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="Your Name" />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Your Email" />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="New Password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Update Information
                </Button>
              </Form>
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
