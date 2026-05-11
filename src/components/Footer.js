import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaYoutube, FaInstagram, FaShopify, FaCcPaypal, FaCcVisa, FaCcMastercard } from 'react-icons/fa';
import './Footer.css'; // Import your custom CSS for the footer styling
import HoverButton2 from'./HoverButton2';
import HoverButton3 from'./HoverButton3';
import HoverButton4 from'./HoverButton4';
import HoverButton6 from'./HoverButton6';
import BackToTopButton from'./BackToTopButton';

export default function Footer ({isLoggedIn}) {
// A reusable SocialLink component
      const SocialLink = ({ href, icon, label }) => (
        <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-link">
          {icon}
        </a>
      );


  return (
    <footer className="footer">
      <Container >
        <Row>

          <Col md={4} className="footer-content">
            <div>
             <img src={`${process.env.PUBLIC_URL}/images/logostore.png`}
              alt="storelogo"
              style={{ height: "36px", width: "auto"}}
              className="mb-3"/>
              <p>&copy; 2026 Yeilva Store. All rights reserved.</p>
            </div>
          </Col>
          <Col md={4}  className="d-flex flex-column align-items-center justify-content-center mt-2 mb-3" >
          <div style={{marginBottom:"15px"}}>  
           <HoverButton2 /> 
          </div>
          {!isLoggedIn &&(
          <div style={{marginBottom:"15px"}} >  
           <HoverButton3/> 
          </div>
          )}
           <div style={{marginBottom:"15px"}}>  
        <HoverButton6 />
           </div> 
          <div style={{marginBottom:"15px"}}>  
        <HoverButton4 />
           </div>      
          </Col>

          <Col md={4} className="d-flex flex-column align-items-center align-items-md-start mt-4 mt-md-2">
  <h6 className="text-uppercase fw-bold mb-3 mt-4">Secure Payments</h6>
  
  {/* Flex container for icons with wrapping for mobile responsiveness */}
  <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-md-start align-items-center">
    <img
      src={`${process.env.PUBLIC_URL}/images/visa.png`}
      alt="Visa"
      style={{ height: "24px", width: "auto", filter: "grayscale(20%)" }}
      className="payment-icon"
    />
    <img
      src={`${process.env.PUBLIC_URL}/images/mastercard.png`}
      alt="Mastercard"
      style={{ height: "24px", width: "auto" }}
      className="payment-icon"
    />
    <img
      src={`${process.env.PUBLIC_URL}/images/paypal.png`}
      alt="PayPal"
      style={{ height: "24px", width: "auto" }}
      className="payment-icon"
    />
    {/* Optional: Add a security badge icon like SSL or Norton for trust */}
  </div>
  
  <p className="text-muted small mt-2">100% Secure Checkout</p>
</Col>
        </Row>
      </Container>
      <BackToTopButton />
    </footer>
  );
};


