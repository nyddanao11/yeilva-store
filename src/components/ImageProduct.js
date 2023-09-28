import React from 'react';
import { Card, Col, Row, Button} from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';



const ImageProduct=({ url, name, price, addToCart, product})=>{

  return (
   
      <Card className="mb-3 w-100 ">
        <Card.Img variant="top" src={product.url} style={{maxHeight:"150px", objectFit:"cover"}}  className="products-card"/>
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text style={{color:"#EE6005"}}>Price: ₱{product.price}</Card.Text>
           <Button variant="primary" size="md" onClick={() => addToCart(product)} style={{width:"100%"}}>
                    <FaShoppingCart className="me-1" /> Add to Cart
                  </Button>
        </Card.Body>
      </Card>
 
  );
};

export default ImageProduct;