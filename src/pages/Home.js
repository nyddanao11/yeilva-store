import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';
import Footer from '../components/Footer';
import FeaturedProducts from '../components/FeaturedProduct';
import BestSelling from '../components/BestSelling';
import RecommendedProd from'../components/RecommendedProduct';
import CircleCard from '../components/CircleProductCard';
import CarouselSection from '../components/CarouselHeroSection';

 

const Home = ({ addToCart, product}) => {
 

  return (
    <>
      {/* Hero Section */}
     <section className="hero mb-1" >
     <Container fluid>
      <CarouselSection />
      </Container>
    </section>


      <section className=" mb-3 mt-3" >
        <Container fluid>
          <CircleCard />
        </Container>
      </section>


      {/* Featured Products */}
      <section className="featured-products mb-3" style={{ background: '#f7f7f7', padding: '25px 0' }}>
        <Container fluid>
        <h2 className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}><strong >Featured Products</strong></h2>
          <FeaturedProducts addToCart={addToCart} product={product}/>
        </Container>
      </section>

      {/* Best Selling Products (You can follow a similar structure for other sections) */}
       <section className="best-selling-products mb-3">
       
        <Container fluid>
         <h2 className="text-center"style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}><strong >Best Selling Products</strong></h2>
         <BestSelling addToCart={addToCart} product={product}/>
        </Container>

      </section>

      {/* Recommended Products */}
      <section className="recommended-products mb-3 mt-3 " style={{ background: '#f7f7f7', padding: '25px 0' }}>
        <Container fluid>
          <h2 className="text-center" style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}><strong >Recommended Products</strong></h2>
          <RecommendedProd addToCart={addToCart} product={product}/>
        </Container>
      </section>

      {/* Footer Section */}
      <section className=" mb-4 d-flex flex-column align-items-center justify-content-center " >
      <Footer />
      </section>
    </>
  );
};

export default Home;

