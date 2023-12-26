import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage]= useState('');
  const navigate = useNavigate();

   const trimmedUsername = username.trim();
  const trimmedPassword = password.trim();


const handleLogin = async (e) => {
  e.preventDefault();

  try {
    // Make a POST request to your authentication endpoint
    const response = await axios.post(
      'http://localhost:3001/api/adminlogin',
      {
        username: trimmedUsername,
        password: trimmedPassword,
      },
      { withCredentials: true },
    );

    if (response.status === 200) {
      // Successful login
      // The HTTP-only cookie is automatically sent in subsequent requests

      // Do something based on the server response
      console.log('Server response:', response.data);
        console.log('Cookies received:', document.cookie);
   

      // Redirect to the admin page
      navigate('/adminpage');
    } else if (response.status === 401) {
      // Unauthorized access (e.g., expired session or invalid credentials)
      // No need to set localStorage, as the cookie is handled automatically
      navigate('/adminloginpage'); // Adjust the route as needed
      setErrorMessage(response.data.error || 'Error: Expired Session or Invalid credentials');
    } else {
      // Handle other response statuses
      console.error('Login failed', response.data.error || 'Unknown error');
      setErrorMessage('Error: Something went wrong');
    }
  } catch (error) {
    // Handle network errors, etc.
    console.error('Login failed', error);
    setErrorMessage('Error: Unable to connect to the server');
  }
};




  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h1 className="text-center mb-4">YeilvaSTORE Login</h1>

           {errorMessage && (
              <p className="text-danger mt-3">{errorMessage}</p>
            )}
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

            <Button variant="primary" type="submit" className="mt-3 mb-3 w-100">
              Login
            </Button>

           

          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;


