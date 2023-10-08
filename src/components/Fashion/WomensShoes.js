import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import ProductCard from'../ImageCircleCard';

const WomensShoes= ({ addToCart, cartItems}) => {
  
  const womensshoes = [
    { id: 1, name: 'nike01', price: 499, url:`${process.env.PUBLIC_URL}/fashion/womenshoes/nike01.jpg`, category: 'Womens Shoes' },
    { id: 2, name: 'nike02', price: 499, url:`${process.env.PUBLIC_URL}/fashion/womenshoes/nike03.png`, category: 'Womens Shoes' },
     
    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
        <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {womensshoes.map((item) => (
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

export default WomensShoes;
