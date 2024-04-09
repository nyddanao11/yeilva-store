import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {rice} from'./RiceData';
import {Link} from'react-router-dom';
import'./SoldOutLabel.css';

const Rice = ({addToCart, cartItems, product}) => {

   const isProductSoldOut = (product) => {
    // Replace this condition with your own logic for determining if a product is sold out
    return product.stock <= 0;
  };
 

  return (
     <Container fluid >
      <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4 ">
          div className="d-flex justify-content-center align-items-center mb-2">
           <h6> Rice</h6>
           </div>
            {/* Display Grocery Items */}
            {rice.map((product) => (
              <Col sm={3} xs={6} key={product.id} className="d-flex  align-items-center justify-content-center" >
               <Card className="product-card mb-4 shadow-sm  " >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    {isProductSoldOut(product) && <div className="sold-out-label">Sold Out</div>}

                   <Link to={`/clickrice/${product.id}`}>
                  
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


export default Rice;
