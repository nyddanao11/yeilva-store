import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaFacebook, FaYoutube, FaInstagram, FaShopify } from 'react-icons/fa';
import './Footer.css'; // Import your custom CSS for the footer styling

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>

          <Col>
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
              <p>&copy; 2023 Yeilva Store. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
