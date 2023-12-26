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


      <Row className=" mb-2 mt-3"  >
        <Col>
          <CircleCard />
        </Col>
      </Row>


      {/* Featured Products */}

      <Row className="featured-products" style={{ background: '#f7f7f7', padding: '20px 0' }}>
         <Col>
         <h2 className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px", marginBottom:'15px'}}><strong >Featured Products</strong></h2>
           <FeaturedProducts addToCart={addToCart} product={product}/>
       </Col>
      </Row>

      {/* Best Selling Products (You can follow a similar structure for other sections) */}
       <Row className="best-selling-products ">
       
        <Col>
         <h2 className="text-center"style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px", marginBottom:'10px'}}><strong >Best Selling Products</strong></h2>
         <BestSelling addToCart={addToCart} product={product}/>
        </Col>

      </Row>

      {/* Recommended Products */}
      <Row className="recommended-products mb-1 mt-1 " style={{ background: '#f7f7f7', padding: '25px 0' }}>
        <Col>
          <h2 className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}><strong >Recommended Products</strong></h2>
          <RecommendedProd addToCart={addToCart} product={product}/>
        </Col>
      </Row>

    {/* FAQ Section */}
      <Row>
        <Col>
        <h2>FAQ</h2>
          <Accordion />
        </Col>
     </Row>
     

      {/* Footer Section */}
      <Row className="mt-4 mb-4  " >
      <Col>
      <Footer />
      </Col>
      </Row>

      </Container>
 
  );
};

export default Home;

