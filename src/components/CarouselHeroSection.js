import React from'react';
import {CarouselImage} from'../data/CarouselImage';
import {Row, Col, Carousel} from 'react-bootstrap';
import {Link} from'react-router-dom';
import ImageWithOverlayButton from'./ImgButtonOverly';

const CarouselSection=()=>{
return(
<>
   <h1 className="primary text-center" 
   style={{color:"green", border:"1px solid green", borderRadius:"10px", maxWidth:"530px", padding:"10px"}}><strong >Welcome To YeilvaSTORE</strong></h1>
        <p>Discover a wide range of products.</p>
    <Row  className=" mb-3 row flex-nowrap overflow-auto " style={{width:'100%'}}>
      <Col md={8} > 
        <Carousel>
          {CarouselImage.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="d-block w-100"
                src={item.url}
                alt={`Slide ${item.id}`}
                style={{ maxHeight: '270px', objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <Carousel.Caption>
                <h3 >{item.caption}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col md={4} style={{ maxHeight: '250px' }}>
        {/* Add your two images here */}
         <Link to='/brochure'>
         <ImageWithOverlayButton />
         </Link>
        <img
          src={`${process.env.PUBLIC_URL}/groceries/noodles/freedelivery.png`}
          alt="free delivery"
          style={{ objectFit:'cover', maxHeight: '125px', width: '100%', height: '50%'
           }}
        />
       

      </Col>
      
    </Row>
  </>
  );
};

export default CarouselSection;