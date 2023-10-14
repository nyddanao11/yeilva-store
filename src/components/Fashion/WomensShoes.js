import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const WomensShoes= ({ addToCart, cartItems}) => {
  
  const womensshoes = [
    { id: 1, name: 'nike01', price: 499, url:`${process.env.PUBLIC_URL}/fashion/womenshoes/nike01.jpg`, category: 'Womens Shoes', description:'' },
    { id: 2, name: 'nike02', price: 499, url:`${process.env.PUBLIC_URL}/fashion/womenshoes/nike03.png`, category: 'Womens Shoes', description:'' },
     
    
    // Add more canned goods as needed
  ];

  
  return (
   <Container fluid>
       <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {womensshoes.map((item) => (
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

export default WomensShoes;
