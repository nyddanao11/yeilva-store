import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import ProductCard from'../ImageCircleCard';

const Mens= ({ addToCart, cartItems}) => {
  
  const mens = [
    { id: 1, name: 'jag01', price: 499, url:`${process.env.PUBLIC_URL}/fashion/mens/jagmen01.jpg`, category: 'Mens' },
    { id: 2, name: 'jag02', price: 499, url:`${process.env.PUBLIC_URL}/fashion/mens/jagmen02.jpg`, category: 'Mens' },
     { id:3, name: 'jag03', price: 499, url:`${process.env.PUBLIC_URL}/fashion/mens/jagmen03.jpg`, category: 'Mens' },
    { id: 4, name: 'jag04', price: 499, url:`${process.env.PUBLIC_URL}/fashion/mens/jagmen04.jpg`, category: 'Mens' },
    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
       <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {mens.map((item) => (
              <Col sm={4} xs={6} key={item.id}>
                <Card className="mb-4">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                   <img src={item.url} alt={item.name} style={{ maxHeight:"75px", objectFit:"cover"}}/>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text> ₱{item.price}</Card.Text>
                   
                    <Button variant="primary" style={{fontSize:"12px"}} onClick={() => addToCart(item)}>Add to Cart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
       
    </Container>
  );
};

export default Mens;
