import React, { useState, useEffect } from 'react';
import { ListGroup, Image, Button, InputGroup, FormControl, Card, Row, Col, Form, Modal } from 'react-bootstrap';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import './ShoppingCart.css';
import PropTypes from 'prop-types'; // Import PropTypes
import {Link} from'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useCart } from '../pages/CartContext'; // Correct path to your context

export default function ShoppingCart({
  handleItemSelection,
  isLoggedIn,
}) {
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
 const backToHome=()=>{  
navigate ('/');
}
const login =()=>{
  navigate('/login');
}
const signup =()=>{
  navigate('/signupform');
}
 return (
    <div>
        {cartItems.length === 0 ? (
         <Card className="image-description border-0" > 
         <Card.Body> 
         <Row className="justify-content-center">    
          <Col lg={4} md={4} xs={6} className="d-flex flex-column justify-content-center align-items-center text-center"> 
          <h4>Your cart is empty.</h4> 
          <FaShoppingCart size={100} className="text-primary" />
           <Button variant="primary" className="mt-3" onClick={backToHome}> Continue Shopping </Button>
            </Col>
            {!isLoggedIn &&(
             <Col  lg={4} md={4} xs={6} className="d-flex flex-column justify-content-center align-items-center text-center" > 
             <div>
             <h6>Shop today's deals</h6>
             </div>
             <div className="d-flex justify-content-center align-items-center text-center">
              <Button variant="outline-success" className=" onhover" style={{marginRight:'6px'}} onClick ={login}>  Login </Button>
               <Button variant="outline-success" className=" onhover" onClick ={signup}> Signup </Button> 
               </div>
               </Col>  
               )}           
               </Row>
              </Card.Body> 
            </Card>
           
         
      ) : (
       cartItems.map((item) => (
          <Card key={item.id} className="mb-3">
            <Card.Body>
             <div className="d-flex justify-content-start align-items-start pt-1">           
                  <Form.Check
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={() => handleItemSelection(item.id)}
                    style={{ fontSize: '20px' }}
                  />              
                </div>
              <Row className="g-2 g-md-3"> {/* Added g-2 g-md-3 for gutter control */} 
                
                {/* Image Column */}
                <Col xs={6} sm={6} md={6} lg={6} xl={6} >
                {isSmallScreen? (
                  <Link to={`/clickcartitem/${item.id}`} className="d-flex justify-content-center align-items-center">
                    <Card.Img
                      src={item.url}
                      alt={item.name}
                      className="img-fluid" // Ensures image scales down
                      style={{ maxWidth: '100px', height: 'auto', }}
                    />
                    </Link>
                    ):(
                     <Link to={`/clickcartitem/${item.id}`} className="d-flex justify-content-center align-items-center">
                    <Card.Img
                      src={item.url}
                      alt={item.name}            
                      style={{ maxWidth: '25%', height: '25%' }}
                    />
                    </Link>
                    )
                }
                </Col>
              
                {/* Product Details & Quantity Column */}
              
                <Col xs={6} sm={6} md={6} lg={6} xl={6} className=" product-details d-flex flex-column ">
                  <Card.Title className="h6 mb-1">{item.name}</Card.Title> {/* Adjusted heading size */}
                  <Card.Text className="small text-muted mb-2">Price: PHP {item.price.toFixed(2)}</Card.Text>
                  {/*
                    Add your size and color selectors here.
                    Consider making them responsive too, perhaps stacking vertically on small screens.
                    Example:
                    <div className="d-block d-sm-flex align-items-center mb-2">
                      <span className="me-2">Size:</span>
                      <Form.Select className="w-auto" onChange={(e) => handleSizeChange(item.id, e.target.value)} value={item.size}>
                         <option>S</option>
                         <option>M</option>
                      </Form.Select>
                    </div>
                  */}

                  <InputGroup className="mt-2" style={{ maxWidth: '120px' }}> {/* Use maxWidth for responsiveness */}
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleDecrement(item)} 
                    >
                      -
                    </Button>
                    <Form.Control
                      type="text"
                      value={item.quantity}
                      readOnly
                      className="text-center"
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => handleIncrement(item)} 
                    >
                      +
                    </Button>
                  </InputGroup>

                 <Button
                    variant="outline-danger" // Changed to outline-danger for better contrast/UX
                    size="sm"
                    onClick={() => removeFromCart(item.id)} 
               style={{margin:"10px 0px", maxWidth:"120px"}}
                  >
                    <FaTrash className="me-1" /> Remove
                  </Button>
              
                </Col>

                 
              </Row>
            </Card.Body>
          </Card>
        ))
      )}
         <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Remove Item?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You're about to remove <strong>{itemToRemove?.name}</strong> from your cart. Are you sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmRemoveItem}>
            Yes, Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}