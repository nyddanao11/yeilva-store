import React from 'react';
import { Card } from 'react-bootstrap';
import {Link} from'react-router-dom';
import './ImageCircleCard.css';



const ProductCard = ({ image, name, category, link }) => {
   
  return (
    <Card  className="product-circlecard border-0 position-relative"> {/* Add the product-card class */}
      <div className="circle-image">
        <Card.Img src={image} alt={name} className="img-fluid"/>
      </div>
      <Card.Body>
        <Card.Title style={{fontSize:"12px"}} >{category}</Card.Title>
       <Link to={link}>
        <button className="position-absolute top-50 start-50 translate-middle text-white"  
         style={{ fontSize: '11px', backgroundColor:"#355AF2 ", border:"none", borderRadius:"2px"}}>Shop Now</button>
        </Link>

      </Card.Body>
    </Card>
  );
};

export default ProductCard;
