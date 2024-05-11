import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ImageProductAvon = ({ product, addToCart }) => {
  return (
    <Card style={{ width:"165px"}} className="product-card mb-4">
      <Link to={`/clickproductpageavon/${product.id}`}>
          <div  style={{ height: '200px', overflow: 'hidden'}}>
      <img
          src={product.url}
          style={{objectFit: "cover", height: '100%', width: '100%' }}
          alt={product.name}
        />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Card.Title style={{ fontSize:"13px" }}>{product.name}</Card.Title>
        <Card.Text style={{ color: "#EE6005" }}>Price: ₱{product.price}</Card.Text>
        <Button
          variant="primary"
          size="md"
          onClick={() => addToCart(product)}
          style={{ fontSize:"12px", width:"100%"}}
        >
          <FaShoppingCart className="me-1" /> Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ImageProductAvon;
