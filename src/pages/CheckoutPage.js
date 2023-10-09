import React, { useState, useEffect } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';


const CartItem = ({ item, removeFromCart,
 cartItems, addToCart, grandTotal}) => {
  console.log('Selected Size:', item.selectedSize);
  console.log('Selected Color:', item.selectedColor);
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <img src={item.url} alt={item.name} style={{ maxWidth: '100%', height: 'auto' }} />
          </Col>
         <Col md={5}>
            <h6>{item.name}</h6>
            <p>Price: ₱{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <p className="item-size">Size: {item.selectedSize}</p>
            <p className="item-size">Color: {item.selectedColor}</p>

          </Col>
          <Col md={4}>
            <p>Total: ₱{item.price * item.quantity}</p>
           
            <button
              className="btn btn-danger"
              onClick={() => removeFromCart(item)}
            >
              <FaTrash className="me-1" />
            </button>
          
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};


const CheckoutPage = ({ cartItems, removeFromCart, addToCart 
}) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [shippingRate, setShippingRate] = useState(0);
  const discountCoupon = 5;

  const [selectedSize, setSelectedSize] = useState('none');
  const [selectedColor, setSelectedColor] = useState('none');

   const handleSizeChangeInCart = (event, cartItem) => {
    const newSize = event.target.value;
    setSelectedSize(newSize); // Update the selected size

    const updatedCartItem = {
      ...cartItem,
      size: newSize,
    };
   
    addToCart(updatedCartItem); // Pass the updated cart item to addToCart
  };

  const handleColorChangeInCart = (event, cartItem) => {
    const newColor = event.target.value;
    setSelectedColor(newColor); // Update the selected color

    const updatedCartItem = {
      ...cartItem,
      color: newColor,
    };
   
    addToCart(updatedCartItem); // Pass the updated cart item to addToCart
  };

  
  useEffect(() => {
    const itemsPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
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
                cartItem={item}
                handleSizeChangeInCart={handleSizeChangeInCart}
                handleColorChangeInCart={handleColorChangeInCart}
                selectedSize={selectedSize} 
                selectedColor={selectedColor} // Pass selectedSize and selectedColor here
              />
            ))}
          </div>
          <p>Total Items Price: ₱{totalItemsPrice}</p>
          <p>Shipping Rate: ₱{shippingRate}</p>
          <p>Discount Coupon: -₱{discountCoupon}</p>
          <p><strong>Grand Total: ₱{grandTotal}</strong></p>
          <Button onClick={handleProceedToCheckout}>Continue to Shipping</Button>
          <Link to="/cart">
            <Button variant="primary" className="ms-2" >Back to Cart</Button>
          </Link>
        </>
      ) : (
        <CheckoutForm cartItems={cartItems} grandTotal={grandTotal} addToCart={addToCart} />
      )}
    </Container>
  );
};

export default CheckoutPage;
