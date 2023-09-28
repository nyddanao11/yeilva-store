import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from'axios';

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 const handleSubmit = async (event) => {
  event.preventDefault();

  try {
    const response = await axios.post('http://localhost:3001/signin', {
      email: formData.email,
      password: formData.password,
    });

    if (response.data === 'success') {
      setIsLoginSuccessful(true);
      handleLogin(); // Call the handleLogin function from props
    } else {
      setIsLoginSuccessful(false);
    }
  } catch (error) {
    console.error('An error occurred during login:', error);
    setIsLoginSuccessful(false);
  }
};


  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Login</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Log In
            </Button>
          </Form>

          {/* Display a message for successful login */}
          {isLoginSuccessful && (
            <p className="text-success mt-2">Login successful. You will be redirected to the home page.</p>

          )}

          {/* Display an error message for unsuccessful login */}
          {!isLoginSuccessful && (
            <p className="text-danger mt-2">Login failed. Please check your credentials.</p>
          )}
        </Col>
      </Row>
      <Row className="justify-content-center mt-3">
        <Col xs={12} md={6}>

         {!isLoginSuccessful && (
          <p>
            Don't have an account? <Link to="/signupform">Sign Up</Link>
          </p>
        )}


        </Col>
      </Row>
      
    </Container>
  );
};

export default Login;
