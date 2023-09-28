import React from'react';
import {CarouselImage} from'../data/CarouselImage';
import {Container, Row, Col, Carousel} from 'react-bootstrap';
import {Link} from'react-router-dom';

const CarouselSection=()=>{
return(
<>
   <h1 className="primary"><strong >Welcome To YeilvaSTORE</strong></h1>
        <p>Discover a wide range of products.</p>
    <Row className="mb-3" className="row flex-nowrap overflow-auto " style={{width:'100%'}}>
      <Col md={8} > 
        <Carousel>
          {CarouselImage.map((item) => (
            <Carousel.Item key={item.id}>
              <img
                className="d-block w-100"
                src={item.url}
                alt={`Slide ${item.id}`}
                style={{ maxHeight: '250px', objectFit: 'cover', width: '100%', height: '100%' }}
              />
              <Carousel.Caption>
                <h3 style={{color:"white",background:"#5B5BF8"}}>{item.caption}</h3>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Col>
      <Col md={4} style={{ maxHeight: '250px' }}>
        {/* Add your two images here */}
        <img
          src={`${process.env.PUBLIC_URL}/groceries/noodles/freedelivery.png`}
          alt="Image 1"
          style={{ objectFit:'cover', maxHeight: '125px', width: '100%', height: '50%',
          marginBottom:'5px' }}
        />
        <Link to='/newarrival'>
        <img
          src={`${process.env.PUBLIC_URL}/groceries/noodles/newarrival.png`}
          alt="Image 1"
          style={{ objectFit:'contain', maxHeight: '125px', width: '100%', height: '50%' }}
        />
        </Link>

      </Col>
      
    </Row>
  </>
  );
};

export default CarouselSection;