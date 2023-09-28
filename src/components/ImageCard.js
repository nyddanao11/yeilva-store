import React from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';


const ImageCard = ({ url, name, price, addToCart, product}) => {
  return (
   
    <Card style={{ width: '10rem', maxheight: '200px', margin: '10px' }}  className="product-card">
      <img src={product.url} alt={product.name} style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
      <div className="card-body">
        <h6>{product.name}</h6>
        <p style={{color:"#EE6005"}}>Price: ₱{product.price}</p>
        <Button variant="primary" size="sm"  onClick={() => addToCart(product)} style={{width:'100%', fontSize:'12px'}}>
             <FaShoppingCart className="me-1" />Add to Cart
        </Button>
       
        {/* Add any other content or buttons you need here */}
      </div>
    </Card>
    
   
  );
};
export default ImageCard;

