import React, { useState, useEffect } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';

const CheckoutPage = ({ cartItems, removeFromCart, addToCart, selectedSize, selectedColor, fetchUserData }) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [shippingRate, setShippingRate] = useState(0);
  const discountCoupon = 0;

  const navigate = useNavigate();

  useEffect(() => {
    const itemsPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalItemsPrice(itemsPrice);
  }, [cartItems]);


useEffect(() => {
  // Calculate shipping rate based on cart items
  const calculatedShippingRate = (cartItems.reduce(
    (total, item) => total + item.weight * 0.145,
    0
  ) + 30).toFixed(2);

  // Set the shipping rate with only two decimal places
  setShippingRate(Number(calculatedShippingRate));

  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [cartItems, totalItemsPrice]); // Add other dependencies if needed




 const Total = (totalItemsPrice + shippingRate - discountCoupon).toFixed(2);
 const grandTotal= Number(Total);


  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  // Call navigate conditionally within a useEffect hook
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
      window.alert("Your Cart is Empty");
    }
  }, [cartItems, navigate]);


   return (
    <Container className="mb-4 d-flex justify-content-center aligned-items-center flex-column" style={{maxWidth:'650px'}}>
   <div className="d-flex justify-content-center aligned-items-center">
       <h4 className="text-center mb-2 " style={{padding:"10px ", marginBottom:'15px'}}>Checkout/Shipping Details</h4>      
       </div>
      {!showCheckoutForm ? (
        <div>
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
          <h4 style={{paddingBottom:'10px'}}>Grand Total: ₱{grandTotal}</h4>
          <Button onClick={handleProceedToCheckout}>Continue to Shipping</Button>
          <Link to="/cart">
            <Button variant="primary" className="ms-2">Back to Cart</Button>
          </Link>
        </div>
      ) : (
        <CheckoutForm cartItems={cartItems}   grandTotal={grandTotal}  selectedSize={selectedSize}
          selectedColor={selectedColor} fetchUserData={fetchUserData}/>
      )}
    </Container>
  );
};

export default CheckoutPage;