import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Button, Card, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as PersonCircleIcon } from './person-circle.svg';

// 1. Cleaned up Product Details - Completely visible, no weird onClick arrays needed
const ProductDetails = ({ selectedProduct }) => {
  if (!selectedProduct) return null;
  
  return (
    <div className="mb-5">
      <h3 className="h4 fw-bold mb-3 text-dark">About This Ebook</h3>
      <div className="text-secondary lh-base" style={{ fontSize: '1.05rem' }}>
        {selectedProduct.productdetails}
      </div>
      
      {/* Micro-copy to eliminate shipping confusion */}
      <div className="mt-3 p-3 bg-light rounded d-flex align-items-center">
        <Badge bg="success" className="me-2">Instant Access</Badge>
        <small className="text-muted">Available worldwide. Download immediately in PDF & EPUB formats after purchase.</small>
      </div>
    </div>
  );
};

// 2. High-Trust Social Proof Section
const Reviews = ({ selectedProduct, userEmail }) => {
  const [reviews, setReviews] = useState([]);
  const [statusReview, setStatusReview] = useState(null);
  const [isChecking, setIsChecking] = useState(false);

  const navigate = useNavigate();
  const selectedProd = selectedProduct?.name;
  const storedUserEmail = userEmail;

  useEffect(() => {
    const reviewStatus = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/reviewstatus`, {
          params: { userEmail: storedUserEmail, productName: selectedProd }
        });
        setStatusReview(response.data);
      } catch (error) {
        console.error('Error fetching review status:', error);
      }
    };

    if (storedUserEmail && selectedProd) {
      reviewStatus();
    }
  }, [storedUserEmail, selectedProd]);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!selectedProd) return;
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userreviews`, {
          params: { productName: selectedProd }
        });
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [selectedProd]);

  const writeReview = () => {
    if (statusReview?.reviewed) {
      // Replaced jarring alerts with a smoother UX flow
      setIsChecking(true);
      setTimeout(() => { setIsChecking(false); }, 3000); // UI notification state
      return;
    }
    navigate(`/reviewcomponent/${selectedProd}`);
  };

  const formatUserEmail = (email) => {
    if (!email) return "Reader";
    const [username, domain] = email.split('@');
    return `${username.slice(0, 3)}...@${domain}`;
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-warning" : "text-muted"}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="h4 fw-bold text-dark m-0">Reader Reviews ({reviews.length})</h3>
       
      </div>

      {statusReview?.reviewed && (
        <div className="alert alert-info py-2 small">You have already reviewed this book. Thank you!</div>
      )}

      {reviews.length === 0 ? (
        <p className="text-muted italic">No reviews yet. Be the first to share your thoughts!</p>
      ) : (
        reviews.map((review, index) => (
          <Card key={index} className="border-0 bg-light mb-2 p-3">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <div className="d-flex align-items-center">
                <PersonCircleIcon style={{ marginRight: '0.5rem', width: '20px', height: '20px' }} className="text-secondary" />
                <strong className="small">{formatUserEmail(review.email)}</strong>
              </div>
              <div style={{ fontSize: '0.9rem' }}>{renderStars(review.rating)}</div>
            </div>
            <p className="text-secondary small m-0 mt-1">{review.comments}</p>
          </Card>
        ))
      )}
    </div>
  );
};

// 3. Main High-Converting Page Wrapper
const HighConversionProductFeatured = ({ productId,featuredProducts, userEmail, handleCheckoutClick, discountedPriceFormatted }) => {
  const selectedProduct = featuredProducts.find((item) => item.id === productId);


  if (!selectedProduct) return <div className="text-center p-5">Loading product...</div>;

  return (
    <div className="py-4">
      <Row className="g-4">
        {/* Left Column: Direct Value Content Flow */}
        <Col lg={8} md={7}>
          <ProductDetails selectedProduct={selectedProduct} />
          <hr className="my-5 text-muted" />
          <Reviews selectedProduct={selectedProduct} userEmail={userEmail} />
        </Col>

        {/* Right Column: Sticky Bottom/Side CTA Box for Higher Conversions */}
        <Col lg={4} md={5}>
          <div className="sticky-top" style={{ top: '20px', zIndex: 10 }}>
            <Card className="shadow-sm border-2 border-primary p-4 bg-white text-center">
              <span className="text-uppercase tracking-wider text-primary fw-bold small mb-2 d-block">Digital Download</span>
              <h2 className="fw-extrabold mb-3">₱{discountedPriceFormatted || '9.99'}</h2>
              
              {/* Primary High-Contrast Conversion CTA */}
              <Button 
                variant="primary" 
                size="lg" 
                className="w-100 fw-bold py-3 mb-3 shadow"
                onClick={handleCheckoutClick}
              >
                Get Instant Access Now
              </Button>

              <p className="text-muted x-small m-0">
                🔒 Secure 256-bit SSL Checkout <br/>
                100% Satisfaction Guarantee
              </p>
            </Card>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default HighConversionProductFeatured;