import React from 'react';
import 'swiper/swiper-bundle.css';
import ProductCard from './ImageCircleCard'; // Assuming your component file is named 'ImageCircleCard'
import { cans } from '../data/grocery';
import './ImageCircleCard.css';
import { useMediaQuery } from 'react-responsive';

const CircleCard = ({ addToCart }) => {
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
      
         {cans.map((product) => (
          <swiper-slide key={product.id} >
            <ProductCard
              image={product.image}
              name={product.name}
              price={product.price}
              category={product.category}
              link={product.link}
            />

          </swiper-slide>
        ))}
    
    </swiper-container>
    </>
  );
};

export default CircleCard;
