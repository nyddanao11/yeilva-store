import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import ProductCard from'../ImageCircleCard';

const Snacks = ({ addToCart, cartItems}) => {
  
  const snacks = [
    { id: 1, name: 'chippy', price: 40, url:`${process.env.PUBLIC_URL}/groceries/snacks/chippy1.jpg`, category: 'Snacks' },
    { id: 2, name: 'Piatos', price: 80, url:`${process.env.PUBLIC_URL}/groceries/snacks/piatos.jpg`, category: 'Snacks' },
    { id: 3, name: 'Crackers', price: 40, url:`${process.env.PUBLIC_URL}/groceries/snacks/rebisco1.jpg`, category: 'Snacks' },
    { id: 4, name: 'Choco', price: 80, url:`${process.env.PUBLIC_URL}/groceries/snacks/rebisco2.jpg`, category: 'Snacks' },

    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
      <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {snacks.map((item) => (
              <Col sm={4} xs={6} key={item.id}>
                <Card className="mb-4 " >
                  <Card.Body className=" d-flex flex-column align-items-center justify-content-center">
                   <img src={item.url} alt={item.name} style={{ maxHeight:"75px", objectFit:"cover"}}/>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text> ₱{item.price}</Card.Text>
                   
                    <Button variant="primary" style={{fontSize:"12px"}}
                     onClick={() => addToCart(item)}>Add to Cart</Button>
                    
          
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

export default Snacks;
