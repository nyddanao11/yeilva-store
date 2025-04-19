import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DealsPage from'./Deals';
import DealsPageFashion from'./DealsPageFashion';
import DealsElectronic from './DealsElectronic';
import {dealsFashion} from '../data/DealsFashion';
import {deals} from '../data/DealsData';
import {dealsElectronicData} from'../data/DealsElectronicData';
import YouMayLike from'../components/YouMayLike';

export default function DealsOfDay ({url, name, price, discountedPrice, rating, addToCart, cartItems,product})  {
   let countWellness = deals.length;
  let ElectronicsArray = [...dealsElectronicData];
  let countElectronic = ElectronicsArray.length;
  
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
          <Link to="/products" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>All </Link>
          <p  style={{paddingLeft:'10px'}}>({`${countWellness}`})</p>
         </div>
         { deals.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} className="g-1">
                <div className="d-flex justify-content-center align-items-center " style={{flexWrap:"wrap"}}>
               
                  <DealsPage  url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
                 
                </div>              
              </Col>
         ))}
        </Row>


          <Row >
        <div className="d-flex mt-2">
           <h5>Electronics </h5>
          <Link to="/consumerelectronics" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>All </Link>
         <p  style={{paddingLeft:'10px'}}>({`${countElectronic}`})</p>
         </div>
         {dealsElectronicData.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} className="g-1">
                <div className="d-flex justify-content-center align-items-center " style={{flexWrap:"wrap"}}>
               
                  <DealsElectronic url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product}/>
 
                </div>              
              </Col>
         ))}
     </Row>
   
    </Container>
        <YouMayLike addToCart={addToCart}/>
   </>
  );
};

