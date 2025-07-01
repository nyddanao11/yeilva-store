import React, { useEffect } from 'react';
import './AddToCartNotification.css';
import { useNavigate } from 'react-router-dom';


const AddToCartNotification = ({ product, onClose }) => {
  
  const navigate = useNavigate();
console.log('AddToCartNotification received product prop:', product);

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Notification disappears after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]); // Dependency on onClose is correct

  const cartNavigate = () => {
    navigate('/cart');
    onClose(); // Optional: Close the notification when navigating to cart
  };

  // const checkoutNavigate = () => {
  //   navigate('/checkout'); // Assuming '/checkout' is your checkout page
  //   onClose(); // Close the notification when navigating to checkout
  // };

  return (
    <div className="add-to-cart-notification">
      <p className='added-successfull'>✓ Successfully Added to Cart</p>
      <div className="notification-content-enhanced">
        {product.url && ( // Now using the prop
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
        
      </div>
    </div>
  );
};

export default AddToCartNotification;