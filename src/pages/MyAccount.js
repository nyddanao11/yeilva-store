import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, FloatingLabel} from 'react-bootstrap';
import { fetchUserData } from '../components/userService';
import { Link} from 'react-router-dom';
import FeaturedProduct from'../components/FeaturedProduct';
import './LoanForm.css';
import DeleteAccount from'../components/DeleteAccount';
import { useNavigate } from 'react-router-dom';
import Footer from'../components/Footer';


const MyAccountPage = ({addToCart}) => {
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    joineddate: '', // Added joinedDate to the state
  });

const navigate = useNavigate();

  
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

  const DeleteUser =()=>{
  
// alert('Are you sure To Delete your Account? ')
navigate ('/deleteaccount');

 
}

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

          <button className=" py-2 mt-3 w-100px " 
          style={{border:"1px solid #d3d4d5", borderRadius:"5px", background:"white", color:"black"}} onClick={DeleteUser}> 
         Request to Delete Account </button>
        
        </Col>
      </Row>

        <Row style={{marginTop:"25px"}}>

      <div className="line" style={{marginBottom:'30px'}}>
      <h4 className="text">You May also Like</h4>
      </div>
     <FeaturedProduct addToCart={addToCart}/>
      </Row>

    </Container>
      {/* Footer Section */}
      <Container fluid className="mt-4 " >    
      <Footer /> 
      </Container>
      </>
  );
};


export default MyAccountPage;