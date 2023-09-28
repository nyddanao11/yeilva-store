import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const InstantNoodles= ({addToCart, cartItems}) => {
  // Sample data for fruits
  const Noodles = [
    { id: 1, name: 'Maggie', category:'Instant Noodles', price: 30, image:`${process.env.PUBLIC_URL}/groceries/cangoods/sardines1.jpg`,},
    { id: 2, name: 'Quick Chow', category:'Instant Noodles', price: 30, image:`${process.env.PUBLIC_URL}/groceries/cangoods/sardines1.jpg`,},
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
              <Col sm={4} key={item.id}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>Category: {item.category}</Card.Text>
                    <Button variant="primary" size="sm" onClick={() => addToCart(item)}>
                      Add to Cart
                    </Button>
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
