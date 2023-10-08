import React from 'react';
import { Container, Row, Col, Nav, Card, Button } from 'react-bootstrap';


const PencilEraser= ({ addToCart, cartItems}) => {
  
  const pencileraser = [
    { id: 1, name: 'Pencil1', price: 5, url:`${process.env.PUBLIC_URL}/schoolsupplies/chippy1.jpg`, category: 'School Supplies' },
    { id: 2, name: 'Pencil2', price: 7, url:`${process.env.PUBLIC_URL}/schoolsupplies/piatos.jpg`, category: 'School Supplies' },
     { id:3, name: 'Pencil3', price: 6, url:`${process.env.PUBLIC_URL}/schoolsupplies/rebisco1.jpg`, category: 'School Supplies' },
    { id: 4, name: 'Pencil4', price: 8, url:`${process.env.PUBLIC_URL}/schoolsupplies/rebisco2.jpg`, category: 'School Supplies' },
    
    // Add more canned goods as needed
  ];

  
  return (
     <Container fluid>
        <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={9}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {pencileraser.map((item) => (
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

export default PencilEraser;
