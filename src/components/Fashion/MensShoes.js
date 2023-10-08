import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import ProductCard from'../ImageCircleCard';

const MensShoes= ({ addToCart, cartItems}) => {
  
  const mensshoes = [
    { id: 1, name: 'nike01', price: 1500, url:`${process.env.PUBLIC_URL}/fashion/mensshoes/nike01.jpg`, category: 'Mens Shoes' },
    { id: 2, name: 'nike02', price: 1500, url:`${process.env.PUBLIC_URL}/fashion/mensshoes/nike03.png`, category: 'Mens Shoes' },
  
    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
        <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {mensshoes.map((item) => (
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

export default MensShoes;
