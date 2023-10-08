import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const InstantNoodles= ({addToCart, cartItems}) => {
  // Sample data for fruits
  const Noodles = [
    { id: 1, name: 'Megoring', category:'Instant Noodles', price: 10, url:`${process.env.PUBLIC_URL}/groceries/noodles/noodle4.png`,},
    { id: 2, name: 'Lucky me', category:'Instant Noodles', price: 10, url:`${process.env.PUBLIC_URL}/groceries/noodles/noodle5.jpg`,},
    { id: 3, name: 'cantoon 01', category:'Instant Noodles', price: 10, url:`${process.env.PUBLIC_URL}/groceries/noodles/noodle3.jpg`,},
    { id: 4, name: 'cantoon 02', category:'Instant Noodles', price: 10, url:`${process.env.PUBLIC_URL}/groceries/noodles/noodle1.jpg`,},
    // Add more fruits as needed
  ];

  return (

      <Container fluid>
        <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {Noodles.map((item) => (
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


export default InstantNoodles;
