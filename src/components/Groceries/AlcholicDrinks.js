import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import ProductCard from'../ImageCircleCard';

const AlcholicDrinks = ({ addToCart, cartItems}) => {
  
  const alcholic = [
    { id: 1, name: '500ml', price: 40, url:`${process.env.PUBLIC_URL}/groceries/alcoholic/redhorse500.jpg`, category: 'Alcoholic' },
    { id: 2, name: '1L', price: 80, url:`${process.env.PUBLIC_URL}/groceries/alcoholic/redhorse1000.jpg`, category: 'Alcoholic' },
    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
        <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {alcholic.map((item) => (
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

export default AlcholicDrinks;
