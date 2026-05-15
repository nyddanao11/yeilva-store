import React, { useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { Button, Container, Row, Col, Modal, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Trash2, ShoppingBag } from 'lucide-react';
import './Cart.css';
import YouMayLike from '../components/YouMayLike';
import AlertEmptyCart from '../components/AlertEmptyCart';
import { useCart } from './CartContext';

export default function Cart({ isLoggedIn, youMayLikeProducts }) {
  const {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    setCartItems,
    setCheckoutItemsForPayment,
    checkoutItemsForPayment,
    confirmRemoveItem,
    applyVoucherDiscount,
  } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);
  const navigate = useNavigate();

  console.log('cartItemsPrice', cartItems);

  // Ensure items have isSelected property
  useEffect(() => {
    if (cartItems.length > 0 && cartItems.some(item => item.isSelected === undefined)) {
      const updatedCartItems = cartItems.map(item => ({
        ...item,
        isSelected: true,
      }));
      setCartItems(updatedCartItems);
    }
  }, [cartItems, setCartItems]);

  const handleItemSelection = (itemId) => {
    setCartItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
    ));
  };

  const handleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setCartItems(prev => prev.map(item => ({ ...item, isSelected: isChecked })));
  };

  const selectedItems = cartItems.filter(item => item.isSelected);
  
  // Calculate Total (Quantity is always 1 for digital)
  const total = selectedItems.reduce((acc, item) => {
    const price = Number(item.final_price ?? item.price) || 0;
    return acc + price; 
  }, 0);

  const formattedPrice = new Intl.NumberFormat('fil-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(total);

  const handleCheckoutClick = () => {
    if (selectedItems.length === 0) {
      setShowEmptyCartAlert(true);
      return;
    }
    if (!isLoggedIn) {
      setModalMessage('Please login to securely access your digital downloads.');
      setShowModal(true);
      return;
    }
    setCheckoutItemsForPayment(selectedItems);
    navigate('/checkout');
  };

  return (
    <>
      {showEmptyCartAlert && <AlertEmptyCart onClose={() => setShowEmptyCartAlert(false)} />}
      
      <Container className="py-5">
        <Row>
          {/* Main Cart Area */}
          <Col lg={8}>
            <div className="d-flex align-items-center mb-4">
              <ShoppingBag className="me-2 text-primary" />
              <h2 className="fw-bold mb-0">Your Digital Library</h2>
            </div>

            {cartItems.length > 0 ? (
              <>
                <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 mb-3">
                  <Form.Check 
                    type="checkbox" 
                    label="Select All Items" 
                    checked={cartItems.length > 0 && cartItems.every(i => i.isSelected)}
                    onChange={handleSelectAll}
                    className="fw-medium"
                  />
                  <small className="text-muted">{cartCount} items in cart</small>
                </div>

                {/* Pass a prop to ShoppingCart to hide quantity controls */}
                <ShoppingCart 
                  cartItems={cartItems} 
                 cartItems = {cartItems}
                  cartCount= {cartCount}
                  addToCart= {addToCart}
                  removeFromCart= {removeFromCart}
                  isLoggedIn={isLoggedIn} // Keep if prop
                  handleItemSelection={handleItemSelection}
                  applyVoucherDiscount={applyVoucherDiscount}
                  isDigitalMode={true} // Add this flag to your ShoppingCart component logic
                />
              </>
            ) : (
              <div className="text-center py-5 border rounded-4 bg-light">
                <p className="lead text-muted">Your cart is empty.</p>
                <Button variant="primary" onClick={() => navigate('/')}>Browse E-books</Button>
              </div>
            )}
          </Col>

          {/* Sidebar Summary (Modern Best Practice) */}
          <Col lg={4} className="mt-4 mt-lg-0">
            <Card className="border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
              <Card.Body className="p-4">
                <h4 className="fw-bold mb-4">Order Summary</h4>
                <div className="d-flex justify-content-between mb-2">
                  <span>Selected Items ({selectedItems.length})</span>
                  <span>{formattedPrice}</span>
                </div>
                <div className="d-flex justify-content-between mb-4 border-top pt-3">
                  <span className="fw-bold h5">Total</span>
                  <span className="fw-bold h5 text-primary">{formattedPrice}</span>
                </div>

                <Button 
                  className="w-100 py-3 fw-bold rounded-pill mb-3"
                  style={{ backgroundColor: '#E92409', border: 'none' }}
                  onClick={handleCheckoutClick}
                  disabled={selectedItems.length === 0}
                >
                  Proceed to Checkout
                </Button>

                <div className="text-center small text-muted">
                  <div className="mb-2"><ShieldCheck size={16} className="text-success" /> Encrypted & Secure Payment</div>
                  <div><Zap size={16} className="text-warning" /> Instant Download After Purchase</div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      <YouMayLike youMayLikeProducts={youMayLikeProducts} />

      {/* Auth Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center p-5">
           <h3 className="fw-bold mb-3">Sign in Required</h3>
           <p className="text-muted mb-4">{modalMessage}</p>
           <Button variant="primary" className="w-100 py-2 rounded-pill" onClick={() => navigate('/login')}>
              Log In to My Account
           </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}