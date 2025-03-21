import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import {newarrivalData} from '../data/NewArrivalData';


export default function NewArrival ({url, name, price, discountedPrice, rating, addToCart, cartItems}) {
 
  return (
    <Container className="mt-4">
      <h1 className="mb-4">New Arrivals</h1>
      <Row>
        {newarrivalData.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="w-100">
              <Card.Img variant="top" src={product.url} alt={product.name} style={{maxHeight: '200px', objectFit:'cover'}} />
              <Card.Body>
                <Card.Title><h6>{product.name}</h6></Card.Title>
                <Card.Text>
                  <span className="text-muted"><strike>₱{product.price}</strike></span>
                  <span className="ms-2 text-danger">₱{product.discountedPrice}</span>
                </Card.Text>
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <div className="d-flex ">
                    <span className="text-warning me-1 mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar key={index} />
                      ))}
                    </span>
                    <span className="text-muted">{product.rating}</span>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => addToCart(product)} >
                    <FaShoppingCart className="me-1" /> Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

