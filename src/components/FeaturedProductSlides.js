import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import ImageCardFeaturedProduct from './ImageCardFeaturedProduct';
import './FeaturedProductSlides.css';

export default function FeaturedProductSlides({ addToCart, featuredProducts, loading, error }) {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  // Custom arrow components (no changes needed here)
  const CustomPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: 'block', background: ' #D6D6D6', borderRadius: '50%' }} onClick={onClick}>
        Previous
      </div>
    );
  };

  const CustomNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} style={{ ...style, display: 'block', background: '#D6D6D6', borderRadius: '50%' }} onClick={onClick}>
        Next
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
    variableWidth: false, // Ensure variableWidth is false for consistent sizing
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error fetching featuredProducts</div>;

  return (
    // You can remove the conditional rendering for `div` with paddingLeft/Right here
    // as the slide's padding will handle it.
    <div className="slider-container"> {/* Add a class for potential custom styling */}
      <Slider {...settings}>
        {featuredProducts.map((product) => (
          // Apply padding to the wrapper div around each product card
          // This creates the space between cards
          <div key={product.id} className="product-slide-wrapper">
            <ImageCardFeaturedProduct
              url={product.url}
              name={product.name}
              price={product.price}
              thumbnails={product.thumbnails}
              addToCart={addToCart}
              product={product}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}