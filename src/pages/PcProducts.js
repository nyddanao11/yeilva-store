// ProductPage.js
import React, { useEffect, useState } from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ImageProductPc1 from '../components/ImageProductPc1';


export default function PcProducts ({addToCart}) {
 const [pcproductsData, setPcproductsData] = useState([]);

  useEffect(() => {
    // Dynamically import the data
    import('../data/pcproductsData').then((module) => {
      setPcproductsData(module.pcproductsData);
    });
  }, []);
  
 return (

    <Container>
     
      <Row  className="d-flex justify-content-center align-items-center ">
      
        <div className="d-flex justify-content-center align-items-center mb-2 mt-3">
          <h4  className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}>Personal Collections</h4>
          </div>
          {pcproductsData.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} >
                <div className="d-flex justify-content-center align-items-center g-1" style={{flexWrap:"wrap"}}>
               
                  <ImageProductPc1 url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product}/>
                 
                </div>              
              </Col>
        ))}
      </Row>
    </Container>

  );
};

