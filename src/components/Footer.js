import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaYoutube, FaInstagram, FaShopify } from 'react-icons/fa';
import './Footer.css'; // Import your custom CSS for the footer styling
import HoverButton2 from'./HoverButton2';
import HoverButton3 from'./HoverButton3';
import HoverButton4 from'./HoverButton4';
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
              <SocialLink  href="https://www.youtube.com/@NYDChannel" icon={<FaYoutube  className="icons"/>} label="Subscribe to our YouTube channel" />
              <SocialLink  href="https://www.instagram.com/yeilvastore" icon={<FaInstagram  className="icons"/>} label="Follow us on Instagram" />
              <SocialLink  href="https://shope.ee/5pZmnVEM3L" icon={<FaShopify  className="icons"/>} label="Shop on Shopee" />
              </div>
              <p>&copy; 2025 Yeilva Store. All rights reserved.</p>
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
       
            <h5>We Accept</h5>
            {/* Use icons for payment methods for better visual representation */}
            <ul className="payment-methods">
              <li>E-Wallet</li>
              <li>Bank Transfer</li>
              <li>Cash On Delivery</li>
              <li>Installment</li>
            </ul>
          </Col>
        </Row>
      </Container>
      <BackToTopButton />
    </footer>
  );
};


