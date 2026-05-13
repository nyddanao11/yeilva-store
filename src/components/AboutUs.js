import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="about-page bg-white">
      {/* Hero Section: Modern Minimalist */}
      <section className="position-relative overflow-hidden py-5 mb-5" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
        <Container className="py-5 text-center text-white">
          <h1 className="display-3 fw-extrabold mb-3" style={{ letterSpacing: '-1px' }}>
            Elevating Your <span style={{ color: '#38bdf8' }}>Digital Potential</span>
          </h1>
          <p className="lead mx-auto opacity-75" style={{ maxWidth: '800px', fontSize: '1.25rem' }}>
            YeilvaStore has evolved. We’ve transitioned to a 100% digital ecosystem, 
            delivering high-impact blueprints, e-books, and strategic assets 
            instantly to your inbox—anywhere in the world.
          </p>
        </Container>
      </section>

      {/* Brand Philosophy: The Digital Shift */}
      <Container className="mb-5 py-4">
        <Row className="align-items-center g-5">
          <Col lg={6}>
            <h6 className="text-primary text-uppercase fw-bold mb-2">Our Evolution</h6>
            <h2 className="fw-bold mb-4 display-6">Knowledge without Boundaries</h2>
            <p className="text-secondary mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.7' }}>
              We believe the fastest way to change your life is through the right information. 
              By moving away from physical logistics, we focus 100% of our energy on 
              <strong> quality content and instant delivery.</strong> No shipping fees, 
              no wait times—just pure value.
            </p>
            
            <div className="d-flex align-items-start mb-3">
              <div className="bg-primary-subtle p-2 rounded-3 me-3">
                <i className="bi bi-lightning-charge-fill text-primary"></i>
              </div>
              <div>
                <h5 className="fw-bold mb-1">Instant Fulfillment</h5>
                <p className="text-muted">Purchase and download in seconds. Your journey starts the moment you click pay.</p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <div className="bg-primary-subtle p-2 rounded-3 me-3">
                <i className="bi bi-globe2 text-primary"></i>
              </div>
              <div>
                <h5 className="fw-bold mb-1">Global Accessibility</h5>
                <p className="text-muted">From Philippines to Europe, our digital assets are optimized for a borderless community.</p>
              </div>
            </div>

            <Link to="/" className="text-decoration-none">
              <Button variant="primary" size="lg" className="rounded-pill px-4 py-2 shadow-sm fw-bold">
                Browse Digital Library
              </Button>
            </Link>
          </Col>
          
          <Col lg={6}>
            <div className="position-relative">
              <div className="bg-light rounded-5 shadow-lg d-flex align-items-center justify-content-center overflow-hidden" 
                   style={{ height: '500px', border: '1px solid rgba(0,0,0,0.05)', background: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop) center/cover' }}>
                {/* Overlay for text readability if needed */}
                <div className="w-100 h-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(2px)' }}>
                   <div className="bg-white p-4 rounded-4 shadow-sm text-center mx-3" style={{ maxWidth: '300px' }}>
                      <h4 className="fw-bold mb-0">The Future is Digital</h4>
                      <p className="text-muted small mb-0">Streamlined • Sustainable • Scalable</p>
                   </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Digital-First Values Grid */}
      <section className="bg-light py-5">
        <Container className="py-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Digital?</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>We optimized our business model to provide you with the most efficient experience possible.</p>
          </div>
          <Row>
            {[
              { 
                icon: 'bi-cloud-arrow-down',
                title: 'Zero Latency', 
                text: 'Skip the 2-week shipping. Access your blueprints immediately after successful PayPal or GCash transactions.' 
              },
              { 
                icon: 'bi-shield-check',
                title: 'Verified Expertise', 
                text: 'Every e-book and guide is crafted based on real-world results and technical full-stack expertise.' 
              },
              { 
                icon: 'bi-laptop',
                title: 'Device Agnostic', 
                text: 'Our products are formatted for seamless viewing on your phone, tablet, or workstation.' 
              }
            ].map((feature, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <Card className="h-100 border-0 shadow-sm transition-hover p-3" style={{ borderRadius: '20px' }}>
                  <Card.Body>
                    <div className="mb-3 text-primary fs-2">
                      <i className={`bi ${feature.icon}`}></i>
                    </div>
                    <Card.Title className="fw-bold mb-3 h4">{feature.title}</Card.Title>
                    <Card.Text className="text-secondary" style={{ lineHeight: '1.6' }}>{feature.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Modern CTA */}
      <Container className="py-5 mb-5 text-center">
        <div className="p-5 rounded-5 bg-dark text-white shadow-lg position-relative overflow-hidden">
          <div className="position-relative z-1">
            <h2 className="fw-bold display-5 mb-3">Ready to Start?</h2>
            <p className="lead opacity-75 mb-4">Your next level of growth is just a download away.</p>
            <Link to="/" className="text-decoration-none">
              <Button variant="light" size="lg" className="rounded-pill px-5 fw-bold py-3 shadow-lg">Get Your Digital Copy</Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}