import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaShareAlt, FaStar, FaRegStar, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useFetchReviews from './useFetchReviews';
import'./SoldOutLabel.css';

const ImageProduct = ({ url, name, price, id, stock, discount = 0 }) => {
  const { reviewData, loading } = useFetchReviews(name);
  
  const isProductSoldOut = stock <= 0;
  const isProductDiscounted = discount > 0;
  
  const discountedPrice = isProductDiscounted 
    ? (price * (1 - discount / 100)).toFixed(2) 
    : price.toFixed(2);

  const averageRating = reviewData?.length > 0
    ? Math.round(reviewData.reduce((acc, r) => acc + r.rating, 0) / reviewData.length)
    : 0;

  // Modern star rendering using Icons for a professional feel
  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      i < rating ? <FaStar key={i} className="text-warning" /> : <FaRegStar key={i} className="text-muted" />
    ));
  };

  if (loading) return <div className="p-5 text-center text-muted">Loading...</div>;

  return (
    <Card className="product-card border-0 shadow-sm h-100 overflow-hidden transition-all" 
          style={{ borderRadius: '15px', transition: 'transform 0.2s ease-in-out' }}>
      
      {/* Badges Overlay */}
      <div className="position-absolute top-0 start-0 p-2 d-flex flex-column gap-1" style={{ zIndex: 2 }}>
        {isProductDiscounted && (
          <Badge bg="danger" className="rounded-pill px-3 py-2 shadow-sm">
            {discount}% OFF
          </Badge>
        )}
       
      </div>

      {/* Image Container with Hover Effect */}
      <div className="card-image-container position-relative overflow-hidden group">
        <Link to={`/clickproductpage/${id}`}>
          <div style={{ paddingTop: '100%', position: 'relative' }}>
            <img
              src={url}
              alt={name}
              className="position-absolute top-0 start-0 w-100 h-100"
              style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        </Link>
        
        {/* Quick Action Buttons */}
       
      </div>

      <Card.Body className="d-flex flex-column p-3">
        {/* Brand/Category Tag (Optional) */}
        <small className="text-uppercase text-muted fw-bold mb-1" style={{ fontSize: '10px', letterSpacing: '1px' }}>
          Ebook/Guides
        </small>
        
        <Link to={`/clickproductpage/${id}`} className="text-decoration-none text-dark">
          <Card.Title className="h6 mb-2 text-truncate-2" style={{ height: '2.5rem', lineHeight: '1.25' }}>
            {name}
          </Card.Title>
        </Link>

        {/* Social Proof */}
        <div className="d-flex align-items-center mb-3">
          <div className="me-2 d-flex gap-1" style={{ fontSize: '0.85rem' }}>
            {renderStars(averageRating)}
          </div>
          <span className="text-muted small">({reviewData?.length || 0})</span>
        </div>

        {/* Pricing & CTA */}
        <div className="mt-auto d-flex flex-column align-items-center justify-content-center">
          <div className="d-flex ">
            {isProductDiscounted && (
              <span className="text-muted text-decoration-line-through small mx-1" style={{ fontSize: '0.9rem' }}>
                ₱{price.toFixed(2)}
              </span>
            )}
            <span className="fw-bold h5 mb-0 text-primary">
              ₱{discountedPrice}
            </span>
          </div>
          
          <Button 
            as={Link} 
            to={`/clickproductpage/${id}`}
            variant={isProductSoldOut ? "secondary" : "outline-primary"} 
            className="btn-sm rounded-pill px-3 fw-bold"
            disabled={isProductSoldOut}
          >
            {isProductSoldOut ? "Sold Out" : "View"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ImageProduct;