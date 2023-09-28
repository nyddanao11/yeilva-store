import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Vegetables = ({addToCart, cartItems}) => {
  // Sample data for fruits
  const vegetables = [
    { id: 1, name: 'Lettuce', category:'Vegetables'},
    { id: 2, name: 'kalabasa', category:'Vegetables'},
    // Add more fruits as needed
  ];

 return (
    <Container fluid>
      <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {vegetables.map((item) => (
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

export default Vegetables;
