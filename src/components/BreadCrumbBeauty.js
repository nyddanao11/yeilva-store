import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap'; // Import Breadcrumb from react-bootstrap
import { beautyProductsData } from '../data/BeautyProductsData';

const BreadCrumbBeauty = ({ productId }) => {
  const [clickedItems, setClickedItems] = useState([]);

  const selectedProduct = beautyProductsData.find((item) => item.id === productId);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    // Adding the clicked item to the state
    setClickedItems([...clickedItems, item]);
  };

  return (
    <Breadcrumb>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/beautyproducts' }}>Beauty Products</Breadcrumb.Item>
      
      {clickedItems.map((item, index) => (
        <Breadcrumb.Item key={index} onClick={() => handleItemClick(item)}>
          {item.name}
        </Breadcrumb.Item>
      ))}
      {selectedProduct && (
        <Breadcrumb.Item onClick={() => handleItemClick(selectedProduct)}>
          {selectedProduct.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default BreadCrumbBeauty;
