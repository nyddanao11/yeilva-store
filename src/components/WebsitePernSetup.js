import React from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Badge} from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function DeveloperServices () {
  const tiers = [
    {
      name: "The MVP (Starter)",
      price: "₱80,000+",
      desc: "Perfect for validating a new business idea.",
      features: ["Custom UI/UX Design", "5 Core Pages", "Mobile Responsive", "Contact Form Integration", "Basic SEO Setup"],
      color: "secondary"
    },
    {
      name: "The Full Store (Professional)",
      price: "₱225,000+",
      desc: "A complete PERN stack store just like YeilvaStore.",
      features: ["Product Management (Admin)", "Secure Ewallet/banks Integration", "User Auth (JWT/OAuth)", "Inventory Tracking", "Advanced SEO & Speed Optimization"],
      color: "primary",
      featured: true
    },
    {
      name: "Enterprise Custom",
      price: "Custom Quote",
      desc: "Complex systems with unique business logic.",
      features: ["Custom API Integrations", "Real-time Analytics Dashboard", "Multi-vendor Support", "Dedicated Database Scaling", "Priority 24/7 Support"],
      color: "dark"
    }
  ];

  return (
    <Container className="py-5">
      {/* Hero Section */}
     <section className="text-center mb-5">
      <Badge bg="info" className="mb-2">Service Available</Badge>
      <h1 className="display-4 fw-bold">Love this Website? I Can Build One for You.</h1>
      <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
        Stop fighting with templates. Get a high-performance, custom-coded <strong>PERN Stack</strong> 
        solution tailored to your specific business needs.
      </p>
      
      {/* Option A: Link wrapping the Button (Cleanest for Bootstrap) */}
      <Link to="/webcontactform" style={{ textDecoration: 'none' }}>
        <Button variant="primary" size="lg" className="mt-3 px-4 shadow">
          Get a Free Consultation
        </Button>
      </Link>
    </section>

      {/* Value Proposition */}
      <Row className="mb-5 g-4 text-center">
        <Col md={4}>
          <div className="p-3">
            <h3>⚡ Lightning Fast</h3>
            <p>Built with React and Node.js for sub-second load times. Higher speed = more sales.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-3">
            <h3>🔒 Modern Security</h3>
            <p>Enterprise-grade security using PostgreSQL and secure authentication protocols.</p>
          </div>
        </Col>
        <Col md={4}>
          <div className="p-3">
            <h3>📈 Scalable Code</h3>
            <p>Your site grows with you. Easily add features without rebuilding from scratch.</p>
          </div>
        </Col>
      </Row>

      <hr className="my-5" />

      {/* Pricing Tiers */}
      <h2 className="text-center mb-4">Investment Tiers</h2>
      <Row className="justify-content-center g-4">
        {tiers.map((tier, idx) => (
          <Col key={idx} lg={4} md={6}>
            <Card className={`h-100 shadow-sm ${tier.featured ? 'border-primary border-3' : ''}`}>
              {tier.featured && <div className="bg-primary text-white text-center py-1">MOST POPULAR</div>}
              <Card.Body className="d-flex flex-column">
                <Card.Title className="h3 mb-3">{tier.name}</Card.Title>
                <div className="mb-3">
                  <span className="display-6 fw-bold">{tier.price}</span>
                </div>
                <Card.Text className="text-muted mb-4">{tier.desc}</Card.Text>
                <ListGroup variant="flush" className="mb-4">
                  {tier.features.map((f, i) => (
                    <ListGroup.Item key={i} className="px-0 small">
                      ✅ {f}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
                <Link to="/webcontactform" style={{ textDecoration: 'none' }}>
                <Button variant={tier.color} className="mt-auto w-100 py-2 fw-bold">
                  Start Project
                </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Trust Footer */}
      <footer className="mt-5 text-center p-4 bg-light rounded">
        <h4>Why choose a custom PERN stack?</h4>
        <p className="mb-0">Unlike "no-code" builders, you own your data and your code. No monthly platform fees, just pure performance.</p>
      </footer>
    </Container>
  );
};

