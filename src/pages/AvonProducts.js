import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import { avonproductsData } from '../data/AvonProductsData';
import ImageProductAvon from '../components/ImageProductAvon';


const AvonProducts = ({ addToCart }) => {
  return (
    <>
    <Container>
     
      <Row  className="d-flex justify-content-center align-items-center ">
      
        <div className="d-flex justify-content-center align-items-center mb-2 mt-3">
          <h4  className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}>Avon Collections</h4>
          </div>
          {avonproductsData.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} >
                <div className="d-flex justify-content-center align-items-center g-1" style={{flexWrap:"wrap"}}>
               
                  <ImageProductAvon url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product}/>
                 
                </div>              
              </Col>
        ))}
      </Row>
    </Container>

      <section className=" mt-4 ">
        <Footer />
      </section>
      </>
  );
};

export default AvonProducts;
