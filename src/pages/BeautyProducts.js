import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ImageProductBeauty from'../components/ImageProductBeauty';

export default function BeautyProducts ({ addToCart }) {
   const [beautyProductsData, setBeautyProductsData] = useState([]);

  useEffect(() => {
    // Dynamically import the data
    import('../data/BeautyProductsData').then((module) => {
      setBeautyProductsData(module.beautyProductsData);
    });
  }, []);

 return (
    <>
    <Container>
     
      <Row  className="d-flex justify-content-center align-items-center ">
      
        <div className="d-flex justify-content-center align-items-center mb-2 mt-3">
          <h4  className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}>Beauty and PersonalCare</h4>
          </div>
          {beautyProductsData.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} >
                <div className="d-flex justify-content-center align-items-center g-1" style={{flexWrap:"wrap"}}>
               
                  <ImageProductBeauty url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product}/>
                 
                </div>              
              </Col>
        ))}
      </Row>
    </Container>

      </>
  );
};


