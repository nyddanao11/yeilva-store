import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const Mens= ({ addToCart, cartItems}) => {
  
  const mens = [
    { id: 1, name: 'jag01', price: 499, url:`${process.env.PUBLIC_URL}/fashion/mens/jagmen01.jpg`, category: 'Mens', description:'' },
    { id: 2, name: 'jag02', price: 499, url:`${process.env.PUBLIC_URL}/fashion/mens/jagmen02.jpg`, category: 'Mens', description:''  },
     { id:3, name: 'jag03', price: 499, url:`${process.env.PUBLIC_URL}/fashion/mens/jagmen03.jpg`, category: 'Mens', description:''  },
    { id: 4, name: 'jag04', price: 499, url:`${process.env.PUBLIC_URL}/fashion/mens/jagmen04.jpg`, category: 'Mens', description:''  },
    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
       <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {mens.map((item) => (
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

export default Mens;
