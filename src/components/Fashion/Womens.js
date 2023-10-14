import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const Womens= ({ addToCart, cartItems}) => {
  
  const womens = [
    { id: 1, name: 'jagwomen01', price: 499, url:`${process.env.PUBLIC_URL}/fashion/women/jagwoman01.jpg`, category: 'Womens', description:'' },
    { id: 2, name: 'jagwomen02', price: 499, url:`${process.env.PUBLIC_URL}/fashion/women/jagwoman02.jpg`, category: 'Womens', description:'' },
     { id:3, name: 'jagwomen03', price: 499, url:`${process.env.PUBLIC_URL}/fashion/women/jagwoman03.jpg`, category: 'Womens', description:'' },
    { id: 4, name: 'jagwomen04', price: 499, url:`${process.env.PUBLIC_URL}/fashion/women/jagwoman04.jpg`, category: 'Womens', description:'' },
    
    // Add more canned goods as needed
  ];

  
  return (
   <Container fluid>
       <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {womens.map((item) => (
              <Col sm={3} xs={6} key={item.id}>
                <Card className="mb-4">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                   <img src={item.url} alt={item.name} style={{ maxHeight:"75px", objectFit:"cover"}}/>
                   <Card.Title style={{fontSize:"14px"}}>{item.name}</Card.Title>
                    <Card.Text style={{margin:"0px"}}> ₱{item.price}</Card.Text>
                   
                    <Button variant="primary" style={{fontSize:"12px"}} onClick={() => addToCart(item)}>AddToCart</Button>
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
