import React, { useState, useEffect } from 'react';
import {Form, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Footer from'./Footer';
import { Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';


const SignUpForm = () => {
  const [serverResponse, setServerResponse] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required('First Name is required'),
    lastname: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
  });


  
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
           <Link to="/needhelp" style={{textDecoration:'none'}}> Need help?</Link>
         </div>

     
        </Col>


           <Col xs={12} md={6}>
            <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fff' }}>

                <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Sign Up</h2>



          {/* Conditionally render the server response message */}
          {isLoginSuccessful ? (
            <p className="text-success mt-2">Sign-Up successful.</p>
          ) : (
            <p className="text-danger mt-3">{serverResponse}</p>
          )}


              <Formik
                initialValues={{
                  firstname: '',
                  lastname: '',
                  email: '',
                  password: '',
                }}
                validationSchema={validationSchema}

                onSubmit={(values, actions) => {
                  setLoading(true); // Set loading to true when the form is submitted

                  axios.post('https://yeilva-store-server.up.railway.app/register', values)
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
                      setServerResponse('Error: Email already registered');
                    })
                    .finally(() => {
                      setLoading(false); // Set loading to false when the request is complete (success or failure)
                      actions.setSubmitting(false); // Ensure form submission state is reset
                    });
                }}
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  isSubmitting,
                }) => (


          <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="firstname">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="firstname"
                        value={values.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.firstname && !!errors.firstname}
                        required
                      />
                      <Form.Control.Feedback type="invalid">{errors.firstname}</Form.Control.Feedback>
                    </Form.Group>

        <Form.Group controlId="lastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastname" // Change to "lastname"
             value={values.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.lastname && !!errors.lastname}
                        required
                      />
                      <Form.Control.Feedback type="invalid">{errors.lastname}</Form.Control.Feedback>
                    </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            name="email"
              value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.email && !!errors.email}
                        required
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.password && !!errors.password}
                        required
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

      
        <Button variant="primary" type="submit" className="w-100 mt-3" disabled={loading || isSubmitting}>
                      {loading ? <Spinner animation="border" size="sm" /> : 'Sign Up'}
                    </Button>
                  </Form>
                )}
              </Formik>

            </div>

          <div style={{ maxWidth: '400px' }}>

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

       <Container fluid className="mt-4 " >    
      <Footer /> 
      </Container>

      </div>
  );
};



export default SignUpForm;