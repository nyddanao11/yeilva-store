import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Alert, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CartItem from './CartItem';
import VoucherForm from './Voucher';
import YouMayLike from '../components/YouMayLike';
import './CheckoutPage.css';
import { FaLock, FaArrowLeft, FaShieldAlt, FaEnvelope } from 'react-icons/fa';
import { useCart } from './CartContextGuest';
import PayPalSection from '../components/CheckoutFormPaypal';
import SuccessModal from '../components/modalCheckout';

export default function CheckoutPage({
  addToCart,
  youMayLikeProducts,
  showCheckoutModal,
  setShowCheckoutModal,
}) {
  const {
    cartItems,
    checkoutItemsForPayment,
    setCheckoutItemsForPayment,
    totalItemsPrice,
    voucherDiscount,
    applyVoucherDiscount,
    formattedGrandTotal,
    clearPurchasedItems,
  } = useCart();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState(null);
const [modalType, setModalType] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  // Guard rails for items payload mapping
  useEffect(() => {
    if (location.state && location.state.selectedItems) {
      setCheckoutItemsForPayment(location.state.selectedItems);
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, navigate, setCheckoutItemsForPayment]);

  // Handle empty checkouts cleanly
  if ((!checkoutItemsForPayment || checkoutItemsForPayment.length === 0) && !showCheckoutModal) {
    return (
      <Container className="text-center my-5 py-5">
        <div className="p-5 bg-white rounded-4 shadow-sm max-w-sm mx-auto border border-light-subtle">
          <p className="text-muted fw-bold">No digital blueprints selected for checkout.</p>
          <Link to="/cart">
            <Button variant="primary" className="rounded-3 px-4">Return to Cart</Button>
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container className="checkout-page-container my-4 px-3 px-md-4">
        {/* Navigation Breadcrumb Anchor */}
        <div className="mb-4">
          <Link to="/cart" className="text-decoration-none text-muted small fw-bold d-inline-flex align-items-center gap-2">
            <FaArrowLeft size={12} /> Return to Shopping Cart
          </Link>
        </div>

        <Row className="g-4">
          {/* LEFT SIDE: Order Review & Instant Delivery Email Onboarding */}
          <Col lg={7} xl={8}>
            {/* Delivery Destination Segment */}
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden mb-4 bg-white">
            <Card.Header className="bg-white border-bottom border-light-subtle py-3 px-4">
              <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', fontSize: '12px' }}>1</span>
                Instant Digital Delivery
              </h5>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="d-flex align-items-start gap-3 bg-light-subtle p-3 rounded-3 border border-light-subtle">
                <div className="bg-white text-primary p-2 rounded-3 shadow-sm d-flex align-items-center justify-content-center">
                  <FaEnvelope size={18} />
                </div>
                <div>
                  <h6
                  className="fw-bold text-dark mb-1"
                  style={{ fontSize: '0.9rem' }}
                >
                  Your download link and receipt will be sent instantly to your email after payment.
                </h6>

                <p
                  className="text-muted mb-0 small"
                  style={{ fontSize: '0.82rem', lineHeight: '1.4' }}
                >
                  No account registration required — quick and hassle-free checkout.
                </p>
                </div>
              </div>
            </Card.Body>
          </Card>

            {/* Asset Vault Feed */}
            <Card className="border-0 shadow-sm rounded-4 overflow-hidden bg-white">
              <Card.Header className="bg-white border-bottom border-light-subtle py-3 px-4 d-flex align-items-center justify-content-between">
                <h5 className="mb-0 fw-bold text-dark d-flex align-items-center gap-2">
                  <span className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '24px', height: '24px', fontSize: '12px' }}>2</span>
                  Review Digital Blueprints
                </h5>
                <span className="badge bg-primary-subtle text-primary rounded-pill px-3 py-1.5 fw-bold" style={{ fontSize: '0.75rem' }}>
                  {checkoutItemsForPayment.length} {checkoutItemsForPayment.length === 1 ? 'Asset' : 'Assets'}
                </span>
              </Card.Header>

              <Card.Body className="p-4 bg-light-subtle">
                <div className="d-flex flex-column gap-3">
                  {checkoutItemsForPayment.map((item) => (
                    <CartItem key={item.id || item.name} item={item} />
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* RIGHT SIDE: Single-step Pricing Calculations & PayPal Payment Integration */}
          <Col lg={5} xl={4}>
            <div style={{ position: 'sticky', top: '24px', zIndex: 10 }}>
              <Card className="border-0 shadow-sm overflow-hidden bg-white rounded-4">
                <Card.Header className="bg-dark text-white py-3 border-0">
                  <h6 className="mb-0 text-uppercase fw-bold tracking-wider small">Checkout Summary</h6>
                </Card.Header>

                <Card.Body className="p-4">
                  {/* Coupon Interface */}
                  <div className="mb-4">
                    <VoucherForm onVoucherValidate={applyVoucherDiscount} />
                  </div>

                  {/* Financial Breakdown Grid */}
                  <div className="order-details text-muted small">
                    <div className="d-flex justify-content-between mb-2.5">
                      <span>Subtotal Gross Value</span>
                      <span className="fw-semibold text-dark">₱{totalItemsPrice.toFixed(2)}</span>
                    </div>

                    <div className="d-flex justify-content-between mb-2.5">
                      <span>Digital File Delivery</span>
                      <span className="text-success fw-bold text-uppercase" style={{ fontSize: '0.75rem' }}>Instant • Free</span>
                    </div>

                    {voucherDiscount > 0 && (
                      <div className="d-flex justify-content-between mb-2.5 p-2 bg-danger-subtle rounded text-danger fw-bold">
                        <span>Promo Code Saved</span>
                        <span>-₱{voucherDiscount.toFixed(2)}</span>
                      </div>
                    )}

                    <hr className="my-3 opacity-10" />

                    <div className="d-flex justify-content-between align-items-end mb-4">
                      <div>
                        <h5 className="mb-0 fw-extrabold text-dark">Total Due</h5>
                        <small className="text-muted" style={{ fontSize: '0.7rem' }}>Immediate Lifetime Access</small>
                      </div>
                      <h3 className="text-primary mb-0 fw-black">
                        {formattedGrandTotal}
                      </h3>
                    </div>
                  </div>

                  {/* PayPal Primary Conversion CTA Anchor */}
                  <div className="payment-gateway-wrapper mb-3">
                    <PayPalSection
                      setShowCheckoutModal={setShowCheckoutModal}
                      setModalType={setModalType}
                      setDownloadUrl={setDownloadUrl}
                      clearPurchasedItems={clearPurchasedItems}
                      showCheckoutModal={showCheckoutModal}
                      guestEmail={email} // Pass user email down into API order record hooks safely
                    />
                  </div>

                  {/* Security Clearance Proof points */}
                  <div className="text-center">
                    <div className="d-inline-flex align-items-center justify-content-center gap-1.5 text-muted small" style={{ fontSize: '0.78rem' }}>
                      <FaLock className="text-success" size={12} /> 
                      <span>Secure 256-Bit Encrypted Connection</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />

      {/* Modal Integration Framework */}
      {showCheckoutModal && (
        <SuccessModal 
          show={showCheckoutModal} 
          downloadUrl={downloadUrl} 
          onClose={() => {
            setShowCheckoutModal(false);
            navigate('/'); 
            window.location.reload();
          }} 
        />
      )}
    </>
  );
}