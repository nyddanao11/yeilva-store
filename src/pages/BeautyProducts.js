import React from 'react';
import ImageProduct from '../components/ImageProduct';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer';
import PcProducts from './PcProducts';
import Search from './Search';
import { beautyProductsData } from '../data/BeautyProductsData';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import ClickBeautyProducts from'./ClickBeautyProducts';
import ImageProductBeauty from'../components/ImageProductBeauty';



const BeautyProducts = ({ addToCart }) => {

  return (
    <Container fluid>
     
      <Row>
       <Col md={2}>
       </Col>
        <Col md={9}>
          <h3 className="text-center " style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"8px"}}>Beauty and Hygeine</h3>
          <Row md={2} xs={2} lg={3} className="g-2">
            {beautyProductsData.map((product) => (
              <Col md={4} key={product.id}>
                <div>
               
                  <ImageProductBeauty url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
                 
                </div>
              </Col>
            ))};
          </Row>
        </Col>
      </Row>

      <section className=" mb-4 d-flex flex-column align-items-center justify-content-center">
        <Footer />
      </section>
    </Container>
  );
};

export default BeautyProducts;
