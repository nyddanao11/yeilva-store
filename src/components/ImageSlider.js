import React,{useContext} from 'react';
import { CarouselImage } from '../data/CarouselImage';
import { Carousel } from 'react-bootstrap';
import { ProductContext} from '../pages/ProductContext'; // Import context
import {useMediaQuery} from'react-responsive';
import {Link} from'react-router-dom';

const ImageSlider = () => {
    const { handleItemClickCategory } = useContext(ProductContext); // Use the context

const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });


  return (
    <div>
      <Carousel interval={3000} pause="hover">
        {CarouselImage.map((product) => (
          <Carousel.Item key={product.id} onClick={() => handleItemClickCategory(product.category)}   as={Link} to="/productsdata">
          {isSmallScreen ? (
            <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '75.25%', // 16:9 aspect ratio (9 / 16 * 100)
                marginBottom: '20px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  backgroundImage: `url(${product.url})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              ></div>
              <p style={{ position: "absolute", top: "10px", left: "12px", background: "#457b9d", padding: "8px", color: "white", borderRadius: "0 0 20px 0", opacity: "1" }}>{product.name}</p>
              <p style={{ position: "absolute", bottom: "10px", left: "12px", background: "#e63946", padding: "8px", color: "white", borderRadius: "0 20px 0 0", opacity: "1" }}>{product.caption}</p>
            </div>

            ) : (

              <div
              style={{
                position: 'relative',
                width: '100%',
                paddingTop: '30.25%', // 3/4 of screen height
                marginBottom: '20px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '1320px',
                  height: '350px',
                  backgroundImage: `url(${product.url})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                }}
              ></div>
              <p style={{ position: "absolute", top: "10px", left: "12px", background: "#457b9d", padding: "8px", color: "white", borderRadius: "0 0 20px 0", opacity: "1" }}>{product.name}</p>
              <p style={{ position: "absolute", bottom: "10px", left: "12px", background: "#e63946", padding: "8px", color: "white", borderRadius: "0 20px 0 0", opacity: "1" }}>{product.caption}</p>
            </div>
            )}
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ImageSlider;
