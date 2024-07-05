import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DealsNot from'./DealsNot';
import FeaturedNot from'../components/FeaturedNot';
import {wellnessProductData} from'../data/wellnessProductData';
import {dealsFashion} from '../data/DealsFashion';
import {dealsElectronicData} from'../data/DealsElectronicData';
import {deals} from '../data/DealsData';
import {mens} from'../components/Fashion/MensData';
import {womens} from'../components/Fashion/womensData';
import {mensshoes} from'../components/Fashion/MensShoesData';
import {womensshoes} from'../components/Fashion/WomensShoesData';


const DealsNotLoggin = ({url, name, price, discountedPrice, rating ,product}) => {
   let countWellness = wellnessProductData.length;
    let fashionArray = [...mens, ...womens, ...womensshoes, ...mensshoes];
 let countFashion = fashionArray.length;
   let countElectronic = dealsElectronicData.length;
 
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
          <Link to="/" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>All </Link>
          <p  style={{paddingLeft:'10px'}}>({`${countWellness}`})</p>
         </div>
         { deals.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} className="g-1">
                <div className="d-flex justify-content-center align-items-center " style={{flexWrap:"wrap"}}>
               
                  <DealsNot url={product.url} name={product.name} price={product.price} product={product}  />
                 
                </div>              
              </Col>
         ))}
        </Row>

      <Row >
        <div className="d-flex mt-2">
           <h5>Fashion & Apparel </h5>
          <Link to="/" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>All </Link>
         <p  style={{paddingLeft:'10px'}}>({`${countFashion}`})</p>
         </div>
         {dealsFashion.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} className="g-1">
                <div className="d-flex justify-content-center align-items-center " style={{flexWrap:"wrap"}}>
               
                  <DealsNot url={product.url} name={product.name} price={product.price} product={product}  />
 
                </div>              
              </Col>
         ))}
        </Row>

        
           <Row >
        <div className="d-flex mt-2">
           <h5>Electronics </h5>
          <Link to="/" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>All </Link>
         <p  style={{paddingLeft:'10px'}}>({`${countElectronic}`})</p>
         </div>
         {dealsElectronicData.map((product) => (
              <Col key={product.id} md={3} xs={6} lg={2} className="g-1">
                <div className="d-flex justify-content-center align-items-center " style={{flexWrap:"wrap"}}>
               
                  <DealsNot url={product.url} name={product.name} price={product.price} product={product}  />
 
                </div>              
              </Col>
         ))}
     </Row>

       <Row style={{marginTop:"25px"}}>

      <div className="line" style={{marginBottom:'30px'}}>
      <h4 className="text">You May also Like</h4>
      </div>
     <FeaturedNot />
      </Row>

    </Container>
     
   </>
  );
};

export default DealsNotLoggin;
