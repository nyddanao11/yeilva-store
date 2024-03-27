import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import {deals} from '../data/DealsData';
import { Link } from 'react-router-dom';
import FeaturedProduct from'../components/FeaturedProduct';
import './LoanForm.css';



const DealsPage = ({url, name, price, discountedPrice, rating, addToCart, cartItems}) => {
 
  return (
    <Container className="mt-4">
       <div className="d-flex justify-content-center aligned-items-center">
       <h4 className="text-center mb-4 " style={{marginBottom:'15px'}}>Deals of the Day</h4>
       </div>
      <Row>
        {deals.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="w-100">
            <Link to={`/clickdeals/${product.id}`}>
              <Card.Img variant="top" src={product.url} alt={product.name} style={{maxHeight: '200px', objectFit:'cover'}} />
              </Link>
              <Card.Body>
                <Card.Title ><h6>{product.name}</h6></Card.Title>
                <Card.Text style={{margin:"0px"}}>
                  <span className="text-muted" ><strike>₱{product.price}</strike></span>
                  <span className="ms-2 text-danger" >₱{product.discountedPrice}</span>
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

        

       <Row style={{marginTop:"25px"}}>

      <div className="line" style={{marginBottom:'30px'}}>
      <h4 className="text">You May also Like</h4>
      </div>
     <FeaturedProduct addToCart={addToCart}/>
      </Row>
    </Container>
  );
};

export default DealsPage;
