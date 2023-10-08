// ClickProductPage.js
import React from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import findProductById from '../data/findProductById';
import findProductByIdPc from '../data/findProductByIdPc';

const ClickProductPage = ({ addToCart }) => {
  const { id } = useParams();
  console.log('ID from URL:', id);

  // Find the product by ID
  const product = findProductById(id);

  if (!product) {
    // Handle the case where the product with the specified ID is not found
    return (
      <Container>
        <Row>
          <Col>
            <div>Product not found</div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        {/* Product Image */}
        <Col xs={12} md={6}>
          <Image src={product.url} alt={product.name} 
          style={{ maxHeight: "350px", objectFit: "cover" }} 
          className="d-flex align-items-center justify-content-center" fluid />
        </Col>

        {/* Product Information */}
        <Col xs={12} md={6}>
          <h2>{product.name}</h2>
          <p>Price: ₱{product.price}</p>
          <p>Description: {product.description}</p>

          {/* Add to Cart Button */}
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ClickProductPage;
