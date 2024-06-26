import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FeaturedProducts from '../components/FeaturedProduct';
import BestSelling from '../components/BestSelling';
import RecommendedProd from'../components/RecommendedProduct';
import CircleCard from '../components/CircleProductCard';
import Accordion from '../components/FAQAccordion';
import ImageSlider from '../components/ImageSlider';
import {wellnessProductData} from'../data/wellnessProductData';
import {pcproductsData} from '../data/pcproductsData';
import {beautyProductsData} from '../data/BeautyProductsData';

const Home = ({ addToCart, product}) => {
let countWellness = wellnessProductData.length;
let countPc = pcproductsData.length;
let countBeauty = beautyProductsData.length;

  return ( 
    <>
        <div style={{marginBottom:"10px"}}>
          <ImageSlider />
        </div>

    <Container>
      <Row className="d-flex justify-content-center align-items-center" >
             <div className="d-flex justify-content-center align-items-center ">  
          <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Categories</h5>
          </div> 
        <Col lg={8} md={8} sm={12} style={{background:'#FFFFFF', padding: '10px 10px 0px 10px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
           
          
             <CircleCard addToCart={addToCart} product={product}/>
          </Col> 
      </Row>

        <Row className="d-flex justify-content-center align-items-center" >
           <div className="d-flex justify-content-lg-between " style={{maxWidth:"950px"}}>  
          <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Featured Products</h5>
             <div className="d-flex mt-3 " >
                <Link to="/products" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>All</Link>
              <p  style={{paddingLeft:'10px'}}>({`${countWellness}`})</p>
            </div>
          </div>
        <Col lg={10} md={10} sm={12} style={{background:'#FFFFFF', padding:'20px 10px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
              <FeaturedProducts addToCart={addToCart} product={product}/>
          </Col> 
      </Row>


      {/* Best Selling Products (You can follow a similar structure for other sections) */}
       <Row className="d-flex justify-content-center align-items-center" >
         <div className="d-flex justify-content-lg-between " style={{maxWidth:"760px"}}>   
          <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Best Selling Products</h5>
           <div className="d-flex mt-3 " >
                <Link to="/beautyproducts" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>All </Link>
              <p  style={{paddingLeft:'10px'}}>({`${countBeauty}`})</p>
           </div>
          </div>
        <Col lg={8} md={8} sm={12} style={{background:'#FFFFFF', padding: '10px 10px 0px 10px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
              
             <BestSelling addToCart={addToCart} product={product}/>
          </Col> 
      </Row>


      <Row className="d-flex justify-content-center align-items-center" >
           <div className="d-flex justify-content-lg-between " style={{maxWidth:"950px"}}>  
             <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Recommended Products</h5>
               <div className="d-flex mt-3 " >
                    <Link to="/pcproducts" style={{paddingLeft:'15px', paddingBottom:'5px', textDecoration:'none'}}>All</Link>
                  <p  style={{paddingLeft:'10px'}}>({`${countPc}`})</p>
               </div>
           </div>
         <Col lg={10} md={10} sm={12} style={{background:'#FFFFFF', padding:'20px 10px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
            <RecommendedProd addToCart={addToCart} product={product}/>    
        </Col> 
      </Row>

    {/* FAQ Section */}
      <Row>  
      <div className="d-flex justify-content-center align-items-center mt-3">
        <h5>FAQ</h5>
        </div>
          <Accordion />     
     </Row>
     
      </Container>
 
     

 </>
  );
};

export default Home;

