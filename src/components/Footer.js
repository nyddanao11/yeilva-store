import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaInstagram, FaLock, FaDownload } from 'react-icons/fa';
import './Footer.css';
import HoverButton2 from './HoverButton2';
import HoverButton3 from './HoverButton3';
import HoverButton4 from './HoverButton4';
import HoverButton6 from './HoverButton6';
import BackToTopButton from './BackToTopButton';

// Hoisted outside the component so it isn't redefined on every render
const SocialLink = ({ href, icon, label }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="social-link">
    {icon}
  </a>
);

export default function Footer({ isLoggedIn }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>

          <Col md={4} className="footer-content">
            <div>
              <img
                src={`${process.env.PUBLIC_URL}/images/logostore.png`}
                alt="storelogo"
                style={{ height: "36px", width: "auto" }}
                className="mb-3"
              />
              <p className="d-flex justify-content-center align-items-center small pe-lg-5">
                Discover practical digital guides designed to help you learn AI, create better content, grow your online business, and achieve more with modern digital skills.
              </p>
              <p className="d-flex justify-content-center align-items-center small pe-lg-5 mt-3">Cebu Philippines</p>

              {/* TODO: replace href="#" with your real profile URLs */}
              <div className="d-flex justify-content-center gap-3 mt-3">
                <SocialLink href="#" icon={<FaFacebook size={18} />} label="Follow us on Facebook" />
                <SocialLink href="#" icon={<FaInstagram size={18} />} label="Follow us on Instagram" />
                <SocialLink href="https://www.youtube.com/@yeilvastore" icon={<FaYoutube size={18} />} label="Subscribe on YouTube" />
              </div>
            </div>
          </Col>

          <Col md={4} className="d-flex flex-column align-items-center justify-content-center mt-2 mb-3" style={{ gap: '15px' }}>
            <HoverButton2 />
            {!isLoggedIn && <HoverButton3 />}
            <HoverButton6 />
            <HoverButton4 />
          </Col>

          <Col md={4} className="d-flex flex-column align-items-center align-items-md-start mt-4 mt-md-2">
            <h6 className="text-uppercase fw-bold mb-4">Secure Digital Delivery</h6>

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
              {/* Consider adding GCash / Maya logos here if you have the asset files —
                  local payment trust marks matter more than international card logos
                  for a Cebu-based audience. */}
            </div>

            <div className="trust-badges mt-4 pt-2 border-top border-secondary">
              <div className="d-flex align-items-center mb-2 justify-content-center justify-content-md-start">
                <FaLock className="text-success me-2" size={14} />
                <span className="small">SSL Encrypted Checkout</span>
              </div>
              <div className="d-flex align-items-center justify-content-center justify-content-md-start">
                <FaDownload className="text-info me-2" size={14} />
                <span className="small">Instant PDF & Asset Access</span>
              </div>
            </div>

            <p className="small mt-2">100% Secure Checkout</p>
          </Col>
        </Row>

        <hr className="my-4 border-secondary opacity-25" />

        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start">
            <p className="small mb-0">
              &copy; {currentYear} YeilvaStore. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end mt-2 mt-md-0">
          <Link to="/returnpolicy" className="small text-decoration-none me-3">Return Policy</Link>
            <Link to="/privacypolicy" className="small text-decoration-none me-3">Privacy Policy</Link>
            <Link to="/termsandconditions" className="small text-decoration-none">Terms of Service</Link>
          </Col>
        </Row>
      </Container>
      <BackToTopButton />
    </footer>
  );
}
