import React from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Onboarding from './Onboarding';

export default function WebdevSuccess (){
  const navigate = useNavigate();

  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="shadow-lg border-0 p-4">
            <Card.Body>
              <div className="display-1 mb-4">🚀</div>
              <h2 className="fw-bold mb-3">Inquiry Received!</h2>
              <p className="text-muted mb-4">
                Thank you for reaching out to <strong>YeilvaStore</strong>. I've received your project 
                details and I'm excited to review them.
              </p>
              
              <div className="text-start bg-light p-4 rounded mb-4">
                <h5>What happens next?</h5>
                <ul className="mb-0">
                  <li className="mb-2"><strong>Review:</strong> I'll personally review your requirements within 24 hours.</li>
                  <li className="mb-2"><strong>Email:</strong> You'll receive a formal project proposal and calendar invite.</li>
                  <li><strong>Consultation:</strong> We'll hop on a quick 15-minute call to finalize the scope.</li>
                </ul>
              </div>

              <div className="d-grid gap-2">
                <Button variant="primary" size="lg" onClick={() => navigate('/')}>
                  Back to Store
                </Button>
                <Button variant="outline-secondary" onClick={() => navigate('/developerservices')}>
                  View Other Services
                </Button>
                  <Button variant="outline-secondary" onClick={() => navigate('/onboarding')}>
                  Onboarding Checklist
                </Button>
              </div>
            </Card.Body>
          </Card>
          <p className="mt-4 text-muted small">
            Need urgent help? Email me at <strong>yeilvastore@gmail.com</strong>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

