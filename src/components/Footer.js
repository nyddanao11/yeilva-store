import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaYoutube, FaInstagram, FaShopify } from 'react-icons/fa';
import './Footer.css'; // Import your custom CSS for the footer styling
import {Link} from'react-router-dom';


const Footer = () => {
  return (
    <footer className="footer">
      <Container >
        <Row>

          <Col md={4}>
            <div className="footer-content">
             <h5> Follow us:</h5>
              <div className="social-links">
                <Button variant="link" href="https://www.facebook.com/yeilvastore/" target="_blank">
                  <FaFacebook />
                </Button>
                <Button variant="link" href="https://www.youtube.com/watch?v=vwFjm2BG8pU&t=31s" target="_blank">
                  <FaYoutube />
                </Button>
                <Button variant="link" href="https://www.instagram.com/" target="_blank">
                  <FaInstagram />
                </Button>
                <Button variant="link" href="https://shope.ee/5pZmnVEM3L" target="_blank">
                  <FaShopify />
                </Button>
              </div>
              <p>&copy; 2024 Yeilva Store. All rights reserved.</p>
            </div>
          </Col>
          <Col md={4}>
          <div className="d-flex   align-items-center justify-content-center" style={{marginTop:"30px"}}>
          
           <Link to='/contactus'>
                <Button variant="primary">Contact Us</Button>     
          </Link>
        
          
          </div>
          </Col>

          <Col md={4}>
          <div className="d-flex  flex-column align-items-center justify-content-center" style={{marginTop:"30px"}}>
              <h6> Accepts</h6>
              <p style={{margin:"0px"}}>Gcash</p>
              <p style={{margin:"0px"}}>Bank Transfer</p>
              <p >Cash On Delivery</p>
          </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
