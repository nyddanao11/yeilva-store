import React from 'react';
import { Card} from 'react-bootstrap';
import { FaShareAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useFetchReviews from './useFetchReviews';
import useShare from'./useShare';
import'./userShare.css';
import'./SoldOutLabel.css';

const ImageProduct = ({ url, name, price, id, stock, discount = 0}) => {
  // console.log('Props in ImageProduct:', { url, name, price, id });

const { reviewData, loading, error } = useFetchReviews(name);
const handleShare = useShare(); // Get handleShare function from hook
 const isProductSoldOut = () => {
    // Replace this condition with your own logic for determining if a product is sold out
    return stock <= 0;
  };
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
  if (error) return <div>Error fetching reviews</div>;
  

  return (
  
     // Instead of fixed width, let Bootstrap's grid handle the width
    // Example: For a grid where you want 2 columns on small, 3 on medium, 4 on large
    // This Card would be placed inside a <Col xs={6} md={4} lg={3}> in a Row
    <Card className="product-card mb-4 h-100 d-flex flex-column"> {/* h-100 for consistent height in a grid */}
      {isProductSoldOut(stock) && <div className="sold-out-label">Sold Out</div>}
       {isProductDiscounted() && (
        <div className="discount-label ">
          {discount}% Off! 
        </div>
      )}
      <Link to={`/clickproductpage/${id}`} style={{ textDecoration: 'none' }}>
        {/* Use a responsive aspect ratio for image container */}
        <div className="card-image-container position-relative" style={{ paddingTop: '100%', overflow: 'hidden' }}> {/* 1:1 aspect ratio */}
          <img
            src={url}
            style={{ objectFit: "cover", position: 'absolute', top: 0, left: 0, height: '100%', width: '100%' }}
            alt={name || "Product image"}
          />
          <FaShareAlt className="share-icon position-absolute top-0 end-0 m-2" onClick={(e) => { e.preventDefault(); handleShare(name); }} />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center p-2 flex-grow-1"> {/* flex-grow-1 to push footer down if needed */}
        {/* Remove fixed font size or define it in your CSS with responsive units */}
        <Card.Title className="text-center" style={{ margin: 0, fontWeight:'400', fontSize:'18px'}}>{name}</Card.Title>
           <Card.Text style={{ margin: '4px 0', fontWeight: '650' }}>
          {isProductDiscounted() ? (
            <>
              <span className="original-price" style={{ textDecoration: 'line-through', color: '#888' }}>₱{originalPrice}</span>{' '}
              <span className="discounted-price">₱{discountedPrice}</span>
            </>
          ) : (
            `₱${originalPrice}`
          )}
        </Card.Text>
        <div className="d-flex flex-column align-items-center mb-2">
          <div className="d-flex align-items-center">
            <div className="text-warning me-1" style={{ fontSize: "1.1rem" }}> {/* Use responsive font size */}
              {renderStars(averageRating)}
            </div>
            <span>{averageRating}</span>
          </div>
        </div>
        {/* Add a button for "Add to Cart" or "View Details" */}
        {/* <Button variant="primary" className="mt-auto w-100">Add to Cart</Button> */}
      </Card.Body>
    </Card>
 
  );
};

 export default ImageProduct;
