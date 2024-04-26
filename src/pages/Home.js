import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Footer from '../components/Footer';
import FeaturedProducts from '../components/FeaturedProduct';
import BestSelling from '../components/BestSelling';
import RecommendedProd from'../components/RecommendedProduct';
import CircleCard from '../components/CircleProductCard';
import CarouselSection from '../components/CarouselHeroSection';
import Accordion from '../components/FAQAccordion';
import ImageSlider from '../components/ImageSlider';

const Home = ({ addToCart, product}) => {

  return (
    <>
     <div  style={{marginBottom:'10px'}}> 
       <ImageSlider/>  
        </div>

    <Container >
      <Row className="d-flex justify-content-center align-items-center" >
           <div className="d-flex justify-content-center align-items-center ">  
          <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Categories</h5>
          </div>
        <Col lg={8} md={8} sm={12} style={{background:'#FFFFFF', padding: '10px 10px 0px 10px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
             <CircleCard addToCart={addToCart} product={product}/>
          </Col> 
      </Row>

        <Row className="d-flex justify-content-center align-items-center" >
           <div className="d-flex justify-content-center align-items-center ">  
          <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Featured Products</h5>
          </div>
        <Col lg={10} md={10} sm={12} style={{background:'#FFFFFF', padding:'20px 10px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
              <FeaturedProducts addToCart={addToCart} product={product}/>
          </Col> 
      </Row>


      {/* Best Selling Products (You can follow a similar structure for other sections) */}
       <Row className="d-flex justify-content-center align-items-center" >
           <div className="d-flex justify-content-center align-items-center ">  
          <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Best Selling Products</h5>
          </div>
        <Col lg={8} md={8} sm={12} style={{background:'#FFFFFF', padding: '10px 10px 0px 10px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
             <BestSelling addToCart={addToCart} product={product}/>
          </Col> 
      </Row>


      <Row className="d-flex justify-content-center align-items-center" >
           <div className="d-flex justify-content-center align-items-center ">  
          <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Recommended Products</h5>
           </div>
         <Col lg={10} md={10} sm={12} style={{background:'#FFFFFF', padding:'20px 10px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
            <RecommendedProd addToCart={addToCart} product={product}/>    
        </Col> 
      </Row>

   <Row>  
      <div className="d-flex justify-content-center align-items-center mt-3">
        <h5>FAQ</h5>
        </div>
          <Accordion />     
     </Row>
     
      </Container>

      {/* Footer Section */}
      <div className="mt-4 " >    
      <Footer /> 
      </div>    
 </>
  );
};

export default Home;

