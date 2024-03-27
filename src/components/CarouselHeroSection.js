import React from'react';
import {CarouselImage} from'../data/CarouselImage';
import {Row, Col, Carousel} from 'react-bootstrap';
import {Link} from'react-router-dom';
import ImageWithOverlayButton from'./ImgButtonOverly';

const CarouselSection=()=>{

return(
<>      
    <Row  className=" mb-3 row flex-nowrap overflow-auto " style={{width:'100%'}}>
      <Col md={8} > 
        <Carousel>
          {CarouselImage.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="d-block w-100"
                src={item.url}
                alt={`Slide ${item.id}`}
                style={{maxHeight: '300px', objectFit: 'fit', width: '100%'
                 }}
              />
              <Carousel.Caption>
                <h3 >{item.caption}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col md={4} style={{ maxHeight: '240px' }}>
        {/* Add your two images here */}
         <Link to='/brochure'>
         <ImageWithOverlayButton />
         </Link>
      
       

      </Col>
      
    </Row>
  </>
  );
};

export default CarouselSection;