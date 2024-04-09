import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import { beautyProductsData } from '../data/BeautyProductsData';
import ImageProductBeauty from'../components/ImageProductBeauty';



const BeautyProducts = ({ addToCart }) => {

  return (
    <>
    <Container fluid>
     
      <Row>
       <Col md={2}>
       </Col>
        <Col md={9}>
           <div className="d-flex justify-content-center align-items-center mb-2 mt-3">
          <h4 className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}>Beauty and Hygiene</h4>
          </div>
          <Row md={2} xs={2} lg={3} className="g-2">
            {beautyProductsData.map((product) => (
              <Col md={4} key={product.id}>
                <div>
               
                  <ImageProductBeauty url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
                 
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

    
    </Container>
      <section className=" mt-4 ">
        <Footer />
      </section>
      </>
  );
};

export default BeautyProducts;
