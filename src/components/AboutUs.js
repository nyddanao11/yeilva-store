import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="bg-dark text-white py-5 mb-5">
        <Container className="py-5 text-center">
          <h1 className="display-4 fw-bold">Innovating Daily Living</h1>
          <p className="lead mx-auto" style={{ maxWidth: '700px' }}>
            At YeilvaStore, we bridge the gap between advanced utility and everyday wellness. 
            From curated digital assets to smart physical solutions, we empower your modern lifestyle.
          </p>
        </Container>
      </section>

      {/* Brand Philosophy */}
      <Container className="mb-5">
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <h2 className="fw-bold mb-4">Our Mission</h2>
            <p className="text-muted mb-4">
              YeilvaStore was founded on a simple principle: high-quality solutions 
              should be accessible, reliable, and intelligently designed. We specialize 
              in three core pillars that define a balanced, efficient life.
            </p>
            <ul className="list-unstyled mb-4">
              <li className="mb-3">
                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                <strong>Wellness:</strong> Elevating your physical well-being through thoughtful, ergonomic innovation.
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                <strong>Home Solutions:</strong> Refining your living space for maximum comfort and organizational efficiency.
              </li>
              <li className="mb-3">
                <i className="bi bi-check-circle-fill text-primary me-2"></i>
                <strong>Digital Excellence:</strong> Empowering your growth with curated digital guides and strategic blueprints.
              </li>
            </ul>
            <Link to="/" className="text-decoration-none">
              <Button variant="primary" size="lg" className="shadow-sm">Explore Our Collection</Button>
            </Link>
          </Col>
          <Col lg={6}>
            <div className="bg-light rounded shadow-sm d-flex align-items-center justify-content-center overflow-hidden" style={{ height: '450px', border: '1px solid #eee' }}>
              {/* Pro-tip: Replace this div with an <img> tag once you have your brand lifestyle photo */}
              <div className="text-center p-4">
                <h3 className="text-secondary fw-light">Yeilva Lifestyle</h3>
                <p className="text-muted small">Wellness • Home • Digital</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Features/Values Grid */}
      <section className="bg-light py-5">
        <Container>
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose YeilvaStore?</h2>
            <p className="text-muted">Commitment to quality in every asset we deliver.</p>
          </div>
          <Row>
            {[
              { 
                title: 'Quality Assurance', 
                text: 'Whether physical or digital, every product undergoes rigorous testing to meet our high durability and utility standards.' 
              },
              { 
                title: 'Customer First', 
                text: 'Our support team is dedicated to ensuring your experience is seamless, from checkout to instant digital delivery.' 
              },
              { 
                title: 'Secure Shopping', 
                text: 'We utilize industry-standard encryption and trusted payment integrations like GCash and PayPal for your peace of mind.' 
              }
            ].map((feature, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <Card className="h-100 border-0 shadow-sm text-center p-4">
                  <Card.Body>
                    <Card.Title className="fw-bold mb-3">{feature.title}</Card.Title>
                    <Card.Text className="text-muted">{feature.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <Container className="py-5 text-center">
        <div className="p-5 rounded-4 border bg-white shadow-sm">
          <h2 className="fw-bold">Ready to Optimize Your Life?</h2>
          <p className="text-muted">Join the Yeilva community and discover solutions designed for the modern world.</p>
          <Link to="/" className="text-decoration-none">
            <Button variant="dark" size="lg" className="px-5 mt-3 shadow">Shop Now</Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}