import React from 'react';
import Footer from './Footer';
import { Container, Row, Col, Card} from 'react-bootstrap';

export default function ContactUs () {
  return (
    <div className="contact-us">
      <Container>
        <Row>
          <Col>
            <h1>Contact Us</h1>
            <Card style={{ border: "none" }}>
              <Card.Body>
                <Card.Text>
                  <p><strong>Messenger:</strong> Yeilva Olivar Arong</p>
                  <p><strong>WhatsApp:</strong> 639497042268</p>
                  <p><strong>Phone:</strong> 639497042268</p>
                 <p><strong>Email:</strong> <a href="mailto:yeilvastore@gmail.com"> yeilvastore@gmail.com</a></p>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            {/* Add a contact form here */}
            {/* You can use a library like 'react-hook-form' for the form */}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

