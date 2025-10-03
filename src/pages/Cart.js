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
     confirmRemoveItem,
        showConfirmModal,
        itemToRemove,
        setShowConfirmModal,
  } = useCart();

  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  const navigate = useNavigate();
  
useEffect(() => {
    // Check if initialization is necessary AND if cartItems is available
    if (cartItems.length > 0 && cartItems.some(item => item.isSelected === undefined)) {
        
        // Create the NEW array
        const updatedCartItems = cartItems.map(item => ({
            ...item,
            isSelected: true, // Default to true
        }));
        
        // Update the state once. The loop will stop because the next time 
        // the component renders, `cartItems.some(item => item.isSelected === undefined)` 
        // will be false, and this hook will not call the setter again.
        setCartItems(updatedCartItems);
    } 
    
    // Remove the `else if (cartItems.length === 0)` block, it's redundant and risky.
}, [cartItems, setCartItems]);

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
      // ----------------------------------------------------
      // FIX: Ensure both price and quantity are valid numbers.
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      // ----------------------------------------------------

      return item.isSelected ? total + price * quantity : total;
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
         cartItems = {cartItems}
          cartCount= {cartCount}
          addToCart= {addToCart}
          removeFromCart= {removeFromCart}
          handleIncrement= {handleIncrement}
          handleDecrement= {handleDecrement}
          handleSizeChange={handleSizeChange} // Keep if prop
          handleColorChange={handleColorChange} // Keep if prop
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