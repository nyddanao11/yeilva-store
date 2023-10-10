import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from'./Footer';

const SignUpForm = () => {
  const [serverResponse, setServerResponse] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);

  // Create state variables for form fields
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  // Handle form field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('http://localhost:3001/register', formData)
      .then((response) => {
        if (response.status === 200) {
          setIsLoginSuccessful(true);
        } else {
          setIsLoginSuccessful(false);
          setServerResponse(response.data.error); // Set the error message
        }
      })
      .catch((error) => {
        console.error('Error submitting form data:', error);
        setIsLoginSuccessful(false);
        setServerResponse('An error occurred during registration.');
      });
  };


  return (
    <Container>
      <h2>Sign Up</h2>
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="firstname">
  <Form.Label>First Name</Form.Label>
  <Form.Control
    type="text"
    name="firstname" // Change to "firstname"
    value={formData.firstname}
    onChange={handleInputChange}
    required
  />
</Form.Group>

<Form.Group controlId="lastname">
  <Form.Label>Last Name</Form.Label>
  <Form.Control
    type="text"
    name="lastname" // Change to "lastname"
    value={formData.lastname}
    onChange={handleInputChange}
    required
  />
</Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
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

       <div className='d-flex' justify-content-center>
        <Button variant="primary" type="submit" className="mt-3">
          Sign Up
        </Button>

        <Link to="/login" style={{marginTop:"20px", marginLeft:"25px"}}>
          Login
        </Link>

        </div>

           {/* Display a message for successful login */}
          {isLoginSuccessful && (
            <p className="text-success mt-2">Sign-Up successful. You can now login.</p>

          )}

          {/* Display an error message for unsuccessful login */}
          {!isLoginSuccessful && (
            <p className="text-danger mt-2">Sign-Up failed. Please check your credentials.</p>
          )}

           {/* Display the server response message */}
          {serverResponse && (
            <p className="text-info mt-2" style={{margin:"0px"}}>{serverResponse}</p>
          )}

      </Form>

       {/* Footer Section */}
      <section className=" mb-4 d-flex flex-column align-items-center justify-content-center " >
      <Footer />
      </section>
      
    </Container>
  );
};



export default SignUpForm;