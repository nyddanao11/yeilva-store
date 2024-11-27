import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, FloatingLabel} from 'react-bootstrap';
import { fetchUserData } from '../components/userService';
import { Link} from 'react-router-dom';
import './LoanForm.css';
import HoverButton1 from'../components/HoverButton1'
import YouMayLike from'../components/YouMayLike';

export default function MyAccountPage ({addToCart}) {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    joineddate: '', // Added joinedDate to the state
  });

  useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserEmail) {
      fetchUserData(storedUserEmail.replace(/"/g, ''))
        .then((user) => {
          // Set user data including joinedDate
           console.log('User data:', user);
          setUserData({
            ...user,
            joineddate: user.joineddate ?  (user.joineddate) : '', // Format timestamp to a readable date
          });
        })


        .catch((error) => console.error('Error setting user data:', error));
    } else {
      console.log('Email is missing in local storage');
    }
  }, []);

  
    return (
    <>
    <Container className="mt-4">
    <div className="d-flex justify-content-center aligned-items-center">
       <h4 className="text-center mb-4 " style={{marginBottom:'15px'}}>My Account</h4>
       </div>
      <Row className="justify-content-center">

        <Col md={4}>
          <Card>
            <Card.Body>
              <h5>Personal Information</h5>

              {userData && (
                <Form>
                <Form.Group controlId="formBasicFirstName" className="mb-3">
                  <FloatingLabel controlId="floatingFirstName" label="First name">
                    <Form.Control
                      type="text"
                      placeholder="Your First name"
                      value={userData.firstname}
                      onChange={(e) => setUserData({ ...userData, firstname: e.target.value })}
                      readOnly // Add the readOnly attribute
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formBasicLastName" className="mb-3">
                  <FloatingLabel controlId="floatingLastName" label="Last name">
                    <Form.Control
                      type="text"
                      placeholder="Your Last name"
                      value={userData.lastname}
                      onChange={(e) => setUserData({ ...userData, lastname: e.target.value })}
                      readOnly // Add the readOnly attribute
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <FloatingLabel controlId="floatingEmail" label="Email address">
                    <Form.Control
                      type="email"
                      placeholder="Your Email"
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      readOnly // Add the readOnly attribute
                    />
                  </FloatingLabel>
                </Form.Group>

                <Form.Group controlId="formBasicJoinedDate" >
                  <FloatingLabel controlId="floatingJoinedDate" label="Joined Date">
                    <Form.Control
                      type="text"
                      value={userData.joineddate}
                      readOnly
                    />
                  </FloatingLabel>
                </Form.Group>

                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} >

         <div className="mt-3">
            <h4>History </h4>
            <Link to="/checkouthistory" style={{ textDecoration: 'none' }}>
              View Checkout History
            </Link>
          </div>

          <div className="mt-3">
            <Link to="/loanformhistory" style={{ textDecoration: 'none' }}>
              View Loan Application History
            </Link>
          </div>

           <div className="mt-3">
            <Link to="/installmenthistorypage" style={{ textDecoration: 'none' }}>
              View Product Installment History
            </Link>
          </div>


           <div className="mt-3">
            {userData.email === 'bonifacioamoren@gmail.com' && (
              <Link to="/adminpage" style={{ textDecoration: 'none' }}>
              YeilvaSTORE-AdminPage
              </Link>
            )}
          </div>
          
          <div style={{marginTop:"25px"}}>
         <HoverButton1 />
         </div>
        
        </Col>
      </Row>

    </Container>
        <YouMayLike addToCart={addToCart}/>
      </>
  );
};


