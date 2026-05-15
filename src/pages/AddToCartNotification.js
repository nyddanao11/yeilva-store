import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, CheckCircle2, ShoppingBag } from 'lucide-react'; // Modern UI icons
import './AddToCartNotification.css';

const AddToCartNotification = ({ product, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // If the item is already in the cart, keep it open a bit longer (5s) 
    // so they have time to read and click the checkout CTA.
    const displayTime = product?.alreadyInCart ? 5000 : 3000;

    const timer = setTimeout(() => {
      onClose();
    }, displayTime);

    return () => clearTimeout(timer);
  }, [onClose, product?.alreadyInCart]);

  const handleCartNavigate = () => {
    navigate('/cart');
    onClose();
  };

  const handleCheckoutNavigate = () => {
    navigate('/checkout');
    onClose();
  };

  if (!product) return null;

  // Safely grab the display price prioritizing final_price over basic price
  const displayPrice = Number(product.final_price ?? product.price ?? 0).toFixed(2);

  return (
    <div className={`add-to-cart-notification-modern ${product.alreadyInCart ? 'status-exists' : 'status-added'}`}>
      
      {/* Header Banner - Swaps dynamically based on item presence */}
      <div className="notification-header-banner">
        {product.alreadyInCart ? (
          <p className="status-message text-info-theme">
            <Zap size={16} className="me-1 animate-pulse-slow" fill="currentColor" /> 
            Already in Your Library Tray
          </p>
        ) : (
          <p className="status-message text-success-theme">
            <CheckCircle2 size={16} className="me-1" /> 
            Successfully Added to Cart
          </p>
        )}

        <button onClick={onClose} className="close-x-button" aria-label="Close notification">
          &times;
        </button>
      </div>

      {/* Product Information Body */}
      <div className="notification-body-enhanced">
        {product.url && (
          <img
            src={product.url}
            alt={product.name}
            className="product-thumbnail-modern"
          />
        )}
        <div className="product-details-modern">
          <h4 className="product-name-modern">{product.name}</h4>
          <p className="product-price-modern">₱{displayPrice}</p>
        </div>
      </div>

      {/* Dynamic Actions - High Conversion Focus */}
      <div className="notification-footer-actions">
        {product.alreadyInCart ? (
          <>
            <button className="primary-action-btn checkout-btn" onClick={handleCheckoutNavigate}>
              Proceed to Checkout <Zap size={14} className="ms-1" fill="currentColor" />
            </button>
            <button className="secondary-action-btn" onClick={onClose}>
              Keep Browsing
            </button>
          </>
        ) : (
          <>
            <button className="primary-action-btn view-cart-btn" onClick={handleCartNavigate}>
              <ShoppingBag size={14} className="me-1" /> View Cart
            </button>
            <button className="secondary-action-btn" onClick={onClose}>
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default AddToCartNotification;