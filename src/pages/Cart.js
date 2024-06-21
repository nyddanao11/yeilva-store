import React, { useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import FeaturedProduct from'../components/FeaturedProduct';

const Cart = ({ removeFromCart, handleIncrement, handleDecrement, addToCart,
 handleSizeChange, handleColorChange ,  setCartItems,  setCartCount, cartCount, cartItems}) => {
  
  const navigate = useNavigate();


  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const total = calculateTotalPrice(cartItems);
  const formattedPrice = new Intl.NumberFormat('fil-PH', {
  style: 'currency',
  currency: 'PHP',  // Currency code for Philippine Pesos
}).format(total);


  // Function to handle the checkout button click
  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      window.alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
    } else {
      navigate('/checkout');
    }
  };

  
  return (
    <>
    <Container className="cart-container">
      <ShoppingCart
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        handleSizeChange={handleSizeChange}
        handleColorChange={handleColorChange}
        cartCount={cartCount}

      />
         <div className="line" style={{marginBottom:'30px', marginTop:"40px"}}>
      <h4 className="text">You May also Like</h4>
      </div>
     <FeaturedProduct addToCart={addToCart}/>
   
      <div className="sticky-footer">
        <h2>Total Price: {formattedPrice}</h2>
    
        <Button className="w-100" variant="primary" onClick={handleCheckoutClick}>
          Proceed to Checkout
        </Button>
      </div>
      
      
    </Container>
  
      </>
  );
};

export default Cart;
