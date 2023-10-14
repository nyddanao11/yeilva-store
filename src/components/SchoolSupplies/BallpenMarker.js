import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


const BallpenMarker= ({ addToCart, cartItems}) => {
  
  const ballpen = [
    { id: 1, name: 'Panda', price: 5, url:`${process.env.PUBLIC_URL}/schoolsupplies/ballpen1.png`, category: 'School Supplies', description:'Flavored Barbecue Corn Chips 200g' },
    { id: 2, name: 'flexstick', price: 7, url:`${process.env.PUBLIC_URL}/schoolsupplies/ballpen2.png`, category: 'School Supplies', description:'Flavored Barbecue Corn Chips 200g' },
     { id:3, name: 'pilot', price: 6, url:`${process.env.PUBLIC_URL}/schoolsupplies/ballpen3.png`, category: 'School Supplies', description:'Flavored Barbecue Corn Chips 200g' },
    { id: 4, name: 'marker2', price: 8, url:`${process.env.PUBLIC_URL}/schoolsupplies/rebisco2.jpg`, category: 'School Supplies', description:'Flavored Barbecue Corn Chips 200g' },
    
    // Add more canned goods as needed
  ];

  
  return (
    <Container fluid>
        <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {ballpen.map((item) => (
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

export default BallpenMarker;
