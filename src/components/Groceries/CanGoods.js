import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';
import ProductCard from'../ImageCircleCard';

const CannedGoods = ({ addToCart, cartItems}) => {
  // Sample data for canned goods
  const canned = [
    { id: 1, name: 'Sardines', price: 30, image:`${process.env.PUBLIC_URL}/groceries/cangoods/sardines1.jpg`, category: 'Canned Goods' },
    { id: 2, name: 'Beef Loaf', price: 60, image:`${process.env.PUBLIC_URL}/groceries/cangoods/cornedbeef1.png`, category: 'Canned Goods' },
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
                <Card className="mb-4">
                  <Card.Body>
                   <img src={item.image} alt={item.name} style={{ maxHeight:"100px", objectFit:"cover"}}/>
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
