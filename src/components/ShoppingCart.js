import React, { useState, useEffect } from 'react';
import { ListGroup, Image, Button, InputGroup, FormControl, Card, Row, Col, Form } from 'react-bootstrap';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import './ShoppingCart.css';
import PropTypes from 'prop-types'; // Import PropTypes
import {Link} from'react-router-dom';

export default function ShoppingCart({
  handleSizeChange,
  handleColorChange,
  handleItemSelection,
   cartItems,
  removeFromCart,
  addToCart,
  handleIncrement,
  handleDecrement,
  cartItem,
  cartCount,
  isLoggedIn,
 
}) {
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
              <Row className="align-items-center g-2 g-md-3"> {/* Added g-2 g-md-3 for gutter control */}
                {/* Checkbox Column */}
                <Col xs={2} sm={1} className="d-flex justify-content-start align-items-start pt-1">
                  <Form.Check
                    type="checkbox"
                    checked={item.isSelected}
                    onChange={() => handleItemSelection(item.id)}
                    style={{ marginTop: '2px' }}
                  />
                </Col>

                {/* Image Column */}
                <Col xs={12} sm={6} md={2} lg={2} xl={2} className="d-flex align-items-center justify-content-center">
               <Link to={`/clickcartitem/${item.id}`}>
                  <Card.Img
                    src={item.url}
                    alt={item.name}
                    className="img-fluid" // Ensures image scales down
                    style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'cover' }}
                  />
                  </Link>
                </Col>

                {/* Product Details & Quantity Column */}
                  
                <Col xs={12} sm={6} md={5} lg={5} xl={5} className=" d-flex flex-column justify-content-center align-items-center ">
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
                </Col>

                {/* Remove Button Column */}
                <Col xs={12} sm={3} md={4} lg={4} xl={4} className="text-center d-flex flex-column justify-content-center align-items-center ">
                  <Button
                    variant="outline-danger" // Changed to outline-danger for better contrast/UX
                    size="sm"
                    onClick={() => removeFromCart(item.id)} 
                  >
                    <FaTrash className="me-1" /> Remove
                  </Button>
              
                </Col>

              </Row>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}


// Define propTypes outside the component
ShoppingCart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  
};

