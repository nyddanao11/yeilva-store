import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './loginContext';
import Footer from'../components/Footer';

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: '', // Add this line to initialize the email field
    password: '',
  });

  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const { login } = useAuth(); // Use the login function from the context

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Email:', formData.email);

    try {
      const response = await axios.post('https://yeilva-store-server.up.railway.app/signin', {
        email: formData.email,
        password: formData.password,
      });

      console.log('Response from server:', response.data);
      if (response.data.status === 'success') {
        // Store the email in local storage
        console.log('Email from response:', response.data.email);
        localStorage.setItem('email', JSON.stringify(response.data.email));
        console.log('Email from local storage:', localStorage.getItem('email'));

        setIsLoginSuccessful(true);
        login(response.data.email); // Use the login function from the context
        handleLogin(); // Call the handleLogin function from props
      } else {
        setIsLoginSuccessful(false);
        setServerResponse(response.data.error);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      setIsLoginSuccessful(false);
      setServerResponse('An error occurred during login.');
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
                name="email" // Make sure this is set to "email"
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

           {/* Display the server response message */}
          {serverResponse && (
            <p className="text-info mt-2" style={{margin:"0px"}}>{serverResponse}</p>
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
       {/* Footer Section */}
      <section className=" mb-4 d-flex flex-column align-items-center justify-content-center " >
      <Footer />
      </section>

      
    </Container>
  );
};

export default Login;
