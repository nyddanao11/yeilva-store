import React, { useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { Button, Container,Row, Col, Modal} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import YouMayLike from '../components/YouMayLike';
import AlertEmptyCart from '../components/AlertEmptyCart';


export default function Cart  ({ removeFromCart, handleIncrement, handleDecrement, addToCart,
 handleSizeChange, handleColorChange ,  setCartItems,  setCartCount, cartCount, cartItems, isLoggedIn})  {
   const [showModal, setShowModal] = useState(false);
   const [modalMessage, setModalMessage] = useState('');
 
 const handleClose = () => setShowModal(false);
  const handleShowModal = (message) => {
  setModalMessage(message);
  setShowModal(true);
};

  const handleLoginRedirect = () => {
    setShowModal(false);
    // Redirect to login page
    window.location.href = '/login'; // or use navigate('/login') if using react-router
  };

  const navigate = useNavigate();
   const [showEmptyCartAlert, setShowEmptyCartAlert] = useState(false);

  
  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };
  
   const total = calculateTotalPrice(cartItems);
const formattedPrice = new Intl.NumberFormat('fil-PH', {
  style: 'currency',
  currency: 'PHP',  // Currency code for Philippine Pesos
}).format(total);


 
// Function to handle the checkout button click
const handleCheckoutClick = () => {
  if (cartItems.length === 0) {
    setShowEmptyCartAlert(true); // Show alert for empty cart
    return; // Exit the function if the cart is empty
  } 

  if (!isLoggedIn) {
   handleShowModal('Please login to continue')
    return; // Exit the function if the user is not logged in
  }else{
      navigate('/checkout'); // Redirect to checkout
  }
};
 
  return (
    <> 
    {showEmptyCartAlert && (
        <AlertEmptyCart onClose={() => setShowEmptyCartAlert(false)} />
      )}
    <Container className="cart-container">
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


      />
     <Row className="d-flex justify-content-center aligned-items-center" style={{marginTop:"25px"}} >
      <div className="line" style={{marginBottom:'30px'}}>
      <h4 className="text">You May also Like</h4>
      </div>
  <Col lg={10} md={10} sm={12} style={{ padding:'5px 0px', marginBottom:'15px'}}>
            <YouMayLike addToCart={addToCart}/>
          </Col> 
      </Row>

      <div className="sticky-footer">
        <h2>Total Price: {formattedPrice}</h2>
    
        <Button className="w-100" style={{backgroundColor:'#E92409', border:'none'}} onClick={handleCheckoutClick}>
          Proceed to Checkout
        </Button>
      </div>

         <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Authentication Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {modalMessage}
                </Modal.Body>
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
   
      </>
  );
};


