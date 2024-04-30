import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import {deals} from '../data/DealsData';
import { Link } from 'react-router-dom';
import './LoanForm.css';

const DealsPage = ({url, name, price, discountedPrice, rating, addToCart, cartItems}) => {
 
  return (
    <>
<Container>
      <Row>
      <div className="d-flex mt-2">
           <h5>Health and Wellness </h5>
          <Link to="/products" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>Show more </Link>
          <p  style={{paddingLeft:'15px'}}>{'(0)'}</p>
      </div>
        {deals.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="w-100">
            <Link to={`/clickdeals/${product.id}`}>
              <Card.Img variant="top" src={product.url} alt={product.name} style={{maxHeight: '200px', objectFit:'cover'}} />
              </Link>
              <Card.Body>
                <Card.Title ><h6>{product.name}</h6></Card.Title>
                <Card.Text style={{margin:"0px"}}>
                  <span className="text-muted ms-1" ><strike>₱{product.discountedPrice}</strike></span>
                  <span className="ms-2 "  style={{paddingLeft:"2px", color:"black", fontWeight:"bold", fontSize:"16px"}}>₱{product.price}</span>
                  <span style={{paddingLeft:"6px", color:"red", fontWeight:"bold", fontSize:"16px"}}>{product.percentage}</span>
                </Card.Text>
                <div className="d-flex flex-column ">
                  <div className="d-flex ">
                    <span className="text-warning me-1 mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar key={index} />
                      ))}
                    </span>
                    <span className="text-muted">{product.rating}</span>
                  </div>
                  <Button variant="primary" size="sm" onClick={() => addToCart(product)} className='w-100' >
                    <FaShoppingCart className="me-1" /> Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      </Container>

      </>
  );
};

export default DealsPage;
