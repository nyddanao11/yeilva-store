import React from 'react';
import ImageCard from './ImageCard';
import { recommendedProducts } from '../data/recommendedProducts';

const RecommendedProd = ({ addToCart }) => {
  return (
   
      <div className="row flex-nowrap overflow-auto">
        {recommendedProducts.map((product) => (
          <ImageCard key={product.id} url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
        ))}
      </div>
  
  );
};

export default RecommendedProd;
