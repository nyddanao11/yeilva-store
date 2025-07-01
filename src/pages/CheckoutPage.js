// Inside CheckoutPage.js

import React, { useState, useEffect, useMemo } from 'react';
import CheckoutForm from '../components/CheckoutForm';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CartItem from './CartItem';
import VoucherForm from './Voucher';
import YouMayLike from '../components/YouMayLike';
import './CheckoutPage.css';
import AlertFreeShipping from '../components/AlertFreeShipping';
import AlertEmptyCart from '../components/AlertEmptyCart';
import { FaShippingFast, FaCheckCircle, FaMoneyBillWave } from 'react-icons/fa';
import { useCart } from './CartContext';

export default function CheckoutPage({
  selectedSize,
  selectedColor,
  fetchUserData,
  youMayLikeProducts,
  isLoggedIn
}) {
  const {
    addToCart,
    checkoutItemsForPayment,
    setCheckoutItemsForPayment,
    totalItemsPrice,
    shippingRate,
    isFreeShipping,
    voucherDiscount,
    applyVoucherDiscount,
    formattedGrandTotal,
  } = useCart();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showFreeShippingAlert, setShowFreeShippingAlert] = useState(false);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Effect to handle initialization of checkoutItemsForPayment from location.state
  useEffect(() => {
    if (location.state && location.state.selectedItems) {
      setCheckoutItemsForPayment(location.state.selectedItems);
      navigate(location.pathname, { replace: true, state: {} }); // Clear state
    }
    // Only show empty cart alert and redirect IF checkoutItemsForPayment is empty
    // AND it's not a temporary state after a successful order submission.
    // We assume that after a successful order, checkoutItemsForPayment will be cleared by CheckoutForm/CartContext.
    // The modal/success page should then handle navigation.
    if (!checkoutItemsForPayment || checkoutItemsForPayment.length === 0) {
      setShowEmptyCartAlert(true);
      // Removed the automatic navigate('/cart') here
      // The navigation after successful checkout will be handled by CheckoutForm/SuccessModal
    } else {
      setShowEmptyCartAlert(false);
    }
  }, [location.state, navigate, setCheckoutItemsForPayment, checkoutItemsForPayment]);

  // If you still want to redirect *after a delay* for truly empty carts (not just post-checkout)
  // you might need a separate state or clearer logic to differentiate.
  // For now, let's remove the auto-redirect here entirely.
  // The 'return to cart' will only happen if the user manually clicks "Back to Cart" or if
  // no items were *ever* selected for checkout initially.

  // Show free shipping alert based on isFreeShipping from context
  useEffect(() => {
    if (isFreeShipping) {
      setShowFreeShippingAlert(true);
    } else {
      setShowFreeShippingAlert(false);
    }
  }, [isFreeShipping]);

  const handleVoucherCode = (code) => {
    applyVoucherDiscount(code);
  };

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };

  // Render loading state or redirect if no items (initial load only)
  // This block will now keep the "No items selected..." message without forcing redirect.
  if (!checkoutItemsForPayment || checkoutItemsForPayment.length === 0) {
    return (
      <Container className="text-center my-5">
        <p>No items selected for checkout. Please go back to cart.</p>
        <Link to="/cart">
          <Button variant="primary">Go to Cart</Button>
        </Link>
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

      <Container className="checkout-page-container my-4">
        {/* Progress Indicator */}
        <div className="checkout-progress-bar mb-4">
          <div className={`step ${!showCheckoutForm ? 'active' : 'completed'}`}>
            <FaCheckCircle className="step-icon" /> Order Summary
          </div>
          <div className="separator"></div>
          <div className={`step ${showCheckoutForm ? 'active' : ''}`}>
            <FaMoneyBillWave className="step-icon" /> Payment Details
          </div>
        </div>
        {/* End Progress Indicator */}

        {!showCheckoutForm ? (
          // --- STEP 1: ORDER SUMMARY & SHIPPING DETAILS ---
          <Row>
            <Col lg={7} className="mb-4">
              <Card className="shadow-sm">
                <Card.Header className="bg-primary text-white">
                  <h5 className="mb-0">Your Order Summary</h5>
                </Card.Header>
                <Card.Body>
                  {checkoutItemsForPayment.length > 0 ? (
                    checkoutItemsForPayment.map((item) => (
                      <CartItem
                        key={item.id || item.name}
                        item={item}
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                      />
                    ))
                  ) : (
                    <p className="text-center text-muted">No items selected for checkout. Please go back to cart.</p>
                  )}
                </Card.Body>
              </Card>
            </Col>

            <Col lg={5}>
              <Card className="shadow-sm">
                <Card.Header className="bg-info text-white">
                  <h5 className="mb-0">Order Totals & Voucher</h5>
                </Card.Header>
                <Card.Body>
                  <VoucherForm onVoucherValidate={handleVoucherCode} />
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Items Total:</span>
                    <strong>₱{totalItemsPrice.toFixed(2)}</strong>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="text-muted">Shipping Rate:</span>
                    {isFreeShipping ? (
                      <strong className="text-success">₱Free <FaShippingFast /></strong>
                    ) : (
                      <strong>₱{shippingRate.toFixed(2)}</strong>
                    )}
                  </div>
                  {voucherDiscount > 0 && (
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-muted">Voucher Discount:</span>
                      <strong className="text-danger">-₱{voucherDiscount.toFixed(2)}</strong>
                    </div>
                  )}
                  <hr className="my-3" />
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Grand Total:</h5>
                    <h4 className="grand-total mb-0">{formattedGrandTotal}</h4>
                  </div>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between p-3">
                  <Link to="/cart">
                    <Button variant="outline-secondary" className="me-2">
                      Back to Cart
                    </Button>
                  </Link>
                  <Button
                    onClick={handleProceedToCheckout}
                    style={{ backgroundColor: '#E92409', border: 'none' }}
                    disabled={checkoutItemsForPayment.length === 0}
                  >
                    Continue to Shipping & Payment
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        ) : (
          // --- STEP 2: SHIPPING ADDRESS & PAYMENT METHOD ---
          <Row className="justify-content-center">
            <Col lg={8}>
              <Card className="shadow-sm">
                <Card.Header className="bg-success text-white">
                  <h5 className="mb-0">Shipping & Payment</h5>
                </Card.Header>
                <Card.Body>
                  <CheckoutForm
                    formattedGrandTotal={formattedGrandTotal}
                    fetchUserData={fetchUserData}
                    totalItemsPrice={totalItemsPrice}
                    shippingRate={shippingRate}
                    voucherDiscount={voucherDiscount}
                    checkoutItems={checkoutItemsForPayment} // Pass the items explicitly
                    isLoggedIn={isLoggedIn}
                    // Pass ewalletStatus from location.state if available
                    ewalletStatus={location.state?.ewalletStatus || false}
                  />
                </Card.Body>
                <Card.Footer className="text-end">
                  <Button variant="outline-secondary" onClick={() => setShowCheckoutForm(false)}>
                    Back to Order Summary
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />
    </>
  );
}