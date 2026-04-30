import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import FeaturedProductSlides from '../components/FeaturedProductSlides';
import BestSellingProductSlides from '../components/BestSellingProductSlides';
import RecommendedProductSlides from '../components/RecommendedProductSlides';
import CircleCard from '../components/CircleProductCard';
import Accordion from '../components/FAQAccordion';
import ImageSlider from '../components/ImageSlider';
import PopUpAdds from '../components/PopUpAdds'; 
import './Home.css';

export default function Home({ 
  product, isLoggedIn, handleItemClickCategory, 
  featuredProducts = [], // Default to empty array
  loading, error, 
  bestSellingProducts = [], // Default to empty array
  bestLoading, bestError, 
  recommendedProducts = [], // Default to empty array
  recommendedLoading, recommendedError 
}) {

  // Use Optional Chaining to prevent crashes
  const sections = [
    { 
      title: "Featured Products", 
      data: featuredProducts || [], 
      link: "/featuredproduct", 
      Component: FeaturedProductSlides,
      props: { featuredProducts: featuredProducts || [], loading, error } 
    },
    { 
      title: "Best Sellers", 
      data: bestSellingProducts || [], 
      link: "/bestsellingproduct", 
      Component: BestSellingProductSlides,
      props: { bestSellingProducts: bestSellingProducts || [], bestLoading, bestError } 
    }
  ];

  return (
    <div className="home-wrapper">
      <PopUpAdds delay={3000} autoCloseAfter={15000} isLoggedIn={isLoggedIn} />
      
      <section className="hero-section">
        <ImageSlider />
        <div className="hero-overlay-text text-center">
          <h1>Elevate Your Home Wellness</h1>
          <p>Clean living starts with the right essentials.</p>
         <Link to="/alldealsproduct" className="text-decoration-none"> <Button variant="primary" size="lg">Shop New Arrivals</Button></Link>
        </div>
      </section>

      <div className="trust-bar bg-light py-3 border-bottom">
        <Container>
          <Row className="text-center g-2">
            <Col xs={4}><span>🌿 Natural</span></Col>
            <Col xs={4}><span>🚚 Eco-Shipping</span></Col>
            <Col xs={4}><span>⭐ 4.8/5 Rating</span></Col>
          </Row>
        </Container>
      </div>

      <Container>
        <section className="py-5">
          <h2 className="section-title text-center mb-4">Shop by Category</h2>
          <Row className="justify-content-center">
            <Col lg={10} className="category-card-wrapper shadow-sm rounded bg-white p-3">
              <CircleCard product={product} handleItemClickCategory={handleItemClickCategory}/>
            </Col>
          </Row>
        </section>

        {sections.map((section, idx) => (
          <Row key={idx} className="justify-content-center mb-5">
            <Col lg={10}>
              <div className="d-flex justify-content-between align-items-end mb-3">
                <div>
                  <h3 className="h4 mb-0">{section.title}</h3>
                  <small className="text-muted">({section.data?.length || 0}) Items</small>
                </div>
                <Link to={section.link} className="view-all-link text-decoration-none">View All →</Link>
              </div>
              {/* Pass the specific props defined in the object above */}
              <section.Component product={product} {...section.props} />
            </Col>
          </Row>
        ))}

        <Row className="justify-content-center py-5">
          <Col lg={8}>
            <h3 className="text-center mb-4">FAQ</h3>
            <Accordion />
          </Col>
        </Row>
      </Container>
    </div>
  );
}