import React from 'react';
import { Card, Image } from 'react-bootstrap';
import './SoldOutLabel.css'; // Create a CSS file for styling

function ProductCard({ name, price, image, isSoldOut }) {
  return (
    <Card className="product-card">
      {isSoldOut && <div className="sold-out-label">Sold Out</div>}
      <Image src={image} alt={name} fluid />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
