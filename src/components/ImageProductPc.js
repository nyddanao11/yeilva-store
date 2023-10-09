import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const ImageProductPc1 = ({ product, addToCart }) => {
  return (
    <Card className="mb-3 w-100">
      <Link to={`/clickproductpagepc/${product.id}`}>
        <Card.Img
          variant="top"
          src={product.url}
          style={{ maxHeight: "150px", objectFit: "cover" }}
          className="products-card"
          alt={product.name}
        />
      </Link>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center">
        <Card.Title style={{ fontSize:"13px" }}>{product.name}</Card.Title>
        <Card.Text style={{ color: "#EE6005", margin:"0px" }}>Price: ₱{product.price}</Card.Text>
        <Button
          variant="primary"
          size="md"
          onClick={() => addToCart(product)}
           style={{ fontSize:"12px"}}
        >
          <FaShoppingCart className="me-1" /> Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ImageProductPc1;
