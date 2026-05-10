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
             <h5> Follow us</h5>
             <div className="social-links d-flex justify-content-center gap-3">
                <SocialLink  href="https://www.facebook.com/yeilvastore/" icon={<FaFacebook className="icons"/>} label="Follow us on Facebook" />
              <SocialLink  href="https://www.youtube.com/" icon={<FaYoutube  className="icons"/>} label="Subscribe to our YouTube channel" />
              <SocialLink  href="https://www.instagram.com/yeilvastore" icon={<FaInstagram  className="icons"/>} label="Follow us on Instagram" />
              <SocialLink  href="https://shope.ee/5pZmnVEM3L" icon={<FaShopify  className="icons"/>} label="Shop on Shopee" />
              </div>
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

          <Col md={4} className="d-flex flex-column align-items-center justify-content-center mt-2" >
       
            <h5>We Accept</h5>
            {/* Use icons for payment methods for better visual representation */}
            <ul className="payment-methods">
               <li>Paypal</li>
               <li> debit/credit card</li>
                          
            </ul>
            {/* Payment Icons Container */}
          <div className="payment-icons d-flex gap-3 fs-2 primary">
            <FaCcPaypal title="PayPal" />
            <FaCcVisa title="Visa" />
            <FaCcMastercard title="Mastercard" />
          </div>
          </Col>
        </Row>
      </Container>
      <BackToTopButton />
    </footer>
  );
};


