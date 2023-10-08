import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import ProductCard from'../ImageCircleCard';

const Womens= ({ addToCart, cartItems}) => {
  
  const womens = [
    { id: 1, name: 'jagwomen01', price: 499, url:`${process.env.PUBLIC_URL}/fashion/women/jagwoman01.jpg`, category: 'Womens' },
    { id: 2, name: 'jagwomen02', price: 499, url:`${process.env.PUBLIC_URL}/fashion/women/jagwoman02.jpg`, category: 'Womens' },
     { id:3, name: 'jagwomen03', price: 499, url:`${process.env.PUBLIC_URL}/fashion/women/jagwoman03.jpg`, category: 'Womens' },
    { id: 4, name: 'jagwomen04', price: 499, url:`${process.env.PUBLIC_URL}/fashion/women/jagwoman04.jpg`, category: 'Womens' },
    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
       <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {womens.map((item) => (
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

export default Womens;
