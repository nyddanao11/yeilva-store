import React from 'react';
import { Card } from 'react-bootstrap';
import './ImageCircleCard.css';

const ProductCard = ({ image, name, category, count, onClick }) => {
  return (
    <Card className="product-circlecard border-0 position-relative"> {/* Add the product-card class */}
      <div className="circle-image" onClick={onClick}> {/* Add onClick handler here */}
        <Card.Img src={image} alt={name} className="img-fluid" />
      </div>
      <Card.Body>
        <Card.Title style={{ fontSize: "12px" }}>{category}</Card.Title>
        <p style={{ fontSize: "10px" }}>{count} Products</p>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
