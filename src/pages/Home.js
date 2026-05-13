import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBolt, FaGlobe, FaHeadset, FaFileDownload, FaStar, FaShieldAlt } from 'react-icons/fa'; 
import SEO from '../components/SEO'; 
import FeaturedProductSlides from '../components/FeaturedProductSlides';
import BestSellingProductSlides from '../components/BestSellingProductSlides';
import RecommendedProductSlides from '../components/RecommendedProductSlides';
import Accordion from '../components/FAQAccordion';
import ImageSlider from '../components/ImageSlider';
import './Home.css';

export default function Home({ 
  product, isLoggedIn, 
  featuredProducts = [], loading, error, 
  bestSellingProducts = [], bestLoading, bestError 
}) {

  const sections = [
    { 
      title: "Premium Digital Blueprints", 
      subtitle: "Curated guides for high-performance living",
      data: featuredProducts || [], 
      link: "/featuredproduct", 
      Component: FeaturedProductSlides,
      props: { featuredProducts: featuredProducts || [], loading, error } 
    },
    { 
      title: "Community Favorites", 
      subtitle: "Most downloaded transformation guides this month",
      data: bestSellingProducts || [], 
      link: "/bestsellingproduct", 
      Component: BestSellingProductSlides,
      props: { bestSellingProducts: bestSellingProducts || [], bestLoading, bestError } 
    }
  ];

  return (
    <div className="home-wrapper bg-white">
      <SEO 
        title="YeilvaStore | Premium Digital Blueprints & Guides" 
        description="Instant access to expert-led digital blueprints for wellness and home optimization. Start your transformation today." 
      />

      {/* 1. Hero Section - Sleeker with Overlay Refinement */}
      <section className="hero-section position-relative text-white overflow-hidden">
        <ImageSlider />
        <div className="hero-content-wrapper d-flex align-items-center justify-content-center text-center">
          <Container className="position-relative z-index-2">
            <Badge bg="primary" className="mb-3 px-3 py-2 text-uppercase fw-bold shadow-sm">
              New: 2026 Digital Collection Out Now
            </Badge>
            <h1 className="display-3 fw-extrabold mb-3" style={{ letterSpacing: '-1.5px' }}>
              Knowledge Delivered <span className="text-primary">Instantly.</span>
            </h1>
            <p className="lead mb-4 mx-auto opacity-90" style={{ maxWidth: '700px' }}>
              Skip the shipping. Access professional blueprints and e-books designed to 
              optimize your health and living space.
            </p>
            <div className="d-flex gap-3 justify-content-center">
              <Link to="/alldealsproduct"> 
                <Button variant="primary" size="lg" className="rounded-pill px-5 py-3 fw-bold shadow-lg border-0">
                  Enter the Vault
                </Button>
              </Link>
              {!isLoggedIn && (
                <Link to="/register">
                  <Button variant="outline-light" size="lg" className="rounded-pill px-4 py-3 fw-bold border-2">
                    Join Community
                  </Button>
                </Link>
              )}
            </div>
          </Container>
        </div>
      </section>

      {/* 2. Enhanced Trust Bar (Modern Glassmorphism) */}
      <div className="trust-bar-wrapper">
        <Container className="mt-n4 position-relative z-index-3">
          <div className="bg-white rounded-4 shadow-lg p-4 border border-light">
            <Row className="text-center g-3">
              <Col md={4} className="border-end-md">
                <div className="d-flex align-items-center justify-content-center">
                  <FaBolt className="text-warning fs-4 me-3"/>
                  <div className="text-start">
                    <div className="fw-bold mb-0">Auto-Fulfillment</div>
                    <small className="text-muted">Instant link via email</small>
                  </div>
                </div>
              </Col>
              <Col md={4} className="border-end-md">
                <div className="d-flex align-items-center justify-content-center">
                  <FaShieldAlt className="text-info fs-4 me-3"/>
                  <div className="text-start">
                    <div className="fw-bold mb-0">Secure Checkout</div>
                    <small className="text-muted">PayPal & GCash verified</small>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex align-items-center justify-content-center">
                  <FaStar className="text-primary fs-4 me-3"/>
                  <div className="text-start">
                    <div className="fw-bold mb-0">Lifetime Access</div>
                    <small className="text-muted">Free version updates</small>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      <Container className="py-5">
        {/* 3. The Advantage Grid (Modernized Cards) */}
        <div className="text-center mb-5 mt-4">
          <h2 className="fw-bold display-6 mb-2">Why Digital Blueprints?</h2>
          <div className="bg-primary mx-auto mb-4" style={{ height: '4px', width: '60px', borderRadius: '2px' }}></div>
        </div>
        
        <Row className="g-4 mb-5">
          {[
            { icon: <FaFileDownload />, title: "Instant Delivery", desc: "No logistics, no customs. Purchase and download to your device in under 60 seconds." },
            { icon: <FaGlobe />, title: "Global Portability", desc: "Access your library from any device, anywhere. Optimized for Mobile, iPad, and Desktop." },
            { icon: <FaHeadset />, title: "24/7 Support", desc: "Facing a download issue? Our tech team is ready to assist you round the clock." }
          ].map((item, i) => (
            <Col lg={4} key={i}>
              <Card className="h-100 border-0 bg-light-subtle rounded-4 p-4 feature-card transition-hover">
                <div className="icon-box bg-white shadow-sm rounded-3 d-inline-flex p-3 mb-3 text-primary fs-3">
                  {item.icon}
                </div>
                <h5 className="fw-bold">{item.title}</h5>
                <p className="text-muted small mb-0">{item.desc}</p>
              </Card>
            </Col>
          ))}
        </Row>

        {/* 4. Product Sections with Refined Headers */}
        {sections.map((section, idx) => (
          <div key={idx} className="mb-5 py-3">
            <div className="d-flex justify-content-between align-items-end mb-4 border-bottom pb-3">
              <div>
                <h3 className="fw-extrabold mb-1">{section.title}</h3>
                <p className="text-muted mb-0">{section.subtitle}</p>
              </div>
              <Link to={section.link} className="btn btn-link text-decoration-none fw-bold p-0 text-primary">
                Explore All <FaBolt className="ms-1" size={12}/>
              </Link>
            </div>
            <section.Component product={product} {...section.props} />
          </div>
        ))}

        {/* 5. Modern FAQ Section */}
        <Row className="justify-content-center py-5">
          <Col lg={10}>
            <div className="p-5 rounded-5 bg-dark text-white shadow-2xl">
              <Row className="align-items-center">
                <Col md={5} className="mb-4 mb-md-0">
                  <h2 className="fw-bold display-6">Got Questions?</h2>
                  <p className="opacity-75">Everything you need to know about our digital delivery system and secure payments.</p>
                  <Link className="text-decoration-none" to="/needhelp">
                  <Button className="rounded-pill px-4" variant="outline-light">
                    Contact Support
                  </Button>
                </Link>
                </Col>
                <Col md={7}>
                  <div className="bg-white rounded-4 p-2 text-dark shadow-sm">
                    <Accordion />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}