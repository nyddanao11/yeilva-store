import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const MensShoes= ({ addToCart, cartItems}) => {
  
  const mensshoes = [
    { id: 1, name: 'nike01', price: 1500, url:`${process.env.PUBLIC_URL}/fashion/mensshoes/nike01.jpg`, category: 'Mens Shoes', description:'' },
    { id: 2, name: 'nike02', price: 1500, url:`${process.env.PUBLIC_URL}/fashion/mensshoes/nike03.png`, category: 'Mens Shoes', description:'' },
  
    
    // Add more canned goods as needed
  ];

  
  return (
   <Container fluid>
       <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {mensshoes.map((item) => (
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

export default MensShoes;
