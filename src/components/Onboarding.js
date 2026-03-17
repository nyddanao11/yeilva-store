import React, {useState} from 'react';
import { Container, Row, Col, Card, ListGroup, Alert, Button, Form, Modal} from 'react-bootstrap';

export default function Onboarding () {
  const [hasAgreed, setHasAgreed] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const handleFinalSubmit = () => {
    if (hasAgreed) {
      // Instead of just an alert, we show the payment modal
      setShowPayment(true);
    }
  };

  const handleDownload = () => {
  const link = document.createElement('a');
  // 1. Point to the actual file location
  link.href = `${process.env.PUBLIC_URL}/agreement/webdevserviceagreement.pdf`; 
  
  // 2. Set the "Save As" filename (don't include the path here)
  link.download = 'WebDev_Service_Agreement.pdf'; 
  
  document.body.appendChild(link); // Good practice to append it briefly
  link.click();
  document.body.removeChild(link); // Clean up after clicking
};


  return (
    <Container className="py-5">
      <h2 className="text-center mb-4">Project Onboarding Checklist</h2>
      <p className="text-center text-muted mb-5">To ensure a smooth launch for your PERN stack website, please prepare the following:</p>

      <Row className="g-4">
        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>1. Business Assets</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>High-resolution Logo (PNG/SVG)</ListGroup.Item>
                <ListGroup.Item>Brand Colors (Hex Codes)</ListGroup.Item>
                <ListGroup.Item>Product Images & Descriptions</ListGroup.Item>
                <ListGroup.Item>Domain Name (e.g., .com or .com.ph)</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <Card.Title>2. Technical Access</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Access to Domain Registrar (GoDaddy/Namecheap)</ListGroup.Item>
                <ListGroup.Item>Payment Gateway Credentials (Stripe/PayPal/Maya)</ListGroup.Item>
                <ListGroup.Item>Third-party API Keys (if applicable)</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Alert variant="info" className="mt-5">
        <Alert.Heading>Payment & Terms (Philippines Based)</Alert.Heading>
        <p>
          I require a <strong>50% Downpayment</strong> before project commencement. 
          Accepted methods: <strong>GCash, Maya, Bank Transfer (BPI)</strong>.
        </p>
      </Alert>

      <div className="text-center mt-4">
        <Button variant="success" size="lg">I Have Everything Ready - Let's Sign</Button>
      </div>

      <Card className="mt-5 border-primary shadow">
        <Card.Body className="text-center p-4">
          <h3 className="mb-3">Finalize Agreement</h3>
          <p className="text-muted">
            Please download and review the binding agreement. By checking the box below, 
            you agree to the 50% downpayment and project terms.
          </p>

          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-4">
            <Button variant="outline-primary" onClick={handleDownload}>
              📄 Download Contract (PDF)
            </Button>
          </div>

          <Form.Group className="mb-4 d-flex justify-content-center">
            <Form.Check 
              type="checkbox"
              id="agreement-checkbox"
              label="I have read and agree to the Service Agreement and Onboarding requirements."
              checked={hasAgreed}
              onChange={(e) => setHasAgreed(e.target.checked)}
              className="fw-bold"
            />
          </Form.Group>

          <Button 
            variant="success" 
            size="lg" 
            className="px-5 shadow" 
            disabled={!hasAgreed}
            onClick={handleFinalSubmit}
          >
            Confirm & Start Project
          </Button>
          
          {!hasAgreed && (
            <div className="text-danger small mt-2">
              * You must agree to the terms before proceeding.
            </div>
          )}
        </Card.Body>
      </Card>

      {/* --- PAYMENT MODAL --- */}
      <Modal 
        show={showPayment} 
        onHide={() => setShowPayment(false)} 
        centered
        backdrop="static" // Prevents closing by clicking outside
      >
        <Modal.Header closeButton>
          <Modal.Title>Secure Downpayment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h5>Thank you for choosing YeilvaStore!</h5>
          <p className="text-muted small">
            To begin development, please send the 50% downpayment via GCash or Maya.
          </p>
          
          <Row className="my-4">
            <Col>
              {/* Replace 'gcash-qr.jpg' with your actual image path in /public */}
              <div className="p-2 border rounded bg-light mb-2">
               <img 
                  src={`${process.env.PUBLIC_URL}/images/nangcash.jpg`} 
                  alt="GCash QR" 
                  style={{ width: '100%', maxWidth: '200px' }} 
                />
              </div>
              <p className="fw-bold mb-0">GCash</p>
              <p className="small text-muted">09XX XXX XXXX</p>
            </Col>
          </Row>

          <div className="bg-warning-subtle p-3 rounded small text-start">
            <strong>Next Steps:</strong>
            <ol className="mb-0 mt-2">
              <li>Scan the QR code and send the amount.</li>
              <li>Take a screenshot of the receipt.</li>
              <li>Email the receipt to <strong>yeilvastore@gmail.com</strong>.</li>
            </ol>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPayment(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => window.location.href='mailto:yeilvastore.com?subject=Payment Receipt'}>
            I've Sent the Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};