import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import ProductCard from'../ImageCircleCard';

const Beverages = ({ addToCart, cartItems}) => {
  
  const beer = [
    { id: 1, name: '500ml', price: 40, url:`${process.env.PUBLIC_URL}/groceries/beverages/coke1.jpg`, category: 'Beverages' },
    { id: 2, name: '250ml', price: 80, url:`${process.env.PUBLIC_URL}/groceries/beverages/coke2.jpg`, category: 'Beverages' },
    { id: 3, name: ' 500ml', price: 40, url:`${process.env.PUBLIC_URL}/groceries/beverages/sprite1.jpg`, category: 'Beverages' },
    { id: 4, name: 'coffee', price: 80, url:`${process.env.PUBLIC_URL}/groceries/beverages/sprite1.jpg`, category: 'Beverages' },
    { id: 5, name: 'tea', price: 40, url:`${process.env.PUBLIC_URL}/groceries/beverages/sprite2.jpeg`, category: 'Beverages' },
    { id: 6, name: 'orange ', price: 80, url:`${process.env.PUBLIC_URL}/groceries/beverages/coke1.jpg`, category: 'Beverages' },
    { id: 7, name: 'chocolait', price: 40, url:`${process.env.PUBLIC_URL}/groceries/beverages/coke2.jpg`, category: 'Beverages' },
    { id: 8, name: 'apple ', price: 80, url:`${process.env.PUBLIC_URL}/groceries/beverages/sprite2.jpeg`, category: 'Beverages' },
    { id: 9, name: '500ml ', price: 80, url:`${process.env.PUBLIC_URL}/groceries/beverages/sprite2.jpeg`, category: 'Beverages' },
    { id: 10, name: '1L', price: 40, url:`${process.env.PUBLIC_URL}/groceries/beverages/coke1.jpg`, category: 'Beverages' },
    { id: 11, name: '250ml ', price: 80, url:`${process.env.PUBLIC_URL}/groceries/beverages/coke2.jpg`, category: 'Beverages' },
    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
      <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {beer.map((item) => (
              <Col sm={4} xs={6} key={item.id}>
                <Card className="mb-4 ">
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

export default Beverages;
