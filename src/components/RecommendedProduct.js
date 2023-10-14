import React from 'react';

import { recommendedProducts } from '../data/recommendedProducts';
import {Col} from 'react-bootstrap';
import ImageCardRecommended from'../components/ImageCardRecommended';

const RecommendedProd = ({ addToCart }) => {
  return (
   
      <div className="row flex-nowrap overflow-auto">
      {recommendedProducts.map((product) => (
        <Col key={product.id} xs={6} md={4} lg={3}>
          <ImageCardRecommended url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
        </Col>
      ))}
    </div>
  
  );
};

export default RecommendedProd;
