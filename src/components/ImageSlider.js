import React from 'react';
import 'swiper/swiper-bundle.css';
import { CarouselImage } from '../data/CarouselImage';
import { useNavigate } from 'react-router-dom';
import { Container, Carousel } from 'react-bootstrap';

const ImageSlider = () => {
  const navigate = useNavigate();

  return (
    <Container fluid>
      <Carousel interval={3000} pause="hover">
        {CarouselImage.map((product) => (
          <Carousel.Item key={product.id} onClick={() => navigate(`${product.link}`)}>
            <div style={{
              backgroundImage: `url(${product.url})`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              objectFit: 'cover',
              minHeight: '300px',
              position: 'relative',
              marginBottom: '20px'
            }}>
              <p style={{ position: "absolute", top: "10px", left: "12px", background: "#457b9d", padding: "8px", color: "white", borderRadius: "0 0 10px 0", opacity: "1" }}>{product.name}</p>
              <p style={{ position: "absolute", bottom: "10px", left: "12px", background: "#e63946", padding: "8px", color: "white", borderRadius: "0 10px 0 0", opacity: "1" }}>{product.caption}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ImageSlider;
