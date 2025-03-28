import React, { useEffect, useState } from 'react';
import ShoppingCart from '../components/ShoppingCart';
import { Button, Container,Row, Col} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Cart.css';
import YouMayLikeProduct from'../components/YouMayLikeProduct';
import AlertEmptyCart from '../components/AlertEmptyCart';

export default function Cart ({ removeFromCart, handleIncrement, handleDecrement, addToCart,
 handleSizeChange, handleColorChange ,  setCartItems,  setCartCount, cartCount, cartItems, isLoggedIn}) {
  
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
    alert('Please log in to continue'); // Alert user to log in
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
            <YouMayLikeProduct addToCart={addToCart}/>
          </Col> 
      </Row>
      

      <div className="sticky-footer">
        <h2>Total Price: {formattedPrice}</h2>
    
        <Button className="w-100" style={{backgroundColor:'#E92409', border:'none'}} onClick={handleCheckoutClick}>
          Proceed to Checkout
        </Button>
      </div>

     </Container>
   
      </>
  );
};

