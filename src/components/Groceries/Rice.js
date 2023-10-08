import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Rice = ({addToCart, cartItems}) => {
  // Sample data for fruits
  const rice = [
    { id: 1, name: 'Basmate', category:'Rice', price: 250, url:`${process.env.PUBLIC_URL}/groceries/rice/rice1.png`},
    { id: 2, name: 'Jasmine', category:'Rice', price:250, url:`${process.env.PUBLIC_URL}/groceries/rice/rice1.png`, },
    // Add more fruits as needed
  ];

  return (
     <Container fluid>
      <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
        
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {rice.map((item) => (
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


export default Rice;
