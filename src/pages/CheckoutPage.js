import React, { useState, useEffect } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import ShoppingCart from '../components/ShoppingCart';

const CartItem = ({ item, removeFromCart, cartItems, grandTotal}) => {
  console.log("removeFromCart prop:", removeFromCart);
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <img src={item.url} alt={item.name} style={{ maxWidth: '100%', height: 'auto' }} />
          </Col>
          <Col md={6}>
            <h6>{item.name}</h6>
            <p>Price: ₱{item.price}</p>
            <p>Quantity: {item.quantity}</p> 
           
           
          </Col>
          <Col md={3}>
            <p>Total: ₱{item.price * item.quantity}</p>
             <button
              className="btn btn-danger"
              onClick={() => removeFromCart(item)}
            >
              <FaTrash className="me-1" /> {/* Trash bin icon */}
             
            </button>
            
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const CheckoutPage = ({ cartItems, removeFromCart }) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [shippingRate, setShippingRate] = useState(0);
  const discountCoupon = 5; // Replace with your actual discount coupon value

  // Calculate the total items price based on cartItems
  useEffect(() => {
    const itemsPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    setTotalItemsPrice(itemsPrice);
  }, [cartItems]);

  // Calculate the shipping rate based on totalItemsPrice
  useEffect(() => {
    const calculatedShippingRate = totalItemsPrice * 0.05 + 30;
    setShippingRate(calculatedShippingRate);
  }, [totalItemsPrice]);

  // Calculate the grand total
  const grandTotal = totalItemsPrice + shippingRate - discountCoupon;

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  return (
    <Container className="mb-4">
      <h2>Checkout</h2>
      {!showCheckoutForm ? (
        <>
          <div className="mb-4">
            {cartItems.map((item) => (
            <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
          ))}

          </div>
          <p>Total Items Price: ₱{totalItemsPrice}</p>
          <p>Shipping Rate: ₱{shippingRate}</p>
          <p>Discount Coupon: -₱{discountCoupon}</p>
          <p>Grand Total: ₱{grandTotal}</p>
          <Button onClick={handleProceedToCheckout}>Continue to Shipping</Button>
        </>
      ) : (
        <CheckoutForm cartItems={cartItems} grandTotal={grandTotal}/>
      )}
      <Link to="/cart">
        <Button variant="primary"  className="ms-2" >Back to Cart</Button>
      </Link>
    </Container>
  );
};

export default CheckoutPage;
