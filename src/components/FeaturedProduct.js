import React from 'react';
import {homeProducts} from '../data/homeProducts';
import { Col} from 'react-bootstrap';
import './FeaturedProduct.css';
import ImageCardFeaturedProduct from './ImageCardFeaturedProduct';

const FeaturedProduct = ({addToCart}) => {
 return (

    <div className="row flex-nowrap overflow-auto">
      {homeProducts.map((product) => (
        <Col key={product.id} xs={6} md={4} lg={3}>
          <ImageCardFeaturedProduct url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
        </Col>
      ))}
    </div>

 );
};

export default FeaturedProduct;
