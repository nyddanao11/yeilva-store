import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DealsPage from'./Deals';
import DealsPageFashion from'./DealsPageFashion';
import FeaturedProduct from'../components/FeaturedProduct';
import {wellnessProductData} from'../data/wellnessProductData';
import {dealsFashion} from '../data/DealsFashion';
import {deals} from '../data/DealsData';
import {mens} from'../components/Fashion/MensData';
import {womens} from'../components/Fashion/womensData';
import {mensshoes} from'../components/Fashion/MensShoesData';
import {womensshoes} from'../components/Fashion/WomensShoesData';


const DealsOfDay = ({url, name, price, discountedPrice, rating, addToCart, cartItems,product}) => {
   let countWellness = wellnessProductData.length;
    let fashionArray = [...mens, ...womens, ...womensshoes, ...mensshoes];
 let countFashion = fashionArray.length;
 
  return (
    <>
      <div className="d-flex flex-column justify-content-center aligned-items-center bg-primary" >
       <h4 className="text-center mt-4" style={{ color:"white"}}>Deals</h4>
       <h6 className="text-center  mb-4" style={{ color:"white"}}>Browse our Deals of the day and save big</h6>
       </div>

    <Container className="mt-4"> 
  
      <Row >
        <div className="d-flex mt-2">
           <h5>Health and Wellness </h5>
          <Link to="/products" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>Show more </Link>
          <p  style={{paddingLeft:'15px'}}>({`${countWellness}`})</p>
         </div>
         { deals.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} >
                <div className="d-flex justify-content-center align-items-center " style={{flexWrap:"wrap"}}>
               
                  <DealsPage  url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
                 
                </div>              
              </Col>
         ))}
        </Row>

      <Row >
        <div className="d-flex mt-2">
          <h5>Fashion & Apparel </h5>
          <Link to="/fashionapparel" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>Show more </Link>
         <p  style={{paddingLeft:'10px'}}>({`${countFashion}`})</p>
         </div>
         {dealsFashion.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} >
                <div className="d-flex justify-content-center align-items-center " style={{flexWrap:"wrap"}}>
               
                  <DealsPageFashion url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product}/>

                 
                </div>              
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
     
   </>
  );
};

export default DealsOfDay;
