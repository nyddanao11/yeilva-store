import React from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import ImageCardBestSellingProduct from './ImageCardBestSellingProduct';
// import './BestSelling.css'; // Import your custom CSS for the slider

export default function BestSellingProductSlides ({ addToCart, bestSellingProducts, bestLoading, bestError})  {
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
    dots: false, // Remove dots
    infinite: true,
    speed: 500,
      slidesToShow: isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1,
    slidesToScroll:  isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1,
     prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
   
  };
  
  if (bestLoading) return <div>Loading...</div>;
  if (bestError) return <div>Error fetching best selling products</div>;

  return (
    <>
      {isSmallScreen ? (
        <div style={{ paddingLeft: '10px', paddingRight: '10px' }}>
          <Slider {...settings}>
            {bestSellingProducts.map((product) => (
              <div key={product.id}>
                <ImageCardBestSellingProduct
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
      ) : (
        <div>
          <Slider {...settings}>
           {bestSellingProducts.map((product) => (
              <div key={product.id}>
                <ImageCardBestSellingProduct
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
      )}
    </>
  );
}

