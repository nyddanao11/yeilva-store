import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaYoutube, FaInstagram, FaShopify, FaLock,FaDownload} from 'react-icons/fa';
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

const currentYear = new Date().getFullYear();

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
             <p className=" d-flex justify-content-center align-items-center small pe-lg-5">
              Empowering your digital transformation with expert-led blueprints 
              for wellness and home optimization. Instant access, lifetime value.
            </p>
            <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
              <a href="#" className=" hover-primary"><FaFacebook size={20} /></a>
              <a href="#" className="hover-primary"><FaInstagram size={20} /></a>
              <a href="#" className="hover-primary"><FaYoutube size={20} /></a>
           </div>
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
  <h6 className="text-uppercase fw-bold mb-4">Secure Digital Delivery</h6>
  
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
  <div className="trust-badges mt-4 pt-2 border-top border-secondary">
              <div className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
                <FaLock className="text-success me-2" size={14}/>
                <span className="small ">SSL Encrypted Checkout</span>
              </div>
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <FaDownload className="text-info me-2" size={14}/>
                <span className="small ">Instant PDF & Asset Access</span>
              </div>
            </div>
  
  <p className=" small mt-2">100% Secure Checkout</p>
</Col>
        </Row>
        <hr className="my-4 border-secondary opacity-25" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="tex small mb-0">
              &copy; {currentYear} YeilvaStore. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-2 mt-md-0">
            <a href="/privacypolicy" className=" small text-decoration-none me-3">Privacy Policy</a>
            <a href="/termsandconditions" className="small text-decoration-none">Terms of Service</a>
          </Col>
        </Row>
      </Container>
      <BackToTopButton />
    </footer>
  );
};


