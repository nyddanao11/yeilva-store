import React from 'react';
import ProductCard from './SoldOutLabel';

function SoldOutApp() {
  return (
    <div>
      <ProductCard
        name="Product Name"
        price="19.99"
        image="product-image.jpg"
        isSoldOut={true} // Set this to true if the product is sold out
      />
    </div>
  );
}

export default SoldOutApp;
