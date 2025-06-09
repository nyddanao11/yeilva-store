import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import ImageYouMayLikeProduct from './ImageYouMayLikeProduct';
import './FeaturedProductSlides.css';

export default function YouMayLikeProduct ({ addToCart, youMayLikeProducts, mayLikeLoading, mayLikeError }) {
  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  console.log('youMayLikeProducts:', youMayLikeProducts);

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

  if (mayLikeLoading) return <div>Loading...</div>;
  if (mayLikeError) return <div>Error fetching youMayLikeProducts</div>;

  // IMPORTANT: Add this check
  if (!Array.isArray(youMayLikeProducts) || youMayLikeProducts.length === 0) {
    // You can return null, a message, or a skeleton loader for no products
    return <div>No "You May Like" products available.</div>;
  }

  return (
    // You can remove the conditional rendering for `div` with paddingLeft/Right here
    // as the slide's padding will handle it.
    <div className="slider-container"> {/* Add a class for potential custom styling */}
      <Slider {...settings}>
        {youMayLikeProducts.map((product) => (
          // Apply padding to the wrapper div around each product card
          // This creates the space between cards
          <div key={product.id} className="product-slide-wrapper ">
            <ImageYouMayLikeProduct
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