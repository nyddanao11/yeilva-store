import React from 'react';
import ImageCard from './ImageCard';
import { bestSellingProducts } from '../data/bestSellingProducts';
import { FaShoppingCart } from 'react-icons/fa';
import { Col, Button } from 'react-bootstrap';
import ClickBestSelling from '../pages/ClickBestSelling';

const BestSelling = ({ addToCart }) => {
  return (
    <div className="row flex-nowrap overflow-auto">
      {bestSellingProducts.map((product) => (
        <Col key={product.id} xs={6} md={4} lg={3}>
          <ImageCard url={product.url} name={product.name} price={product.price} addToCart={addToCart} product={product} />
        </Col>
      ))}
    </div>
  );
};

export default BestSelling;
