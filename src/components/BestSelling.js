import React from 'react';
import ImageCard from './ImageCard';
import {bestSellingProducts} from '../data/bestSellingProducts';
import { FaShoppingCart } from 'react-icons/fa';
import { Card, Col, Row, Button } from 'react-bootstrap';

const BestSelling = ({addToCart}) => {
 return (
 
      <div className="row flex-nowrap overflow-auto">
        {bestSellingProducts.map((product) => (
          <ImageCard key={product.id} url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
        ))}
      </div>
    
 );
};

export default BestSelling;
