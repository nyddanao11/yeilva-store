import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {ballpen} from './BallpenMarkerData';
import { Breadcrumb } from 'react-bootstrap'; // Import Breadcrumb from react-bootstrap

const BreadCrumbBallpen = ({ productId}) => {
  const [clickedItems, setClickedItems] = useState([]);

  const selectedProduct = ballpen.find((item) => item.id === productId);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    // Adding the clicked item to the state
    setClickedItems([...clickedItems, item]);
  };

  return (
    <Breadcrumb style={{fontSize:"12px"}}>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>Home</Breadcrumb.Item>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/schoolsupplies' }}>Ballpen&Marker</Breadcrumb.Item>
      
     {clickedItems.map((item, index) => (
        <Breadcrumb.Item key={index} onClick={() => handleItemClick(item)}>{item.name}</Breadcrumb.Item>
      ))}
      {selectedProduct && (
        <Breadcrumb.Item>{selectedProduct.name}</Breadcrumb.Item>
      )}
    </Breadcrumb>
  
  );
};

export default BreadCrumbBallpen;
