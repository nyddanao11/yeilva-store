import React, { useState, useEffect } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import VoucherForm from './Voucher';
import YouMayLike from '../components/YouMayLike';
import './CheckoutPage.css';
import AlertFreeShipping from '../components/AlertFreeShipping';
import AlertEmptyCart from '../components/AlertEmptyCart';

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
  const [showFreeShippingAlert, setShowFreeShippingAlert] = useState(false);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const itemsPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalItemsPrice(itemsPrice);
  }, [cartItems]);

  useEffect(() => {
    const FREE_SHIPPING_THRESHOLD = 2500; // Set your free shipping threshold here
    if (totalItemsPrice > FREE_SHIPPING_THRESHOLD) {
      setShippingRate(0);
      setIsFreeShipping(true);
      setShowFreeShippingAlert(true);
    } else {
      const calculatedShippingRate = (
        cartItems.reduce((total, item) => total + item.weight * 0.145, 0) + 30
      ).toFixed(2);
      setShippingRate(Number(calculatedShippingRate));
      setIsFreeShipping(false);
      setShowFreeShippingAlert(false);
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
      setShowEmptyCartAlert(true);
      const timer = setTimeout(() => {
        navigate('/');
      }, 4000); // 4000 milliseconds = 4 seconds

      // Cleanup the timer if the component unmounts before the timer completes
      return () => clearTimeout(timer);
    }
  }, [cartItems, navigate]);


  return (
    <>
      {showFreeShippingAlert && (
        <AlertFreeShipping onClose={() => setShowFreeShippingAlert(false)} />
      )}
      {showEmptyCartAlert && (
        <AlertEmptyCart onClose={() => setShowEmptyCartAlert(false)} />
      )}
      <Container className="mb-4 d-flex justify-content-center aligned-items-center flex-column"
        style={{ maxWidth: "767px" }}
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
            <div className="checkout_section">
              <div className="checkout_details">
                <div className="voucher">
                  <VoucherForm onVoucherValidate={handleVoucherCode} />
                </div>
                <div style={{ paddingLeft: "6px" }}>
                  <p className="items_details">Total Items Price: ₱{totalItemsPrice}</p>
                  <p className="items_details">Shipping Rate: ₱{isFreeShipping ? 'Free' : shippingRate}</p>
                </div>
              </div>
              <h4 className="grandtotal"> Grand Total: {formattedGrandTotal}</h4>
              <div className="d-flex">
                <Button onClick={handleProceedToCheckout}>Continue to Shipping</Button>
                <Link to="/cart">
                  <Button variant="primary" className="ms-2">
                    Back to Cart
                  </Button>
                </Link>
              </div>
            </div>
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
      </Container>
      <YouMayLike />
    </>
  );
};

export default CheckoutPage;
