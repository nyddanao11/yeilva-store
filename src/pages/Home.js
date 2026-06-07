import React from 'react';
import { Container, Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaBolt, FaGlobe, FaHeadset, FaFileDownload, FaStar, FaShieldAlt, FaArrowRight, FaStore } from 'react-icons/fa'; 
import SEO from '../components/SEO'; 
import FeaturedProductSlides from '../components/FeaturedProductSlides';
import BestSellingProductSlides from '../components/BestSellingProductSlides';
import RecommendedProductSlides from '../components/RecommendedProductSlides';
import Accordion from '../components/FAQAccordion';
/* Removed ImageSlider import to reduce network bundle overhead */
import './Home.css';

export default function Home({ 
  product, isLoggedIn, 
  featuredProducts = [], loading, error, 
  bestSellingProducts = [], bestLoading, bestError,
  recommendedProducts = [], recommendedLoading, recommendedError
}) {

  const sections = [
    { 
      title: "Artificial Intelligence", 
      subtitle: "Learn prompt engineering, AI workflows, automation, and productivity systems",
      data: featuredProducts || [], 
      link: "/featuredproduct", 
      Component: FeaturedProductSlides,
      props: { featuredProducts: featuredProducts || [], loading, error } 
    },
    { 
      title: "Content Creation", 
      subtitle: "Build audiences, create better content, and grow online",
      data: bestSellingProducts || [], 
      link: "/bestsellingproduct", 
      Component: BestSellingProductSlides,
      props: { bestSellingProducts: bestSellingProducts || [], bestLoading, bestError } 
    },
     { 
      title: "Online Business", 
      subtitle: "Create digital products, faceless brands, and scalable online income streams.",
      data: recommendedProducts || [], 
      link: "/recommendedproduct", 
      Component: RecommendedProductSlides,
      props: { recommendedProducts: recommendedProducts || [], recommendedLoading, recommendedError } 
    }
  ];

  /* Defined hero banner layout fallback styling config */
  const heroStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.65)), url(${process.env.PUBLIC_URL}/digital/digitalproduct.png)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '80vh'
  };

  return (
    <div className="home-wrapper bg-white">
    <SEO
      title="AI, Content Creation & Online Business Ebooks | Yeilva Store"
      description="Discover practical ebooks on AI, content creation, online business, productivity, and digital skills. Instant downloads designed to help creators, entrepreneurs, and professionals grow faster."
    />

      {/* 1. Hero Section - Refined Static Structural Focus */}
      <section 
        className="hero-section position-relative text-white overflow-hidden d-flex align-items-center" 
        style={heroStyle}
      >
        <div className="hero-content-wrapper d-flex align-items-center justify-content-center text-center w-100">
          <Container className="position-relative z-index-2 py-5">
            <Badge bg="primary" className="mb-3 px-3 py-2 text-uppercase fw-bold shadow-sm">
              New: 2026 Digital Collection Out Now
            </Badge>
            <h1 className="display-3 fw-extrabold mb-3" style={{ letterSpacing: '-1.5px' }}>
             Build Smarter Skills with AI, Content Creation & Online Business Guides <span className="text-primary">Instantly.</span>
            </h1>
            <p className="lead mb-4 mx-auto opacity-90" style={{ maxWidth: '700px' }}>
             Practical ebooks and digital resources designed to help creators, entrepreneurs, and professionals learn high-value skills faster.
            </p>
            
            {/* CRO Fix: Clear, action-oriented primary button with clear expectations */}
            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center align-items-center">
              <Link to="/alldealsproduct"> 
                <Button variant="primary" size="lg" className="rounded-pill px-5 py-3 fw-bold shadow-lg border-0">
                  Browse Digital Blueprints
                </Button>
              </Link>
              {!isLoggedIn && (
                <Link to="/alldealsproduct" className="text-white fw-bold text-decoration-none transition-hover py-2">
                  View Latest Deals <FaArrowRight size={14} className="ms-1" />
                </Link>
              )}
            </div>
          </Container>
        </div>
      </section>

<div className="trust-bar-wrapper">
  <Container className="mt-n4 position-relative z-index-3">
    <div className="bg-white rounded-4 shadow-lg p-4 border border-light">
      <Row className="text-center g-4">

        <Col md={3}>
          <div className="d-flex align-items-center justify-content-center">
            <FaBolt className="text-warning fs-4 me-3" />
            <div className="text-start">
              <div className="fw-bold mb-0">
                Instant Download
              </div>
              <small className="text-muted">
                Access your ebook immediately
              </small>
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="d-flex align-items-center justify-content-center">
            <FaStore className="text-primary fs-4 me-3" />
            <div className="text-start">
              <div className="fw-bold mb-0">
                Digital Product Store
              </div>
              <small className="text-muted">
                Ebooks, guides & learning resources
              </small>
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="d-flex align-items-center justify-content-center">
            <FaShieldAlt className="text-info fs-4 me-3" />
            <div className="text-start">
              <div className="fw-bold mb-0">
                Secure Payments
              </div>
              <small className="text-muted">
                PayPal & GCash supported
              </small>
            </div>
          </div>
        </Col>

        <Col md={3}>
          <div className="d-flex align-items-center justify-content-center">
            <FaHeadset className="text-success fs-4 me-3" />
            <div className="text-start">
              <div className="fw-bold mb-0">
                Customer Support
              </div>
              <small className="text-muted">
                We're here to help
              </small>
            </div>
          </div>
        </Col>

      </Row>
    </div>
  </Container>
</div>

      <Container className="py-5">
        {/* 3. Product Sections - CRO Optimization: Moved up directly below trust signals */}
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
            <section.Component featuredProducts={featuredProducts} bestSellingProducts={bestSellingProducts} recommendedProducts={recommendedProducts} {...section.props} />
          </div>
        ))}

        {/* 4. The Advantage Grid - Repositioned lower as an objection-handler */}
        <div className="my-5 pt-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold display-6 mb-2">Why Choose Digital Blueprints?</h2>
            <div className="bg-primary mx-auto mb-4" style={{ height: '4px', width: '60px', borderRadius: '2px' }}></div>
          </div>
          
          <Row className="g-4">
            {[
              { icon: <FaFileDownload />, title: "Zero Logistics Friction", desc: "No delays, no delivery fees. Secure your purchase and start executing your plan in under 60 seconds." },
              { icon: <FaGlobe />, title: "Cross-Device Portability", desc: "Your personal library syncs anywhere. Designed cleanly to read on Mobile, iPad, and Desktop layouts." },
              { icon: <FaHeadset />, title: "Dedicated Support Pipeline", desc: "Ran into a downloading or access issue? Reach out to our technical team for immediate, rapid support." }
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
        </div>

        {/* 5. Bottom Catch-All Conversion Banner - Catches bottom-scrollers before the footer */}
        <div className="text-center py-5 my-5 bg-light rounded-4 p-4 p-md-5 border border-light-subtle shadow-sm">
          <h3 className="fw-extrabold mb-2 display-6">Start Building Valuable Digital Skills Today</h3>
         <p className="text-muted mb-4 mx-auto" style={{ maxWidth: '600px' }}>
          Unlock instant access to our premium, expert-backed blueprints. Skip the guesswork and master high-income skills in artificial intelligence, content strategy, and digital entrepreneurship today.
        </p>
          <Link to="/alldealsproduct">
            <Button variant="primary" size="lg" className="rounded-pill px-5 py-3 fw-bold shadow">
             Explore Our AI, Content Creation & Online Business Library
            </Button>
          </Link>
        </div>

        {/* 6. Modern FAQ Section */}
        <Row className="justify-content-center py-4">
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