import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaShareAlt } from 'react-icons/fa';
import useFetchReviews from '../components/useFetchReviews';
import './LoanForm.css';
import useShare from'../components/useShare';

const DealsPage = ({ product, addToCart }) => {
  const { reviewData, loading, error } = useFetchReviews(product?.name);
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
  if (error) return <div>Error fetching reviews</div>;

  return (
    <Card style={{ width: "164px" }} className="mb-4">
      <Link to={`/clickdeals/${product.id}`}>
        <div className="card-image-container" style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={product.url}
            style={{ objectFit: "cover", height: '100%', width: '100%' }}
            alt={product.name}
          />
           <FaShareAlt className="share-icon fs-3" onClick={() => handleShare(product)} />
        </div>
      </Link>
      <Card.Body>
        <Card.Title style={{ fontSize: "13px", fontWeight: "400" }}>{product.name}</Card.Title>
        <Card.Text style={{ margin: "0px" }}>
          <span className="text-muted ms-1"><strike>₱{product.discountedPrice}</strike></span>
          <span className="ms-2" style={{ paddingLeft: "2px", fontWeight: "650", fontSize: "13px" }}>₱{product.price}</span>
          <span style={{ paddingLeft: "4px", color: "red", fontWeight: "bold", fontSize: "13px" }}>{product.percentage}</span>
        </Card.Text>
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <div className="d-flex">
              <div className="text-warning me-1 mb-1" style={{ fontSize: "18px" }}>
                {renderStars(averageRating)}
              </div>
              <span>{averageRating}</span>
            </div>
          </div>
          <Button variant="primary" size="sm" onClick={() => addToCart(product)} className='w-100'>
            <FaShoppingCart className="me-1" /> Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default DealsPage;
