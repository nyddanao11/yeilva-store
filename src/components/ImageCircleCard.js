import React from 'react';
import { Card } from 'react-bootstrap';
import {Link} from'react-router-dom';
import './ImageCircleCard.css';



const ProductCard = ({ image, name, category, link }) => {
   
  return (
    <Card  className="product-circlecard border-0"> {/* Add the product-card class */}
      <div className="circle-image">
        <Card.Img src={image} alt={name} />
      </div>
      <Card.Body>
        <Card.Title style={{fontSize:"12px"}} >{category}</Card.Title>
       <Link to={link}>
        <button className="btn btn-primary" style={{ fontSize: '10px' }}>Shop Now</button>
        </Link>

      </Card.Body>
    </Card>
  );
};

export default ProductCard;
