import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaYoutube, FaInstagram, FaShopify } from 'react-icons/fa';
import './Footer.css'; // Import your custom CSS for the footer styling
import HoverButton2 from'./HoverButton2';
import HoverButton3 from'./HoverButton3';
import HoverButton4 from'./HoverButton4';
import BackToTopButton from'./BackToTopButton';

export default function Footer ({isLoggedIn}) {
  return (
    <footer className="footer">
      <Container >
        <Row>

          <Col md={4} className="footer-content">
            <div>
             <h5> Follow us:</h5>
              <div className="social-links">
                <Button variant="link" href="https://www.facebook.com/yeilvastore/" target="_blank">
                  <FaFacebook />
                </Button>
                <Button variant="link" href="https://www.youtube.com/watch?v=vwFjm2BG8pU&t=31s" target="_blank">
                  <FaYoutube />
                </Button>
                <Button variant="link" href="https://www.instagram.com/yeilvastore?igsh=MWJ6anpib2o1ZjduYQ%3D%3D" target="_blank">
                  <FaInstagram />
                </Button>
                <Button variant="link" href="https://shope.ee/5pZmnVEM3L" target="_blank">
                  <FaShopify />
                </Button>
              </div>
              <p>&copy; 2024 Yeilva Store. All rights reserved.</p>
            </div>
          </Col>
          <Col md={4}  className="d-flex flex-column align-items-center justify-content-center mt-2 mb-3" >
          <div style={{marginBottom:"15px"}}>  
           <HoverButton2 /> 
          </div>
          {!isLoggedIn &&(
          <div >  
           <HoverButton3/> 
          </div>
          )}
          <div style={{marginBottom:"15px", marginTop:"15px"}}>  
        <HoverButton4 />
           </div> 
          </Col>

          <Col md={4} className="d-flex flex-column align-items-center justify-content-center mt-2" >
          <div >
              <h6> Accepts</h6>
              <p style={{margin:"0px"}}>Gcash</p>
              <p style={{margin:"0px"}}>Bank Transfer</p>
              <p style={{margin:"0px"}}>Cash On Delivery</p>
              <p>Installment </p>
          </div>
          </Col>
        </Row>
      
      </Container>
        <BackToTopButton /> {/* Add the BackToTopButton here */}
    </footer>
  );
};

