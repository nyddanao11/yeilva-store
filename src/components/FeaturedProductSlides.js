import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'; 
import ImageCardFeaturedProduct from './ImageCardFeaturedProduct';
import './FeaturedProductSlides.css';

export default function FeaturedProductSlides({ addToCart, featuredProducts = [], loading, error }) {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  // Custom arrow components with SVG icons
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div 
        className={`${className} custom-arrow prev-arrow`} 
        style={{ ...style }}
        onClick={onClick}
      >
        <IoIosArrowBack size={24} color="black" />
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`} 
        style={{ ...style }}
        onClick={onClick}
      >
        <IoIosArrowForward size={24} color="black" />
      </div>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching featuredProducts</div>;
  if (!featuredProducts || featuredProducts.length === 0) return null;

  // Determine standard maximum items per view based on viewport size
  const maxSlidesNeeded = isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1;
  
  // Decide whether sliding behavior should actually kick in
  const shouldSlide = featuredProducts.length > maxSlidesNeeded;

  // Dynamically scale down items per view if your inventory is low
  const currentSlidesToShow = Math.min(maxSlidesNeeded, featuredProducts.length);

  const settings = {
    dots: false,
    infinite: shouldSlide, // Turns off item looping if item thresholds aren't met
    arrows: shouldSlide,   // Hides navigational arrow components when screen is static
    speed: 500,
    slidesToShow: currentSlidesToShow,
    slidesToScroll: currentSlidesToShow,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    variableWidth: false,
  };

  return (
    <div className="slider-container">
      {shouldSlide ? (
        /* Render active slider mechanics when items exceed viewport boundaries */
        <Slider {...settings}>
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-slide-wrapper">
              <ImageCardFeaturedProduct
                url={product.url}
                name={product.name}
                price={product.price}
                thumbnails={product.thumbnails}
                stock={product.stock}
                discount={product.discount}
                addToCart={addToCart}
                product={product}
              />
            </div>
          ))}
        </Slider>
      ) : (
        /* Fallback: Standard layout container to cleanly present static items */
        <div 
          className="d-flex justify-content-start align-items-center gap-3 flex-wrap"
          style={{ padding: '0 10px' }}
        >
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="product-slide-wrapper"
              style={{ 
                width: isLargeScreen ? 'calc(20% - 12px)' : isMediumScreen ? 'calc(25% - 12px)' : 'calc(50% - 8px)',
                minWidth: isSmallScreen ? '140px' : '210px'
              }}
            >
              <ImageCardFeaturedProduct
                url={product.url}
                name={product.name}
                price={product.price}
                thumbnails={product.thumbnails}
                stock={product.stock}
                discount={product.discount}
                addToCart={addToCart}
                product={product}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}