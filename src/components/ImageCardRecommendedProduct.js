import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaShareAlt, FaStar, FaRegStar, FaDownload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useFetchReviews from '../components/useFetchReviews';
import useShare from'./useShare';
import'./userShare.css';
import'./SoldOutLabel.css';

const ImageCardRecommendedProduct = ({product, url, name, id, price, thumbnails, stock, discount}) => {
   // console.log('Props in ImageProduct:', { url, name, price, id, thumbnails, stock, discount });
   const { reviewData, loading, error } = useFetchReviews(name);
      const handleShare = useShare(); // Use the custom hook

const isProductSoldOut = stock !== undefined && stock <= 0;

  const isProductDiscounted = () => {
    return discount > 0; // Ensure discount is not undefined/null and is greater than 0
  };

  const calculateDiscountedPrice = () => {
    if (isProductDiscounted()) {
      return (price * (1 - discount / 100)).toFixed(2); // Assuming discount is a percentage
    }
    return price.toFixed(2); // If no discount, return original price formatted
  };

  const originalPrice = price.toFixed(2);
  const discountedPrice = calculateDiscountedPrice();

  const averageRating = reviewData.length > 0
    ? Math.round(reviewData.reduce((acc, review) => acc + review.rating, 0) / reviewData.length)
    : 0;

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i}>
          {i < rating ? '★' : '☆'}
        </span>
      );
    }
    return stars;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching Recommended Products</div>;

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
         <Link to={`/clickproductpagerecommended/${product.id}`}>
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
        
         <Link to={`/clickproductpagerecommended/${product.id}`} className="text-decoration-none text-dark">
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
            to={isProductSoldOut ? "#" : `/clickproductpagerecommended/${product.id}`}
             variant={isProductSoldOut ? "secondary" : "outline-primary"} 
            className="btn-sm rounded-pill px-3 fw-bold"
            disabled={isProductSoldOut}
          >
            {isProductSoldOut ? "Sold Out" : "view"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};
export default ImageCardRecommendedProduct;
