import React from 'react';
import { Card } from 'react-bootstrap';
import { FaShareAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useFetchReviews from '../components/useFetchReviews';
import useShare from'./useShare';
import'./userShare.css';


const ImageCardRecommendedProduct = ({product, url, name, id, price,thumbnails}) => {
   console.log('Props in recommendedProduct:', { url, name, price, id, thumbnails });
   const { reviewData, loading, error } = useFetchReviews(name);
      const handleShare = useShare(); // Use the custom hook

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
  if (error) return <div>Error fetching best Selling Products</div>;

  return (
// Instead of fixed width, let Bootstrap's grid handle the width
    // Example: For a grid where you want 2 columns on small, 3 on medium, 4 on large
    // This Card would be placed inside a <Col xs={6} md={4} lg={3}> in a Row
    <Card className="product-card mb-4 h-100 d-flex flex-column"> {/* h-100 for consistent height in a grid */}
      <Link to={`/clickproductpagerecommended/${product.id}`}>
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
        <Card.Title className="text-center" style={{ margin: 0, fontWeight:'400' }}>{name}</Card.Title>
        <Card.Text style={{ margin: '4px 0', fontWeight:'650' }}> ₱{price}</Card.Text>
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


export default ImageCardRecommendedProduct;
