import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBolt, FaGlobe, FaHeadset, FaFileDownload } from 'react-icons/fa'; // Added icons
import SEO from '../components/SEO'; // Added SEO
import FeaturedProductSlides from '../components/FeaturedProductSlides';
import BestSellingProductSlides from '../components/BestSellingProductSlides';
import RecommendedProductSlides from '../components/RecommendedProductSlides';
import Accordion from '../components/FAQAccordion';
import ImageSlider from '../components/ImageSlider';
import PopUpAdds from '../components/PopUpAdds'; 
import './Home.css';

export default function Home({ 
  product, isLoggedIn, 
  featuredProducts = [], loading, error, 
  bestSellingProducts = [], bestLoading, bestError 
}) {

  const sections = [
    { 
      title: "Digital Wellness Blueprints", // Updated Title
      data: featuredProducts || [], 
      link: "/featuredproduct", 
      Component: FeaturedProductSlides,
      props: { featuredProducts: featuredProducts || [], loading, error } 
    },
    { 
      title: "Most Popular Guides", // Updated Title
      data: bestSellingProducts || [], 
      link: "/bestsellingproduct", 
      Component: BestSellingProductSlides,
      props: { bestSellingProducts: bestSellingProducts || [], bestLoading, bestError } 
    }
  ];

  return (
    <div className="home-wrapper">
      {/* 1. Global SEO Update */}
      <SEO 
        title="Digital Wellness & Home Blueprints" 
        description="Instant access to expert-led digital guides for holistic wellness and home optimization. Transform your life from anywhere in the world." 
      />

      <PopUpAdds delay={3000} autoCloseAfter={15000} isLoggedIn={isLoggedIn} />
      
      {/* 2. Updated Hero for Digital Transformation */}
      <section className="hero-section text-white">
        <ImageSlider />
        <div className="hero-overlay-text text-center">
          <h1 className="display-4 fw-bold">Master Your Wellness. Optimize Your Home.</h1>
          <p className="lead">Instant-access digital blueprints designed for a healthier, smarter lifestyle.</p>
          <Link to="/alldealsproduct" className="text-decoration-none"> 
            <Button variant="primary" size="lg" className="shadow-lg px-5">
              Access the Digital Vault
            </Button>
          </Link>
        </div>
      </section>

      {/* 3. Rebranded Trust Bar for Digital Goods */}
      <div className="trust-bar bg-white py-3 border-bottom shadow-sm">
        <Container>
          <Row className="text-center g-2 align-items-center">
            <Col xs={4}><span className="fw-bold"><FaBolt className="text-warning me-1"/> Instant Download</span></Col>
            <Col xs={4}><span className="fw-bold"><FaGlobe className="text-info me-1"/> Global Access</span></Col>
            <Col xs={4}><span className="fw-bold"><FaHeadset className="text-success me-1"/> Lifetime Updates</span></Col>
          </Row>
        </Container>
      </div>

      <Container>
        {/* 4. New "Why Digital?" Conversion Section */}
        <Row className="py-5 text-center">
          <Col xs={12}>
            <h2 className="mb-4">The YeilvaStore Digital Advantage</h2>
          </Col>
          <Col md={4} className="mb-3">
            <div className="p-4 border rounded bg-light h-100">
              <FaFileDownload size={40} className="mb-3 text-primary" />
              <h5>Zero Waiting</h5>
              <p className="small text-muted">No shipping fees or delays. Receive your files immediately after checkout.</p>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="p-4 border rounded bg-light h-100">
              <FaGlobe size={40} className="mb-3 text-primary" />
              <h5>Eco-Friendly</h5>
              <p className="small text-muted">100% paperless products. Reduce your carbon footprint with digital wellness.</p>
            </div>
          </Col>
          <Col md={4} className="mb-3">
            <div className="p-4 border rounded bg-light h-100">
              <FaBolt size={40} className="mb-3 text-primary" />
              <h5>Portable Wisdom</h5>
              <p className="small text-muted">Read on your phone, tablet, or laptop. Your wellness journey follows you anywhere.</p>
            </div>
          </Col>
        </Row>

        {sections.map((section, idx) => (
          <Row key={idx} className="justify-content-center mb-5">
            <Col lg={10}>
              <div className="d-flex justify-content-between align-items-end mb-3">
                <div>
                  <h3 className="h4 mb-0">{section.title}</h3>
                  <small className="text-muted fw-bold text-uppercase" style={{fontSize: '0.7rem'}}>
                    Instant Digital Delivery
                  </small>
                </div>
                <Link to={section.link} className="view-all-link text-decoration-none fw-bold">Browse All →</Link>
              </div>
              <section.Component product={product} {...section.props} />
            </Col>
          </Row>
        ))}

        {/* 5. Updated FAQ for Digital Concerns */}
        <Row className="justify-content-center py-5 bg-light rounded-3 my-5 shadow-sm">
          <Col lg={8}>
            <h3 className="text-center mb-2">Digital Delivery FAQ</h3>
            <p className="text-center text-muted mb-4">Everything you need to know about your purchase.</p>
            <Accordion />
          </Col>
        </Row>
      </Container>
    </div>
  );
}