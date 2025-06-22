import React, { useState, useEffect } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CartItem from './CartItem';
import VoucherForm from './Voucher';
import YouMayLike from '../components/YouMayLike';
import './CheckoutPage.css';
import AlertFreeShipping from '../components/AlertFreeShipping';
import AlertEmptyCart from '../components/AlertEmptyCart';
import { FaShippingFast } from 'react-icons/fa';

export default function CheckoutPage({
  removeFromCart,
  selectedSize,
  selectedColor,
  fetchUserData,
  setFormattedGrandTotal,
  youMayLikeProducts,
  addToCart, // Ensure this is available if YouMayLike needs it
}) {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [totalItemsPrice, setTotalItemsPrice] = useState(0);
  const [shippingRate, setShippingRate] = useState(0);
  const [voucherCode, setVoucherCode] = useState(0);
  const [voucherDiscount, setVoucherDiscount] = useState(0);
  const [isFreeShipping, setIsFreeShipping] = useState(false);
  const [showFreeShippingAlert, setShowFreeShippingAlert] = useState(false);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);
  const [checkoutItems, setCheckoutItems] = useState(null); // Initialize as null or undefined

  const navigate = useNavigate();
  const location = useLocation();

  // ** 1. Effect to extract selected items from location.state **
  useEffect(() => {
    if (location.state && location.state.selectedItems) {
      setCheckoutItems(location.state.selectedItems);
      // If items are passed, ensure the empty cart alert is not shown
      setShowEmptyCartAlert(false);
    } else {
      // This case handles direct navigation to /checkout without state
      console.warn('No selected items passed to checkout page. Redirecting to cart.');
      setCheckoutItems([]); // Set to empty array to correctly trigger the empty cart logic
      // No alert here, the alert will be handled by the next useEffect
    }
  }, [location.state]); // Depend on location.state

  // ** 2. Effect to handle empty checkout items after state has been set **
  useEffect(() => {
    // Only run this if checkoutItems has been explicitly set (not its initial null state)
    // and if it's empty.
    if (checkoutItems !== null && checkoutItems.length === 0) {
      setShowEmptyCartAlert(true);
      const timer = setTimeout(() => {
        navigate('/cart'); // Redirect to cart, not home, if no selected items
      }, 3000); // Give user a moment to see the alert
      return () => clearTimeout(timer);
    } else if (checkoutItems !== null && checkoutItems.length > 0) {
      // If items are present, hide the alert
      setShowEmptyCartAlert(false);
    }
  }, [checkoutItems, navigate]); // Depend on checkoutItems and navigate

  // ** 3. Calculate total price based on checkoutItems **
  useEffect(() => {
    if (checkoutItems === null) return; // Don't calculate until checkoutItems is set

    const itemsPrice = checkoutItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalItemsPrice(itemsPrice);
  }, [checkoutItems]);

  // ** 4. Calculate shipping rate based on checkoutItems **
  useEffect(() => {
    if (checkoutItems === null) return; // Don't calculate until checkoutItems is set

    const FREE_SHIPPING_THRESHOLD = 2500;

    if (totalItemsPrice > FREE_SHIPPING_THRESHOLD) {
      setShippingRate(0);
      setIsFreeShipping(true);
      setShowFreeShippingAlert(true);
    } else {
      const totalWeight = checkoutItems.reduce((total, item) => total + (item.weight || 0), 0);
      const newMultiplier = totalWeight > 0 ? (0.145 + 30 / totalWeight) : 0;
      const calculatedShippingRate = (
        checkoutItems.reduce((total, item) =>
          total + (item.weight || 0) * newMultiplier, 0)
      ).toFixed(2);
      setShippingRate(Number(calculatedShippingRate));
      setIsFreeShipping(false);
      setShowFreeShippingAlert(false);
    }
  }, [checkoutItems, totalItemsPrice]);

  const handleVoucherCode = (code) => {
    setVoucherCode(code / 100);
    setVoucherDiscount(code);
  };

  const discountMultiplier = 1 - voucherCode;
  // Make sure totalItemsPrice and shippingRate are numbers before calculation
  const Total = (totalItemsPrice * discountMultiplier + Number(shippingRate)).toFixed(2);
  const grandTotal = Number(Total);

  const formattedGrandTotal = new Intl.NumberFormat('fil-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(grandTotal); // Pass grandTotal as a number

  useEffect(() => {
    if (setFormattedGrandTotal) {
      setFormattedGrandTotal(formattedGrandTotal);
    }
  }, [formattedGrandTotal, setFormattedGrandTotal]);

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  // Only render content when checkoutItems is not null
  if (checkoutItems === null) {
    return (
      <Container className="text-center my-5">
        <p>Loading checkout items...</p>
      </Container>
    );
  }

  return (
    <>
      {showFreeShippingAlert && (
        <AlertFreeShipping onClose={() => setShowFreeShippingAlert(false)} />
      )}
      {showEmptyCartAlert && (
        <AlertEmptyCart onClose={() => setShowEmptyCartAlert(false)} />
      )}
      <Container
        className="mb-4 d-flex justify-content-center aligned-items-center flex-column"
        style={{ maxWidth: '767px' }}
      >
        {!showCheckoutForm ? (
          <div>
            <div className="d-flex justify-content-center aligned-items-center">
              <h4 className="text-center mb-2" style={{ padding: '10px', marginBottom: '15px' }}>
                Checkout/Shipping Details
              </h4>
            </div>
            <div className="mb-4">
              {checkoutItems.length > 0 ? (
                checkoutItems.map((item) => (
                  <CartItem
                    key={item.id || item.name}
                    item={item}
                    // These props are less common on a checkout summary
                    // removeFromCart={removeFromCart}
                    // addToCart={addToCart}
                    selectedSize={selectedSize}
                    selectedColor={selectedColor}
                  />
                ))
              ) : (
                // This message shows if checkoutItems is empty
                <p className="text-center">No items selected for checkout.</p>
              )}
            </div>
            <div className="checkout_section">
              <div className="checkout_details">
                <div className="voucher">
                  <VoucherForm onVoucherValidate={handleVoucherCode} />
                </div>
                <div style={{ paddingLeft: '6px' }}>
                  <p className="items_details">Total Items Price: ₱{totalItemsPrice}</p>
                  {isFreeShipping ? (
                    <p style={{ color: '#067d62', fontSize: '14px', fontWeight: '500' }}>
                      <FaShippingFast style={{ color: '#0D6EFD' }} />Shipping Rate: ₱Free
                    </p>
                  ) : (
                    <p style={{ color: 'black', fontSize: '14px', fontWeight: '500' }}>
                      Shipping Rate: ₱{shippingRate.toFixed(2)}
                    </p>
                  )}
                  {voucherDiscount > 0 && (
                    <p style={{ color: '#067d62', fontSize: '14px', fontWeight: '500' }}>
                      Voucher Discount: {voucherDiscount}%
                    </p>
                  )}
                </div>
              </div>
              <h4 className="grandtotal"> Grand Total: {formattedGrandTotal}</h4>
              <div className="d-flex">
                <Button onClick={handleProceedToCheckout} style={{ backgroundColor: '#E92409', border: 'none' }}
                 disabled={checkoutItems.length === 0} // Disable if no items
                >
                  Continue to Shipping
                </Button>
                <Link to="/cart">
                  <Button variant="outline-secondary" className="ms-2">
                    Back to Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <CheckoutForm
            cartItems={checkoutItems}
            formattedGrandTotal={formattedGrandTotal}
            fetchUserData={fetchUserData}
            totalItemsPrice={totalItemsPrice}
            shippingRate={shippingRate}
            voucherDiscount={voucherDiscount}
          />
        )}
      </Container>
      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />
    </>
  );
}