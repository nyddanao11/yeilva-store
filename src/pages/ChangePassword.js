import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup} from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export default function ChangePassword ()  {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Retrieve email from location state
  const email = location.state?.email || '';
   console.log('Location State:', location.state);
   console.log('Email:', email);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add additional client-side validation as needed
    if (password !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }

    try {
      // Make a request to your server to handle password change logic
      const response = await axios.post('https://yeilva-store-server.up.railway.app/change-password', {
        email: email,
        password: password,
      });

      if (response.data.status === 'success') {
        setMessage('Password changed successfully');

      navigate('/login');

      } else {
        setMessage(response.data.error);
      }
    } catch (error) {
      console.error('An error occurred during password change:', error);
      setMessage('An error occurred. Please try again.');
    }
  };

 
  return (
    <Container className="py-4 border">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <h2>Change Password</h2>
          <Form onSubmit={handleSubmit}>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                     placeholder="Enter your new password"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

               <Form.Group controlId="confirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    name="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                  <InputGroup.Text onClick={togglePasswordVisibility} style={{ cursor: "pointer", background:'#E8F0FE' }}>
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Change Password
            </Button>
          </Form>

          {message && <p className="mt-3">{message}</p>}
        </Col>
      </Row>
    </Container>
  );
};


