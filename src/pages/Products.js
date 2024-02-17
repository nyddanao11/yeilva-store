import React from 'react';
import ImageProduct from '../components/ImageProduct';
import { Container,  Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import { wellnessProductData } from '../data/wellnessProductData';




const Products = ({ addToCart }) => {

  return (
    <Container fluid>
     
      <Row>
       <Col md={2}>
       </Col>
        <Col md={9}>
          <div className="d-flex justify-content-center align-items-center mb-2">
          <h4  className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}>Health & Wellness</h4>
          </div>
          <Row md={2} xs={2} lg={3} className="g-2">
            {wellnessProductData.map((product) => (
              <Col md={4} key={product.id}>
                <div>
               
                  <ImageProduct url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
                 
                </div>
               
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <section className=" mb-4 d-flex flex-column align-items-center justify-content-center">
        <Footer />
      </section>
    </Container>
  );
};

export default Products;
