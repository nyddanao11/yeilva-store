import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import ProductCard from'../ImageCircleCard';

const CannedGoods = ({ addToCart, cartItems}) => {
  // Sample data for canned goods
  const canned = [
    { id: 1, name: '555', price: 30, url:`${process.env.PUBLIC_URL}/groceries/cangoods/sardines1.jpg`, category: 'Canned Goods' },
    { id: 2, name: 'purefoods', price: 60, url:`${process.env.PUBLIC_URL}/groceries/cangoods/cornedbeef1.png`, category: 'Canned Goods' },
     { id: 3, name: 'Argentina', price: 30, url:`${process.env.PUBLIC_URL}/groceries/cangoods/beefloaf1.jpg`, category: 'Canned Goods' },
    { id: 4, name: 'Fiesta', price: 60, url:`${process.env.PUBLIC_URL}/groceries/cangoods/beefloaf2.jpeg`, category: 'Canned Goods' },
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
      <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {canned.map((item) => (
              <Col sm={4} key={item.id}>
                <Card className="mb-4 d-flex flex-column align-items-center justify-content-center">
                  <Card.Body>
                   <img src={item.url} alt={item.name} style={{ maxHeight:"100px", objectFit:"cover"}}/>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text> ₱{item.price}</Card.Text>
                   
                    <Button variant="primary" size="sm" onClick={() => addToCart(item)}>Add to Cart</Button>
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

export default CannedGoods;
