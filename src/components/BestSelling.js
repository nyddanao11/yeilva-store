import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ImageCard from './ImageCard';
import { bestSellingProducts } from '../data/bestSellingProducts';
import { useMediaQuery } from 'react-responsive';

const BestSelling = ({ addToCart, cartCount }) => {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  // Custom arrow components
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick}>
        Previous
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick}>
        Next
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLargeScreen ? 4 : isMediumScreen ? 3 : isSmallScreen ? 2 : 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
  };

  

  return (
    <Slider {...settings}>
      {bestSellingProducts.map((product) => (
        <div key={product.id}>
          <ImageCard
            url={product.url}
            name={product.name}
            price={product.price}
            addToCart={addToCart}
            product={product}
          />
        </div>
      ))}
    </Slider>
  );
};

export default BestSelling;
