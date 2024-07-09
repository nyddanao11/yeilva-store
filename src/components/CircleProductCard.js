import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import ProductCard from './ImageCircleCard';
import { cans } from '../data/grocery';
import { useMediaQuery } from 'react-responsive';

const CircleCard = ({ addToCart }) => {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

    // Custom arrow components
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display:'block', background:' #D6D6D6', borderRadius: '50%'}} onClick={onClick}>
        Previous
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display:'block', background: '#D6D6D6', borderRadius: '50%'}} onClick={onClick}>
        Next
      </div>
    );
  };


  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1,
    slidesToScroll:  isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1,
     prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    
  };


  return (
    <Slider {...settings}>
      {cans.map((product) => (
        <div key={product.id}>
          <ProductCard
            image={product.image}
            name={product.name}
            price={product.price}
            category={product.category}
            link={product.link}
            count={product.count}
          />
        </div>
      ))}
    </Slider>
  );
};

export default CircleCard;
