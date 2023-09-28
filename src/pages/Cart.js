import React from 'react';
import ShoppingCart from '../components/ShoppingCart';
import CheckoutPage from './CheckoutPage';
import { Button, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; // Import your CSS file

const Cart = ({ cartItems, removeFromCart, handleIncrement, handleDecrement,item}) => {
  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const total = calculateTotalPrice(cartItems);

  const navigate = useNavigate(); // Create a history object

  // Function to handle the checkout button click
  const handleCheckoutClick = () => {
    if (cartItems.length === 0) {
      // Display an alert if the cart is empty
      window.alert('Your cart is empty. Please add items to your cart before proceeding to checkout.');
    } else {
      // Redirect to the checkout page using the history object
      navigate('/checkout'); // Replace '/checkout' with your actual checkout route
    }
  };

  return (
    <Container className="cart-container">
      <ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />
      <div className="sticky-footer">
        <h2>Total Price: ₱{total}</h2>
        <Button className="w-100" variant="primary" onClick={handleCheckoutClick}>Proceed to Checkout</Button>
      </div>
    </Container>
  );
};

export default Cart;