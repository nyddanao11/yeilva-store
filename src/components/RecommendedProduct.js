import React from 'react';
import 'swiper/swiper-bundle.css';
import { recommendedProducts } from '../data/recommendedProducts';
import ImageCardRecommended from'../components/ImageCardRecommended';
import { useMediaQuery } from 'react-responsive';

const FeaturedProduct = ({ addToCart }) => {
const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  return (
   <>
    <swiper-container
     css-mode="true"
     navigation="true" 
     space-between= {20}
     slides-per-view={isLargeScreen ? 5 : isMediumScreen ? 4 : isSmallScreen ? 2 : 1}
  
    >
      
       {recommendedProducts.map((product) => (
          <swiper-slide key={product.id} >
            <ImageCardRecommended url={product.url} 
          name={product.name} 
          price={product.price} 
          addToCart={addToCart}
           product={product} />

          </swiper-slide>
        ))}
    
    </swiper-container>
    </>
  );
};

export default FeaturedProduct;
