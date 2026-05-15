import React from 'react';
import { Card, Row, Col, Form, Button, Modal } from 'react-bootstrap';
import { FaTrash, FaShoppingCart, FaChevronRight } from 'react-icons/fa';
import { Zap, ShieldCheck } from 'lucide-react'; // Modern conversion icons
import { useNavigate, Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useCart } from '../pages/CartContext';
import './ShoppingCart.css';

export default function ShoppingCart({ handleItemSelection, isLoggedIn }) {
  const{
   cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    handleIncrement,
    handleDecrement,
    setCheckoutItemsForPayment, // This is key for passing selected items to checkout
    setCartItems, // IMPORTANT: If you need to modify the cartItems array directly
                  // (e.g., to add `isSelected`), you MUST expose this from context.
                  // As discussed, prefer specific actions if possible, but for `isSelected`,
                  // this might be a necessary, carefully managed exposure.
     confirmRemoveItem,
        showConfirmModal,
        itemToRemove,
        setShowConfirmModal,
        applyVoucherDiscount,
  }= useCart();
   
  const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
  const navigate = useNavigate();

  const backToHome = () => navigate('/');
  const login = () => navigate('/login');
  const signup = () => navigate('/signupform');

  return (
    <div className="shopping-cart-wrapper">
      {cartItems.length === 0 ? (
        /* --- MODERN EMPTY CART STATE --- */
        <Card className="border-0 shadow-sm rounded-4 text-center py-5 bg-light">
          <Card.Body className="d-flex flex-column align-items-center justify-content-center p-5">
            <div className="bg-white p-4 rounded-circle shadow-sm mb-4">
              <FaShoppingCart size={60} className="text-muted opacity-50" />
            </div>
            <h3 className="fw-bold mb-2">Your digital library is empty</h3>
            <p className="text-muted mb-4 max-w-md" style={{ maxWidth: '400px' }}>
              Explore our top-tier AI prompt engineering blueprints and elevate your productivity instantly.
            </p>
            <Button variant="primary" size="lg" className="px-5 rounded-pill shadow-sm" onClick={backToHome}>
              Browse Premium Guides
            </Button>

            {!isLoggedIn && (
              <div className="mt-5 pt-4 border-top w-100" style={{ maxWidth: '400px' }}>
                <h6 className="text-uppercase tracking-wider text-muted small fw-bold mb-3">Returning Student?</h6>
                <div className="d-flex gap-2 justify-content-center">
                  <Button variant="outline-primary" className="rounded-pill px-4" onClick={login}>Log In</Button>
                  <Button variant="outline-secondary" className="rounded-pill px-4" onClick={signup}>Create Account</Button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      ) : (
        /* --- HIGH-CONVERTING DIGITAL ITEM LIST --- */
        cartItems.map((item) => (
          <Card key={item.id} className="mb-3 border-0 shadow-sm rounded-4 overflow-hidden position-relative hover-shadow transition">
            <Card.Body className="p-3 p-md-4">
              <Row className="align-items-center g-3">
                
                {/* 1. Selection Checkbox */}
                <Col xs="auto" className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={() => handleItemSelection(item.id)}
                    className="custom-cart-checkbox cursor-pointer"
                    style={{ transform: 'scale(1.2)' }}
                  />
                </Col>

                {/* 2. Mini Book Cover Preview */}
                <Col xs={3} md={2} className="text-center">
                  <Link to={`/clickcartitem/${item.id}`} className="d-block">
                    <img
                      src={item.url}
                      alt={item.name}
                      className="img-fluid rounded shadow-sm border"
                      style={{ maxHeight: isSmallScreen ? '80px' : '110px', objectFit: 'contain' }}
                    />
                  </Link>
                </Col>

                {/* 3. Product Details & Badges */}
                <Col xs={7} md={5} className="d-flex flex-column justify-content-center">
                  <Link to={`/clickcartitem/${item.id}`} className="text-decoration-none text-dark">
                    <h5 className="fw-bold mb-1 text-truncate-2 fs-6 fs-md-5">{item.name}</h5>
                  </Link>
                  <div className="d-flex flex-wrap gap-2 align-items-center mt-1">
                    <span className="badge bg-soft-info text-info rounded-pill px-2 py-1 small-badge" style={{ fontSize: '11px', backgroundColor: '#e0f2fe' }}>
                      <Zap size={10} className="me-1 d-inline" fill="currentColor" /> Instant Access
                    </span>
                    <span className="badge bg-soft-success text-success rounded-pill px-2 py-1 small-badge" style={{ fontSize: '11px', backgroundColor: '#dcfce7' }}>
                      PDF Format
                    </span>
                  </div>
                </Col>

                {/* 4. Pricing & Global Delete Button (Desktop Optimized) */}
                <Col xs={12} md={4} className="ms-auto d-flex flex-row flex-md-column align-items-center align-items-md-end justify-content-between pt-2 pt-md-0 border-top border-md-0">
                 <div className="text-md-end">
                  {item.final_price && Number(item.final_price) < Number(item.price) ? (
                    <>
                      {/* Show original base price with a strikethrough */}
                      <span className="text-decoration-line-through text-muted d-block small mb-0">
                        ₱{Number(item.price || 0).toFixed(2)}
                      </span>
                      {/* Show the computed discounted final price directly from your context data */}
                      <span className="fw-extrabold text-danger fs-5">
                        ₱{Number(item.final_price).toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <>
                      <small className="text-muted d-block d-md-none">Price:</small>
                      <span className="fw-extrabold text-dark fs-5">
                        ₱{Number(item.price || 0).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                  <Button
                    variant="link"
                    className="text-danger text-decoration-none p-0 mt-md-2 d-flex align-items-center gap-1 hover-opacity shadow-none"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrash size={14} /> <span className="small">Remove</span>
                  </Button>
                </Col>

              </Row>
            </Card.Body>
          </Card>
        ))
      )}

      {/* --- CONFIRM REMOVAL MODAL --- */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered backdrop="static">
        <Modal.Body className="text-center p-4">
          <div className="text-danger mb-3">
            <FaTrash size={40} />
          </div>
          <h5 className="fw-bold mb-2">Remove from Library?</h5>
          <p className="text-muted small">
            Are you sure you want to remove <strong>{itemToRemove?.name}</strong>? You will lose out on temporary platform discounts.
          </p>
          <div className="d-flex gap-2 justify-content-center mt-4">
            <Button variant="light" className="px-4 rounded-pill w-50 fw-medium" onClick={() => setShowConfirmModal(false)}>
              Keep Item
            </Button>
            <Button variant="danger" className="px-4 rounded-pill w-50 fw-medium" onClick={confirmRemoveItem}>
              Yes, Remove
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}