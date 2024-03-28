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
    <Container fluid style={{padding:"0", marginBottom:"10px"}}> 
 
    <ImageSlider />
     </Container>

    <Container>
    
      <Row  className="d-flex justify-content-center align-items-center" >
        <div className="d-flex justify-content-center align-items-center ">
        <h5  style={{marginBottom:'15px'}}>Categories</h5>
        </div>
        <Col lg={8} md={8} sm={12} style={{background:'#FFFFFF', padding: '10px 6px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
            <CircleCard />
          </Col>
      </Row>

      {/* Featured Products */}

      <Row  style={{ background: '#FFFFFF', padding: '20px 0px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
         <div className="d-flex justify-content-center align-items-center ">
        <h5  style={{marginBottom:'15px'}}>Featured Products</h5>
        </div>

             <FeaturedProducts addToCart={addToCart} product={product}/>
       
      </Row>

      {/* Best Selling Products (You can follow a similar structure for other sections) */}
       <Row className="d-flex justify-content-center align-items-center" >
       <div className="d-flex justify-content-center align-items-center ">  
      <h5  style={{marginBottom:'7px', marginTop:"15px"}}>Best Selling Products</h5>
      </div>
    <Col lg={8} md={8} sm={12} style={{background:'#FFFFFF', padding: '10px 0px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
         <BestSelling addToCart={addToCart} product={product}/>
      </Col> 
      </Row>

      {/* Recommended Products */}
      <Row className="recommended-products " style={{ background: '#FFFFFF', padding: '10px 0px', marginBottom:'20px', boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
        <div className="d-flex justify-content-center align-items-center ">
           <h5  style={{marginBottom:'6px', marginTop:"7px"}}>Recommended Products</h5>
      </div>
 
          <RecommendedProd addToCart={addToCart} product={product}/>
      
      </Row>

    {/* FAQ Section */}
      <Row>
        
        <h5>FAQ</h5>
          <Accordion />
       
     </Row>
     

      {/* Footer Section */}
      <Row className="mt-4 mb-4  " >    
      <Footer /> 
      </Row>

      </Container>
 </>
  );
};

export default Home;

