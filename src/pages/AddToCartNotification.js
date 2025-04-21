import React, { useState, useEffect } from 'react';
import './AddToCartNotification.css';
import { useNavigate } from 'react-router-dom';

const AddToCartNotification = ({ product, onClose }) => {
  const navigate = useNavigate(); // Correct placement of the hook

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!product) {
    return null;
  }

  const cartNavigate = () => {
    navigate('/cart');
  };

  return (
    <div className="add-to-cart-notification">
      <div className="notification-content-enhanced">
        {product.url && (
          <img
            src={product.url}
            alt={product.name}
            className="product-thumbnail"
          />
        )}
        <div className="product-details">
          <h3 className="product-name-enhanced">{product.name}</h3>
          <p className="product-price-enhanced">₱{product.price}</p>
        </div>
        <button onClick={onClose} className="close-button-enhanced">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="notification-actions">
        <button className="view-cart-button" onClick={cartNavigate}>
          View Cart
        </button>
        {/* You could add a "Proceed to Checkout" button here */}
      </div>
    </div>
  );
};

export default AddToCartNotification;