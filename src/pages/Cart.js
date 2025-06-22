import React, { useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { Button, Container, Row, Col, Modal, Form } from 'react-bootstrap'; // Import Form for checkboxes
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import YouMayLike from '../components/YouMayLike';
import AlertEmptyCart from '../components/AlertEmptyCart';

export default function Cart({
  removeFromCart,
  handleIncrement,
  handleDecrement,
  addToCart,
  handleSizeChange,
  handleColorChange,
  setCartItems, // You'll likely need this if you're updating isSelected directly
  setCartCount,
  cartCount,
  cartItems,
  isLoggedIn,
  youMayLikeProducts,
}) {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  const navigate = useNavigate();

  // Initialize selected state for all items on load or cartItems change
  useEffect(() => {
    // Ensure all items have an 'isSelected' property, defaulting to true if not present
    const updatedCartItems = cartItems.map(item => ({
      ...item,
     isSelected: item.isSelected !== undefined ? item.isSelected : true, // Default to true
    }));
    // Only update if there's an actual change to prevent infinite loops
    if (JSON.stringify(updatedCartItems) !== JSON.stringify(cartItems)) {
        setCartItems(updatedCartItems);
    }
  }, [cartItems, setCartItems]);


  // Handler for individual item selection
  const handleItemSelection = (itemId) => {
    setCartItems(prevCartItems =>
      prevCartItems.map(item =>
        item.id === itemId ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };

  // Handler for "Select All" checkbox
  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setCartItems(prevCartItems =>
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
  const selectedItems = cartItems.filter(item => item.isSelected); // Filter to get only selected items

  if (selectedItems.length === 0) {
    setShowEmptyCartAlert(true);
    return;
  }

  if (!isLoggedIn) {
    handleShowModal('Please login to continue');
    return;
  } else {
    // Navigate and pass the selected items in the state
    navigate('/checkout', { state: { selectedItems: selectedItems } });
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
        {cartItems.length > 0 && (
          <div className="mb-3">
            <Form.Check
              type="checkbox"
              id="selectAll"
              label="Select all items"
              checked={allItemsSelected}
              onChange={handleSelectAll}
            />
          </div>
        )}

        <ShoppingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          addToCart={addToCart}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          handleSizeChange={handleSizeChange}
          handleColorChange={handleColorChange}
          cartCount={cartCount}
          isLoggedIn={isLoggedIn}
          handleItemSelection={handleItemSelection} // Pass the new handler
        />

        <div className="sticky-footer">
          <h2>Subtotal ({selectedItems.length} items): {formattedPrice}</h2>
          <Button
            className="w-100"
            style={{ backgroundColor: '#E92409', border: 'none' }}
            onClick={handleCheckoutClick}
            disabled={!anyItemSelected} // Disable if no items are selected
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