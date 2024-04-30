import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import DealsPage from'./Deals';
import DealsPageFashion from'./DealsPageFashion';
import Footer from '../components/Footer';
import FeaturedProduct from'../components/FeaturedProduct';

const DealsOfDay = ({url, name, price, discountedPrice, rating, addToCart, cartItems}) => {
 
  return (
    <>
      <div className="d-flex flex-column justify-content-center aligned-items-center bg-primary" >
       <h4 className="text-center mt-4" style={{ color:"white"}}>Deals</h4>
       <h6 className="text-center  mb-4" style={{ color:"white"}}>Browse our Deals of the day and save big</h6>
       </div>

    <Container className="mt-4"> 
       <DealsPage />
        <DealsPageFashion />

     
       <Row style={{marginTop:"25px"}}>

      <div className="line" style={{marginBottom:'30px'}}>
      <h4 className="text">You May also Like</h4>
      </div>
     <FeaturedProduct addToCart={addToCart}/>
      </Row>

    </Container>
       {/* Footer Section */}
      <div className="mt-4 " >    
      <Footer /> 
      </div>
   </>
  );
};

export default DealsOfDay;
