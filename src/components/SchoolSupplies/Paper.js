import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const Paper= ({ addToCart, cartItems}) => {
  
  const paper = [
    { id: 1, name: 'ballpen1', price: 5, weight:15, url:`${process.env.PUBLIC_URL}/schoolsupplies/chippy1.jpg`, category: 'School Supplies', 
         thumbnails:
      [`${process.env.PUBLIC_URL}/schoolsupplies/ballpen1.png`,
        `${process.env.PUBLIC_URL}/schoolsupplies/ballpen1.png`,
      ],},
    { id: 2, name: 'marker1', price: 7, weight:15, url:`${process.env.PUBLIC_URL}/schoolsupplies/piatos.jpg`, category: 'School Supplies', 
          thumbnails:
      [`${process.env.PUBLIC_URL}/schoolsupplies/ballpen1.png`,
        `${process.env.PUBLIC_URL}/schoolsupplies/ballpen1.png`,
      ],},
     { id:3, name: 'ballpen2', price: 6, weight:15, url:`${process.env.PUBLIC_URL}/schoolsupplies/rebisco1.jpg`, category: 'School Supplies', 
          thumbnails:
      [`${process.env.PUBLIC_URL}/schoolsupplies/ballpen1.png`,
        `${process.env.PUBLIC_URL}/schoolsupplies/ballpen1.png`,
      ],},
    { id: 4, name: 'marker2', price: 8, weight:15, url:`${process.env.PUBLIC_URL}/schoolsupplies/rebisco2.jpg`, category: 'School Supplies', 
         thumbnails:
      [`${process.env.PUBLIC_URL}/schoolsupplies/ballpen1.png`,
        `${process.env.PUBLIC_URL}/schoolsupplies/ballpen1.png`,
      ],},
    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
        <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {paper.map((item) => (
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

export default Paper;
