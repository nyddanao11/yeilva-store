import React, { useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import YouMayLike from '../components/YouMayLike';
import AlertEmptyCart from '../components/AlertEmptyCart';
import { useCart } from './CartContext'; // Correct path to your context

export default function Cart({
  // ONLY keep props that are NOT managed by CartContext
  handleSizeChange, // Keep if size/color are product-specific and passed down
  handleColorChange, // Keep if size/color are product-specific and passed down
  isLoggedIn, // Keep if login status is from a different context or App.js
  youMayLikeProducts, // Keep if these products are from a different source
}) {
  // CORRECT: Destructure all cart-related state and functions from useCart()
  const {
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
  } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  const navigate = useNavigate();

  // Initialize selected state for all items on load or cartItems change
  useEffect(() => {
    // Only proceed if cartItems has loaded and needs modification for `isSelected`
    if (cartItems.length > 0 && cartItems.some(item => item.isSelected === undefined)) {
        const updatedCartItems = cartItems.map(item => ({
          ...item,
          isSelected: item.isSelected !== undefined ? item.isSelected : true, // Default to true
        }));
        // Use the setCartItems from context
        setCartItems(updatedCartItems);
    } else if (cartItems.length === 0) {
        // If cart becomes empty, ensure no leftover isSelected logic
        setCartItems([]);
    }
  }, [cartItems, setCartItems]); // Depend on cartItems and setCartItems (from context)

  // Handler for individual item selection
  const handleItemSelection = (itemId) => {
    setCartItems(prevCartItems => // Use setCartItems from context
      prevCartItems.map(item =>
        item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  // Handler for "Select All" checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setCartItems(prevCartItems => // Use setCartItems from context
      prevCartItems.map(item => ({ ...item, isSelected: isChecked }))
    );
  };

  // Calculate total price only for selected items
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      return item.isSelected ? total + item.price * item.quantity : total;
    }, 0);
  };

  const selectedItems = cartItems.filter(item => item.isSelected);
  const total = calculateTotalPrice(selectedItems);
  const formattedPrice = new Intl.NumberFormat('fil-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(total);

  const handleClose = () => setShowModal(false);
  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };

  const handleLoginRedirect = () => {
    setShowModal(false);
    window.location.href = '/login';
  };

  const handleCheckoutClick = () => {
    const itemsToProcessForCheckout = cartItems.filter(item => item.isSelected); // Filter to get only selected items

    if (itemsToProcessForCheckout.length === 0) {
      setShowEmptyCartAlert(true);
      return;
    }

    if (!isLoggedIn) {
      handleShowModal('Please login to continue');
      return;
    } else {
      // CORRECT: Use setCheckoutItemsForPayment from context
      setCheckoutItemsForPayment(itemsToProcessForCheckout);
      // CORRECT: Navigate to the correct checkout route, without passing items in state (context holds them)
      navigate('/checkout'); // Assuming your route is /checkoutform as per earlier discussion
    }
  };

  const allItemsSelected = cartItems.length > 0 && cartItems.every(item => item.isSelected);
  const anyItemSelected = cartItems.some(item => item.isSelected);

  return (
    <>
      {showEmptyCartAlert && (
        <AlertEmptyCart onClose={() => setShowEmptyCartAlert(false)} />
      )}
      <Container className="cart-container">
        <div className="d-flex justify-content-center aligned-items-center">
          <h4 className="text-center mb-1" style={{ padding: '10px' }}>
            Shopping Cart
          </h4>
        </div>
        {cartItems.length > 0 && (
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              id="selectAll"
              label="Select all items"
              checked={allItemsSelected}
              onChange={handleSelectAll}
              style={{ fontSize: '20px' }}
            />
          </div>
        )}

        <ShoppingCart
          cartItems={cartItems} // These now come from useCart()
          removeFromCart={removeFromCart} // From useCart()
          addToCart={addToCart} // From useCart()
          handleIncrement={handleIncrement} // From useCart()
          handleDecrement={handleDecrement} // From useCart()
          handleSizeChange={handleSizeChange} // Keep if prop
          handleColorChange={handleColorChange} // Keep if prop
          cartCount={cartCount} // From useCart()
          isLoggedIn={isLoggedIn} // Keep if prop
          handleItemSelection={handleItemSelection}
        />

        <div className="sticky-footer">
          <h2>Subtotal ({selectedItems.length} items): {formattedPrice}</h2>
          <Button
            className="w-100"
            style={{ backgroundColor: '#E92409', border: 'none' }}
            onClick={handleCheckoutClick}
            disabled={!anyItemSelected}
          >
            Proceed to Checkout
          </Button>
        </div>

        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Authentication Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleLoginRedirect}>
              Log In
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />
    </>
  );
}