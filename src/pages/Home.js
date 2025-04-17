import React from'react';
import { Container, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import FeaturedProduct from '../components/FeaturedProduct';
import BestSelling from '../components/BestSelling';
import RecommendedProd from'../components/RecommendedProduct';
import CircleCard from '../components/CircleProductCard';
import Accordion from '../components/FAQAccordion';
import ImageSlider from '../components/ImageSlider';
import {homeProducts} from'../data/homeProducts';
import {recommendedProducts} from'../data/recommendedProducts';
import {beautyProductsData} from '../data/BeautyProductsData';
import Announcement from'../components/Announcement';
import './Home.css';
import PopUpAdds from '../components/PopUpAdds'; // Fix capitalization here

export default function Home ({ product, isLoggedIn, handleItemClickCategory}) {

let countWellness = homeProducts.length;
let countPc = recommendedProducts.length;
let countBeauty = beautyProductsData.length;

  return ( 
    <>
      {/* Popup Component */}
      <PopUpAdds delay={3000} autoCloseAfter={15000} isLoggedIn={isLoggedIn} />

        <div style={{marginBottom:"10px"}}>
          <ImageSlider />
        </div>

    <Container>
      <Row className="d-flex justify-content-center align-items-center" >
             <div className="d-flex justify-content-center align-items-center ">  
          <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Categories</h5>
          </div> 
        <Col lg={10} md={10} sm={12} style={{background:'#FFFFFF', padding: '10px 10px 0px 10px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
       
          <CircleCard product={product} handleItemClickCategory={handleItemClickCategory}/>
          </Col> 
      </Row>

      <Row className="d-flex justify-content-center align-items-center " style={{marginBottom:'20px', marginTop:"13px"}} >
      <Col lg={8} md={8} sm={12}>
        <Announcement />
        </Col>
      </Row>

        <Row className="d-flex justify-content-center align-items-center" >
         <Col lg={10} md={10} sm={12} style={{ padding:'5px 0px', marginBottom:'15px'}}>
             <div className="d-flex  " >  
          <h5 className ="title" style={{marginBottom:'7px', marginTop:"15px"}}>Featured Products</h5>
             <div className="d-flex mt-3 " >
                <Link to="/featuredproduct" style={{paddingLeft:'20px', textDecoration:'none'}}>All </Link>
              <p  style={{paddingLeft:'5px'}}>({`${countWellness}`})</p>
            </div>
          </div>
              <FeaturedProduct  product={product}/>
          </Col> 
      </Row>


      {/* Best Selling Products (You can follow a similar structure for other sections) */}
       <Row className="d-flex justify-content-center align-items-center" >
        <Col lg={10} md={10} sm={12} style={{padding: '5px 0px', marginBottom:'15px'}}>
              <div className="d-flex ">   
          <h5 className ="title" style={{marginBottom:'7px', marginTop:"15px"}}>Best Selling Products</h5>
           <div className="d-flex mt-3 " >
                <Link to="/beautyproducts" style={{paddingLeft:'20px', textDecoration:'none'}}>All </Link>
              <p  style={{paddingLeft:'5px'}}>({`${countBeauty}`})</p>
           </div>
          </div> 
             <BestSelling  product={product}/>
          </Col> 
      </Row>


      <Row className="d-flex justify-content-center align-items-center" >
          <Col lg={10} md={10} sm={12} style={{padding:'5px 0px', marginBottom:'15px'}}>
           <div className="d-flex " >  
             <h5 className ="title" style={{marginBottom:'7px', marginTop:"15px"}}>Recommended Products</h5>
               <div className="d-flex mt-3 " >
                    <Link to="/pcproducts" style={{paddingLeft:'20px', textDecoration:'none'}}> All </Link>
                  <p  style={{paddingLeft:'5px'}}>({`${countPc}`})</p>
               </div>
           </div>
            <RecommendedProd product={product}/>    
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



