import React from 'react';
import { Card } from 'react-bootstrap';
import {Link} from'react-router-dom';
import './ImageCircleCard.css';

const ProductCard = ({ image, name, category, link, count}) => {
  return (
    <Card  className="product-circlecard border-0 position-relative"> {/* Add the product-card class */}
      <Link to={link} className="circle-image">
        <Card.Img src={image} alt={name} className="img-fluid"/>
      </Link>
      <Card.Body>
        <Card.Title style={{fontSize:"12px"}} >{category}</Card.Title>
        <p>{count} Products</p>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
