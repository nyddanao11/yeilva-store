import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {bondpaper} from './BondPaperData';

const BreadCrumbBallpen = ({ productId}) => {
  const [clickedItems, setClickedItems] = useState([]);

  const selectedProduct = bondpaper.find((item) => item.id === productId);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    // Adding the clicked item to the state
    setClickedItems([...clickedItems, item]);
  };

  return (
   
       <div className="d-flex" style={{textDecoration:"none", fontSize:"12px", marginBottom:"5px"}}>
        <Link to="/schoolsupplies" style={{textDecoration:"none"}}>Bondpaper > </Link>
       
        {clickedItems.map((item, index) => (
          <span key={index} onClick={() => handleItemClick(item)}>
            {item.name}
          </span>
        ))}
        {selectedProduct && (
          <span onClick={() => handleItemClick(selectedProduct)}>
            {selectedProduct.name}
          </span>
        )}
      </div>
      
  );
};

export default BreadCrumbBallpen;
