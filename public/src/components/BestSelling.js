import React from 'react';
import 'swiper/swiper-bundle.css';
import ImageCard from './ImageCard';
import { bestSellingProducts } from '../data/bestSellingProducts';
import { useMediaQuery } from 'react-responsive';

const BestSelling = ({ addToCart, cartCount }) => {
const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
const isMediumScreen = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1199px)' });
const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

  return (
   <>
    <swiper-container
     css-mode="true"
     navigation="true" 
     space-between= {20}
     slides-per-view={isLargeScreen ? 4 : isMediumScreen ? 3 : isSmallScreen ? 2 : 1}
  
    >
      
         {bestSellingProducts.map((product) => (
          <swiper-slide key={product.id} >
          <ImageCard url={product.url}
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

export default  BestSelling;
