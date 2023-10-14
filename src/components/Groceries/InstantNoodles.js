import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {Noodles} from'./InstantNoodlesData';
import {Link} from'react-router-dom';

const InstantNoodles= ({addToCart, cartItems, product}) => {
  // Sample data for fruits
  

  return (

       <Container fluid>
      <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
            {/* Display Grocery Items */}
            {Noodles.map((product) => (
              <Col sm={3} xs={6} key={product.id}>
                <Card className="mb-4 shadow-sm">
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">

                   <Link to={`/clickinstantnoodles/${product.id}`}>
                    <Card.Img 
                    variant="top" 
                    src={product.url} alt={product.name}
                    className="products-card" 
                    style={{ maxHeight:"75px", objectFit:"cover"}}/>
                   </Link>

                    <Card.Title style={{fontSize:"14px"}}>{product.name}</Card.Title>
                    <Card.Text style={{margin:"0px"}}> ₱{product.price}</Card.Text>
                   
                    <Button variant="primary" style={{fontSize:"12px"}} onClick={() => addToCart(product)}>AddToCart</Button>
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


export default InstantNoodles;
