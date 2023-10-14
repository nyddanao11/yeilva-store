import React, { useState, useEffect } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cartItems, removeFromCart, addToCart, selectedSize, selectedColor }) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [shippingRate, setShippingRate] = useState(0);
  const discountCoupon = 5;

  const navigate = useNavigate();

  useEffect(() => {
    const itemsPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalItemsPrice(itemsPrice);
  }, [cartItems]);

  useEffect(() => {
    const calculatedShippingRate = totalItemsPrice * 0.05 + 30;
    setShippingRate(calculatedShippingRate);
  }, [totalItemsPrice]);

  const grandTotal = totalItemsPrice + shippingRate - discountCoupon;

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

if (cartItems.length === 0) {
    navigate('/'); 
     window.alert("Your Cart is Empty");  
  return null;
 
}


  return (
    <Container className="mb-4">
      <h2>Checkout</h2>
      {!showCheckoutForm ? (
        <>
          <div className="mb-4">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
                selectedSize={selectedSize} // Pass selectedSize as a prop
               selectedColor={selectedColor} // Pass selectedColor as a prop
              />
            ))}
          </div>
          <p>Total Items Price: ₱{totalItemsPrice}</p>
          <p>Shipping Rate: ₱{shippingRate}</p>
          <p>Discount Coupon: -₱{discountCoupon}</p>
          <p><strong>Grand Total: ₱{grandTotal}</strong></p>
          <Button onClick={handleProceedToCheckout}>Continue to Shipping</Button>
          <Link to="/cart">
            <Button variant="primary" className="ms-2">Back to Cart</Button>
          </Link>
        </>
      ) : (
        <CheckoutForm cartItems={cartItems} grandTotal={grandTotal}  selectedSize={selectedSize}
          selectedColor={selectedColor}  />
      )}
    </Container>
  );
};

export default CheckoutPage;
