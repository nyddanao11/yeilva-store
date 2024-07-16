import React, { useState, useEffect } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import VoucherForm from './Voucher';
import FeaturedProduct from'../components/FeaturedProduct';

const CheckoutPage = ({
  cartItems,
  removeFromCart,
  addToCart,
  selectedSize,
  selectedColor,
  fetchUserData,
}) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [shippingRate, setShippingRate] = useState(0);
  const [voucherCode, setVoucherCode] = useState(0);
  const [isFreeShipping, setIsFreeShipping] = useState(false); // New state for free shipping

  const navigate = useNavigate();

  useEffect(() => {
    const itemsPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalItemsPrice(itemsPrice);
  }, [cartItems]);

   useEffect(() => {
    const FREE_SHIPPING_THRESHOLD = 1000; // Set your free shipping threshold here
    if (totalItemsPrice > FREE_SHIPPING_THRESHOLD) {
      setShippingRate(0);
      setIsFreeShipping(true);
    } else {
      const calculatedShippingRate = (
        cartItems.reduce((total, item) => total + item.weight * 0.145, 0) + 30
      ).toFixed(2);
      setShippingRate(Number(calculatedShippingRate));
      setIsFreeShipping(false);
    }
  }, [cartItems, totalItemsPrice]);
   
  const handleVoucherCode = (code) => {
    setVoucherCode(code / 100); // Convert to a decimal for discount calculation
  };

  const discountMultiplier = 1 - voucherCode; // Example calculation
  const Total = (totalItemsPrice * discountMultiplier + shippingRate).toFixed(2);
  const grandTotal = Number(Total);
  const formattedGrandTotal = new Intl.NumberFormat('fil-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(grandTotal);

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/');
      window.alert('Your Cart is Empty');
    }
  }, [cartItems, navigate]);

  return (
    <>
      <Container
        className="mb-4 d-flex justify-content-center aligned-items-center flex-column"
        style={{ maxWidth: '650px' }}
      >
        <div className="d-flex justify-content-center aligned-items-center">
          <h4 className="text-center mb-2" style={{ padding: '10px', marginBottom: '15px' }}>
            Checkout/Shipping Details
          </h4>
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
                  selectedSize={selectedSize}
                  selectedColor={selectedColor}
                />
              ))}
            </div>

            <p>Total Items Price: ₱{totalItemsPrice}</p>
            <p>Shipping Rate: ₱{isFreeShipping ? 'Free' : shippingRate}</p>
            <VoucherForm onVoucherValidate={handleVoucherCode} />
            <h4 style={{ paddingBottom: '10px', marginTop: '15px' }}>Grand Total: {formattedGrandTotal}</h4>
            <Button onClick={handleProceedToCheckout}>Continue to Shipping</Button>
            <Link to="/cart">
              <Button variant="primary" className="ms-2">
                Back to Cart
              </Button>
            </Link>
          </div>
        ) : (
          <CheckoutForm
            cartItems={cartItems}
            formattedGrandTotal={formattedGrandTotal}
            selectedSize={selectedSize}
            selectedColor={selectedColor}
            fetchUserData={fetchUserData}
          />
        )}


       <Row className="d-flex justify-content-center aligned-items-center" style={{marginTop:"40px"}} >

      <div className="line" style={{marginBottom:'30px'}}>
      <h4 className="text">You May also Like</h4>
      </div>
  <Col lg={10} md={10} sm={12} style={{ padding:'5px 0px', marginBottom:'15px'}}>
            <FeaturedProduct  />
          </Col> 
      </Row>
      </Container>
     
    </>
  );
};

export default CheckoutPage;
