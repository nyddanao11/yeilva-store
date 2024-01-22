// ProductPage.js
import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import Footer from '../components/Footer';
import {pcproductsData} from '../data/pcproductsData';
import ImageProductPc1 from '../components/ImageProductPc1';


const PcProducts= ({addToCart}) => {

  
  return (
     <Container fluid>
         
      <Row className='mb-3'>
       <Col md={2}>
       </Col>
        <Col md={9}>
          <h2 className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}>Personal Collections</h2>
          <Row md={2} xs={2} lg={3} className="g-2">
            {pcproductsData.map((product) => (
              <Col md={4} key={product.id}>
                <div>
                  <ImageProductPc1 url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
                   
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
