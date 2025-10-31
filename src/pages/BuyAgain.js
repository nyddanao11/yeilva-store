import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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

export default function CheckoutPageBuyAgain({
  selectedSize,
  selectedColor,
  fetchUserData,
  youMayLikeProducts,
  isLoggedIn, // Ensure isLoggedIn is passed as a prop
  showCheckoutModal,
  setShowCheckoutModal
}) {
  const {
    addToCart,
    checkoutItemsForPayment, // Get the items currently set for checkout
    setCheckoutItemsForPayment, // Function to set items for checkout
    totalItemsPrice,          // Calculated in CartContext
    shippingRate,             // Calculated in CartContext
    isFreeShipping,           // Calculated in CartContext
    voucherDiscount,          // Calculated in CartContext
    applyVoucherDiscount,     // Function from CartContext
    formattedGrandTotal,      // Calculated in CartContext
    // No need to destructure cartItems if this page strictly handles "Buy Again"
  } = useCart();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showFreeShippingAlert, setShowFreeShippingAlert] = useState(false);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { itemToReorder } = location.state || {};

  // Use a ref to ensure item is only added to checkoutItemsForPayment once
  const hasSetReorderItemRef = useRef(false);

  // Effect to set checkoutItemsForPayment for "Buy Again" flow
  useEffect(() => {
    // Only set if itemToReorder exists and hasn't been set yet
    if (itemToReorder && !hasSetReorderItemRef.current) {
      // Ensure the item has a quantity, default to 1 if not present
      const itemWithQuantity = { ...itemToReorder, quantity: itemToReorder.quantity || 1 };
      setCheckoutItemsForPayment([itemWithQuantity]); // Set ONLY this item for checkout
      hasSetReorderItemRef.current = true; // Mark as set
      // Optionally clear location state if you want to prevent re-processing on refresh
      // navigate(location.pathname, { replace: true, state: {} });
    }
  }, [itemToReorder, setCheckoutItemsForPayment]); // Depend on itemToReorder and setter

  // Effect to handle empty checkout items for "Buy Again" page
  useEffect(() => {
    // If we are on the buy-again page and there's no itemToReorder
    // AND checkoutItemsForPayment is empty, then it's an invalid state.
    if (!itemToReorder && (!checkoutItemsForPayment || checkoutItemsForPayment.length === 0)) {
      setShowEmptyCartAlert(true);
      const timer = setTimeout(() => {
        navigate('/cart'); // Redirect to cart or a generic product page
      }, 3000);
      return () => clearTimeout(timer);
    } else {
      setShowEmptyCartAlert(false);
    }
  }, [itemToReorder, checkoutItemsForPayment, navigate]);


  // Show free shipping alert based on isFreeShipping from context
  useEffect(() => {
    if (isFreeShipping) {
      setShowFreeShippingAlert(true);
    } else {
      setShowFreeShippingAlert(false);
    }
  }, [isFreeShipping]);

  const handleVoucherCode = (code) => {
    applyVoucherDiscount(code); // Use the context's applyVoucherDiscount
  };

  const handleProceedToCheckout = () => {
    if (!checkoutItemsForPayment || checkoutItemsForPayment.length === 0) {
      setShowEmptyCartAlert(true);
      return;
    }
    setShowCheckoutForm(true);
  };

  // Render loading state or redirect if no items to reorder
  if (!itemToReorder && (!checkoutItemsForPayment || checkoutItemsForPayment.length === 0)) {
    return (
      <Container className="text-center my-5">
        {showEmptyCartAlert ? (
          <p>No item selected for reorder. Redirecting to cart...</p>
        ) : (
          <p>Loading reorder item...</p>
        )}
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
                  {checkoutItemsForPayment.length === 0 ? (
                    <p className="text-center text-muted">No items selected for checkout. Please go back to cart.</p>
                  ) : (
                    checkoutItemsForPayment.map((item) => (
                      <CartItem
                        key={item.id || item.name}
                        item={item}
                        // No need for removeFromCart/addToCart here if it's just a summary
                        selectedSize={selectedSize}
                        selectedColor={selectedColor}
                      />
                    ))
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
                    <h4 className="text-primary mb-0">{formattedGrandTotal}</h4>
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
                    disabled={checkoutItemsForPayment.length === 0} // Disable if no items to checkout
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
                    formattedGrandTotal={formattedGrandTotal} // From context
                    fetchUserData={fetchUserData}
                    totalItemsPrice={totalItemsPrice} // From context
                    shippingRate={shippingRate} // From context
                    voucherDiscount={voucherDiscount} // From context
                    checkoutItems={checkoutItemsForPayment} // From context
                    isLoggedIn={isLoggedIn} // Passed prop
                    ewalletStatus={location.state?.ewalletStatus || false} // Pass ewalletStatus from location.state if available
                    showCheckoutModal={showCheckoutModal}
                    setShowCheckoutModal={setShowCheckoutModal}
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