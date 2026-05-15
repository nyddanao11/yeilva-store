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
import { FaShippingFast, FaCheckCircle, FaMoneyBillWave, FaLock, FaArrowLeft } from 'react-icons/fa';
import { useCart } from './CartContext';
import PayPalSection from '../components/CheckoutFormPaypal';
import SuccessModal from'../components/modalCheckout';


export default function CheckoutPage({
  selectedSize,
  selectedColor,
  fetchUserData,
  youMayLikeProducts,
  isLoggedIn,
  showCheckoutModal,
  setShowCheckoutModal,
}) {
  const {
    cartItems,
    addToCart,
    checkoutItemsForPayment,
    setCheckoutItemsForPayment,
    totalItemsPrice,
    shippingRate,
    isFreeShipping,
    voucherDiscount,
    voucherCode,
    applyVoucherDiscount,
    formattedGrandTotal,
    clearPurchasedItems,
    clearVoucherDiscount,
    grandTotalAmount,
  } = useCart();

  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showFreeShippingAlert, setShowFreeShippingAlert] = useState(false);
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);
  const [modalType, setModalType] = useState(false);
const [downloadUrl, setDownloadUrl] = useState(null);


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

 const handleVoucherCode = (percentage, code) => { 
    applyVoucherDiscount(percentage, code);
};

  const handleProceedToCheckout = () => {
    setShowCheckoutForm(true);
  };


  // This block will now keep the "No items selected..." message without forcing redirect.
 if ((!checkoutItemsForPayment || checkoutItemsForPayment.length === 0) &&
    !showCheckoutModal ){// <-- This prevents the page from exiting when the cart is empty due to a successful purchase
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
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            {/* Clean, Non-intrusive Modern Header */}
            <Card.Header className="bg-white border-bottom border-light py-3 px-4">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0 fw-bold text-dark d-flex align-items-center">
                  <span className="bg-primary text-white rounded-circle p-2 me-2 d-inline-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px', fontSize: '14px' }}>
                    ✓
                  </span>
                  Review Your Order
                </h5>
                <span className="badge bg-soft-primary text-primary rounded-pill px-3 py-2 fw-bold" style={{ backgroundColor: '#e0f2fe' }}>
                  {checkoutItemsForPayment.length} {checkoutItemsForPayment.length === 1 ? 'Digital Item' : 'Digital Items'}
                </span>
              </div>
            </Card.Header>

            {/* Content Container */}
            <Card.Body className="p-4 bg-light-subtle">
              {checkoutItemsForPayment.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {checkoutItemsForPayment.map((item) => (
                    <CartItem
                      key={item.id || item.name}
                      item={item}
                      // Notice: physical props like selectedSize and selectedColor are removed here
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-5">
                  <p className="text-muted mb-3 fs-5">No digital products selected for checkout.</p>
                  <Button variant="outline-primary" className="rounded-pill px-4" onClick={() => navigate('/cart')}>
                    Return to Shopping Cart
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

           <Col lg={5} className="mt-4 mt-lg-0">
      <Card className="shadow-border border-0 overflow-hidden">
        {/* 1. Refined Header: More professional and trust-focused */}
        <Card.Header className="bg-dark text-white py-3 border-0">
          <h6 className="mb-0 text-uppercase fw-bold ls-1">Order Summary</h6>
        </Card.Header>

        <Card.Body className="p-4">
          {/* 2. Voucher Section: Keeping it clean */}
          <div className="mb-4">
            <VoucherForm onVoucherValidate={applyVoucherDiscount} />
          </div>

          <div className="order-details">
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal</span>
              <span className="fw-semibold">₱{totalItemsPrice.toFixed(2)}</span>
            </div>

            {/* 3. Digital Delivery Label: Replaced 'Shipping' with 'Delivery' */}
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Digital Delivery</span>
              <span className="text-success fw-bold">FREE</span>
            </div>

            {voucherDiscount > 0 && (
              <div className="d-flex justify-content-between mb-2 p-2 bg-danger-subtle rounded">
                <span className="text-danger fw-bold small">Voucher Applied</span>
                <span className="text-danger fw-bold">-₱{voucherDiscount.toFixed(2)}</span>
              </div>
            )}

            <hr className="my-3 opacity-10" />

            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h5 className="mb-0 fw-bold">Total Amount</h5>
                <small className="text-muted">VAT Inclusive (if applicable)</small>
              </div>
              <h3 className="text-primary mb-0 fw-bolder">
                {formattedGrandTotal}
              </h3>
            </div>
          </div>

          {/* 4. Primary Call to Action */}
          <div className="d-grid gap-2">
            <PayPalSection
              setShowCheckoutModal={setShowCheckoutModal}
              setModalType={setModalType}
              setDownloadUrl={setDownloadUrl}
              clearPurchasedItems={clearPurchasedItems}
              showCheckoutModal={showCheckoutModal}
            />
          </div>

          {/* 5. Trust Badges & Back Action */}
          <div className="text-center mt-3">
            <p className="small text-muted mb-3">
              <FaLock className="me-1 text-success" /> 
              Secure Encrypted Transaction
            </p>
            <Link to="/cart" className="text-decoration-none text-secondary small hover-underline">
              <FaArrowLeft className="me-1" /> Edit My Cart
            </Link>
          </div>
        </Card.Body>
      </Card>

      {/* ✅ FIXED MODAL LOGIC */}
                {showCheckoutModal && (
                  <SuccessModal 
                    show={showCheckoutModal} // Matches the state variable
                    downloadUrl={downloadUrl} // Receives the URL set by PayPalSection
                    onClose={() => {

                      setShowCheckoutModal(false);
                      navigate('/'); 
                      window.location.reload(); // This forces the app to pull the fresh, empty cart from the DB
                    }} 
                  />
                )}
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
                        voucherCode={voucherCode}
                        checkoutItems={checkoutItemsForPayment} // Pass the items explicitly
                        isLoggedIn={isLoggedIn}
                        // Pass ewalletStatus from location.state if available
                        ewalletStatus={location.state?.ewalletStatus || false}
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