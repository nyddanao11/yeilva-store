import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to your authentication endpoint
      const response = await axios.post('http://localhost:3001/api/adminregister', {
        username: username,
        password: password,
      });

      // Assuming your server responds with a token upon successful login
      const token = response.data.token;

      // Save the token to local storage or a state management solution
      // For example, you can use localStorage.setItem('token', token);

      // Redirect to the desired page after successful login
      navigate('/adminloginpage');
    } catch (error) {
      console.error('Login failed', error);
      // Handle login failure, show an error message, etc.
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">YeilvaSTORE Register</h1>
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3 w-100 mb-3">
             Register
            </Button>


            <Link to="/adminloginpage" style={{ textDecoration: 'none' }}  >
             Have an Account? Login
              </Link>

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
