import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from'./Footer';

const SignUpForm = () => {
  const [serverResponse, setServerResponse] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  // const backgroundImage = `${process.env.PUBLIC_URL}/background1.png`;

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

  setLoading(true); // Set loading to true when the form is submitted

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
      setServerResponse(' Error: Email already registered ');
    })
    .finally(() => {
      setLoading(false); // Set loading to false when the request is complete (success or failure)
    });
};



  useEffect(() => {
    if (isLoginSuccessful) {
      alert('Please confirm your email to login');
    }
  }, [isLoginSuccessful]);


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

         <div className="text-left" style={{ color: 'green' }}>
         <h1>CREATE <br />NEW ACCOUNT</h1>
         <p style={{ color: 'black' }}>Already have an Account? Login</p>
          <p><a href="mailto:yeilvastore@gmail.com"  style={{textDecoration:'none'}}> Need help?</a></p>
         </div>

     
        </Col>


           <Col xs={12} md={6}>
            <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fff' }}>

                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>



           {/* Display a message for successful login */}
          {isLoginSuccessful && (
            <p className="text-success mt-2">Sign-Up successful.</p>

          )}
      
           {/* Display the server response message */}
          {serverResponse && (
            <p className="text-danger mt-3" >{serverResponse}</p>
          )}

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

      
        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading}>
        {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
      </Button>


        </Form>
        </div>
      

          <div style={{ maxWidth: '400px', }}>

            <p  className=" mt-3"> Have an account?
            <Link to="/login"  style={{marginTop:"20px", marginLeft:"10px",  textDecoration: 'none' }}>
              Login
            </Link>
            </p>

         <p  className=" mt-3" > By signing up you Agree to YeilvaSTORE  <Link to="/termsandconditions" style={{ textDecoration: 'none' }} >
          Terms of Service & Privacy Policy
        </Link></p>    

        </div>
      
      </Col>
      </Row>

    </Container>

       {/* Footer Section */}
      <section className="w-100  mt-2" >
      <Footer />
      </section>
      </div>
  );
};



export default SignUpForm;