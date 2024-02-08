import React from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Footer from '../components/Footer';
import FeaturedProducts from '../components/FeaturedProduct';
import BestSelling from '../components/BestSelling';
import RecommendedProd from'../components/RecommendedProduct';
import CircleCard from '../components/CircleProductCard';
import CarouselSection from '../components/CarouselHeroSection';
import Accordion from '../components/FAQAccordion';

 
const Home = ({ addToCart, product}) => {
 

  return (

    <Container>
      {/* Hero Section */}
     <Row className="hero mb-1" >
     <Col>
      <CarouselSection />
      </Col>
    </Row>


     <Row className=" mb-2 "  style={{ background: '#f7f7f7', padding: '10px 0' }}>
      <div style={{maxWidth:'120px', padding:'10px'}}>
      <h5  style={{color:"green", borderBottom:'1px solid black', marginBottom:'15px'}}>Categories</h5>
      </div>
          <CircleCard />
      
      </Row>


      {/* Featured Products */}

      <Row className="featured-products" style={{ background: '#f7f7f7', padding: '10px 0' }}>
        <div style={{maxWidth:'195px', padding:'10px'}}>
      <h5  style={{color:"green", borderBottom:'1px solid black', marginBottom:'15px'}}>Featured Products</h5>
      </div>
           <FeaturedProducts addToCart={addToCart} product={product}/>
       
      </Row>

      {/* Best Selling Products (You can follow a similar structure for other sections) */}
       <Row className="best-selling-products ">
      
         <div style={{maxWidth:'220px', padding:' 10px'}}>
      <h5  style={{color:"green", borderBottom:'1px solid black', marginBottom:'15px'}}>Best Selling Products</h5>
      </div>
         <BestSelling addToCart={addToCart} product={product}/>
       

      </Row>

      {/* Recommended Products */}
      <Row className="recommended-products " style={{ background: '#f7f7f7', padding: '10px 0' }}>
       
          <div style={{maxWidth:'250px', padding:'10px'}}>
      <h5  style={{color:"green", borderBottom:'1px solid black', marginBottom:'15px'}}>Recommended Products</h5>
      </div>
          <RecommendedProd addToCart={addToCart} product={product}/>
      
      </Row>

    {/* FAQ Section */}
      <Row>
        
        <h5 style={{color:"green"}}>FAQ</h5>
          <Accordion />
       
     </Row>
     

      {/* Footer Section */}
      <Row className="mt-4 mb-4  " >
    
      <Footer />
   
      </Row>

      </Container>
 
  );
};

export default Home;