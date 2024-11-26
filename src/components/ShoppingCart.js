import React, { useState, useEffect } from 'react';
import { ListGroup, Image, Button, InputGroup, FormControl, Card, Row, Col } from 'react-bootstrap';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import './ShoppingCart.css';
import PropTypes from 'prop-types'; // Import PropTypes
import {Link} from'react-router-dom';

const ShoppingCart = ({
  cartItems,
  removeFromCart,
  addToCart,
  handleIncrement,
  handleDecrement,
  cartItem,
  cartCount,
  isLoggedIn,
}) => {

  const [selectedThumbnails, setSelectedThumbnails] =  useState({});
  const navigate = useNavigate();
 const backToHome=()=>{  
navigate ('/');
}
  const handleThumbnailClick = (itemId, imageUrl) => {
    // Update the selected thumbnail for the specific item
    setSelectedThumbnails((prevSelectedThumbnails) => ({
      ...prevSelectedThumbnails,
      [itemId]: imageUrl,
    }));
  };

  return (
    <div className="shopping-cart">
      <h4 className='page-title'>Your Shopping Cart</h4>
      <ListGroup className="cart-group">
        {cartItems.length === 0 ? (
          <ListGroup.Item className="cart-item mb-3" style={{boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
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
              <Button variant="outline-success" style={{marginRight:'6px'}}> <Link to="/login" className=" text-black text-decoration-none hover-white"> Login </Link> </Button>
               <Button variant="outline-success"> <Link to="/signupform" className="text-black text-decoration-none hover-white"> Signup </Link> </Button> 
               </div>
               </Col>  
               )}           
               </Row>
              </Card.Body> 
            </Card>
          </ListGroup.Item>
        ) : (
          cartItems.map((cartItem) => (
            <ListGroup.Item key={cartItem.id} className="cart-item mb-3" style={{boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
              <Card className="pb-2 " style={{ border: "none"}}>
                <Card.Body >
                  <Row >
                    <Col md={4}  className="image-description d-flex flex-column justify-content-center align-items-center">
                       <div className="main-image-container">
                        <Image
                          src={selectedThumbnails[cartItem.id] || cartItem.url}
                          alt={cartItem.name}
                          className="main-image"
                        />
                      </div>
                      <div className="thumbnails">
                        {cartItem.thumbnails.map((thumb, id) => (
                          <img
                            key={id}
                            src={thumb}
                            alt={`Thumbnail ${id}`}
                            onClick={() => handleThumbnailClick(cartItem.id, thumb)}
                            className="thumbnail-image"
                          />
                        ))}
                      </div>
                    </Col>
                <Col md={8}  className="item-details mt-3">
                      <h4 className="item-name">{cartItem.name}</h4>  
                      <p className="item-description">{cartItem.description}</p>
                      <h6 className="item-price">₱{cartItem.price}</h6>
                 
            <div className="quantity">
                <div className="quantity-in d-flex align-items-center justify-content-center pb-2">
                  <Button
                    variant="outline-secondary"
                    className="quantity-button"
                    onClick={() => handleDecrement(cartItem)}
                  >
                    -
                  </Button>

                  <InputGroup>
                    <FormControl
                      className="quantity-value"
                      value={cartItem.quantity}
                      readOnly
                    />
                  </InputGroup>

                  <Button
                    variant="outline-secondary"
                    className="quantity-button"
                    onClick={() => handleIncrement(cartItem)}
                  >
                    +
                  </Button>
                </div>

                <div className="mx-4">
                 <Button
                   variant="outline-secondary"
                    onClick={() => removeFromCart(cartItem.id)}
                  >
                    <FaTrash />
                  </Button>

                </div>
              </div>

              <h6 style={{marginTop:'4px'}}>Subtotal: ₱{`${cartItem.price * cartItem.quantity}`}</h6>

                  </Col>
                  </Row>
                </Card.Body>
              </Card>

            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </div>
  );
};



// Define propTypes outside the component
ShoppingCart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  removeFromCart: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  handleIncrement: PropTypes.func.isRequired,
  handleDecrement: PropTypes.func.isRequired,
  
};

export default ShoppingCart;
