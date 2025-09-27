import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'; // Import icons
import ImageCardFeaturedProduct from './ImageCardFeaturedProduct';
import './FeaturedProductSlides.css';

export default function FeaturedProductSlides({ addToCart, featuredProducts, loading, error }) {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  // Custom arrow components with SVG icons
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div 
        className={`${className} custom-arrow prev-arrow`} // Add custom classes
        style={{ ...style }}
        onClick={onClick}
      >
        <IoIosArrowBack size={24} color="black" /> {/* Use the imported icon */}
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom-arrow next-arrow`} // Add custom classes
        style={{ ...style }}
        onClick={onClick}
      >
        <IoIosArrowForward size={24} color="black" /> {/* Use the imported icon */}
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1,
    slidesToScroll: isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    variableWidth: false,
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching featuredProducts</div>;

  return (
    <div className="slider-container">
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
    </div>
  );
}