import React from 'react';
import { Card } from 'react-bootstrap';
import { FaShareAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useFetchReviews from '../components/useFetchReviews';
import useShare from'./useShare';
import'./userShare.css';


const ImageCardFeaturedProduct = ({product, url, name, id, price,thumbnails}) => {
   console.log('Props in ImageProduct:', { url, name, price, id, thumbnails });
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
  if (error) return <div>Error fetching reviews</div>;

  return (
 <>
    <Card style={{ width: '10rem' }} className="product-card"  >
      <Link to={`/clickproductpagefeaturedproduct/${product.id}`}>
        <div className="card-image-container" style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={product.url}
            alt={product.name}
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
            <FaShareAlt className="share-icon " onClick={() => handleShare(product.name)} />
        </div>
      </Link>
       <Card.Body className="d-flex flex-column align-items-center justify-content-center p-2">
        <Card.Title style={{ fontSize: "13px", margin: 0, fontWeight:'400' }}>{product.name}</Card.Title>
        <Card.Text style={{ margin: '4px 0', fontWeight:'650' }}> ₱{product.price}</Card.Text>
        <div className="d-flex flex-column align-items-center mb-2">
          <div className="d-flex align-items-center">
            <div className="text-warning me-1" style={{ fontSize: "18px" }}>
              {renderStars(averageRating)}
            </div>
            <span>{averageRating}</span>
          </div>
        </div>
      
      </Card.Body>
    </Card>
    </>
  );
};

export default ImageCardFeaturedProduct;
