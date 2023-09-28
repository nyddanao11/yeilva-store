// ProductPage.js
import React from 'react';
import ImageProduct from '../components/ImageProduct'; // Import your ImageCard component
import { Button, Container, Card, Row, Col} from 'react-bootstrap';
import Footer from '../components/Footer';
import Products from './Products';
import Search from './Search';
import {pcproductsData} from '../data/pcproductsData';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';


const PcProducts= ({addToCart}) => {
  // Your product data (example)
  
  return (
     <Container fluid>
         
      <Row className='mb-3'>
       <Col md={2}>
       </Col>
        <Col md={9}>
          <h2>Featured Products</h2>
          <Row md={2} xs={1} lg={3} className="g-2">
            {pcproductsData.map((product) => (
              <Col md={4} key={product.id}>
                <div>
                  <ImageProduct url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row >

           <section className=" mb-4 d-flex flex-column align-items-center justify-content-center">
      <Footer />
      </section>
      
        </Container>
        
  );
};

export default PcProducts;
