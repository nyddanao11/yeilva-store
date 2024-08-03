// Import necessary modules
import React, { useState} from 'react';
import { Form, Button, Container, Row, Col, Spinner, Card } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './loginContext';
import LockoutPage from'./LockoutPage';

const Login = ({ handleLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // const backgroundImage = `${process.env.PUBLIC_URL}/background1.png`;
  // const Image =`${process.env.PUBLIC_URL}/groceries/noodles/freedelivery.png`; 
  const [loading, setLoading] = useState(false);
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [serverResponse, setServerResponse] = useState('');

  const { login } = useAuth();
  const navigate =useNavigate()

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
      setLoading(true); // Set loading to true when the request is initiated

      const response = await axios.post('https://yeilva-store-server.up.railway.app/signin', {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.status === 'success') {
        localStorage.setItem('email', JSON.stringify(response.data.email));
        setIsLoginSuccessful(true);
        login(response.data.email);
        handleLogin();
      } else {
        setIsLoginSuccessful(false);
        setServerResponse(response.data.error);
      }
   } catch (error) {
  console.error('An error occurred during login:', error);

  if (error.response && error.response.data && error.response.data.error) {
    // If the server responded with an error and provided an error message
    setServerResponse(error.response.data.error);
//   if (error.response && error.response.data && error.response.data.error === 'Account locked. Please try again after 0.25 hours.') {
//   navigate('/lockoutpage');
// }

  } else {
    // If there's no specific error message from the server, use a generic one
    setServerResponse('An error occurred during login. Please try again.');
  }

  setIsLoginSuccessful(false);
} finally {
  setLoading(false); // Set loading to false when the request is complete (success or failure)
}

  };


  return (
    <div
      style={{
        // background: `url(${backgroundImage})`,
        // backgroundSize: 'cover',
        // minHeight: '100vh',
        display: 'flex',
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop:'30px',
      }}
    >
      <Container>
        <Row className="justify-content-center">
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center">

         <div className="text-left" style={{ color: 'green', marginBottom:'15px' }}>
         <h1>CREATE <br />NEW ACCOUNT</h1>
         <p style={{ color: 'black' }}>Already have an Account? Login</p>
          <Link to="/needhelp" style={{textDecoration:'none'}}> Need help?</Link>
         </div>

        
     
        </Col>
           <Col xs={12} md={6}  style={{ maxWidth: '400px'}}>
             <Card className="mx-auto mt-4">
              <Card.Body className="p-4 shadow">
             
                <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Login</h4>

              {/* Conditional rendering of loading spinner */}
              {loading && <Spinner animation="border" variant="primary" />}

               {isLoginSuccessful && (
              <p className="text-success mt-2">Login successful. You will be redirected to the home page.</p>
            )}
            {serverResponse && (
              <p className="text-danger mt-3">{serverResponse}</p>
            )}

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
                 <Button variant="primary" type="submit" className="w-100 mt-4" disabled={loading}>
                  {loading ? 'Logging in...' : 'Log In'}
                </Button>
              </Form>
         

            <div  style={{maxWidth:'400px', marginTop:'15px'}}>
              {!isLoginSuccessful && (
                <p>
                  <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>Forgot Password?</Link>
                </p>
              )}
              {!isLoginSuccessful && (
                <p>
                  Don't have an account? <Link to="/signupform" style={{ textDecoration: 'none' }}>Sign Up</Link>
                </p>
              )}
            </div>
           </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      </div>
  );
};

export default Login;
