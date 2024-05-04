import React, { useState, useEffect } from 'react';
import { ListGroup, Image, Button, InputGroup, FormControl, Card, Row, Col } from 'react-bootstrap';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';
import './ShoppingCart.css';
import PropTypes from 'prop-types'; // Import PropTypes

const ShoppingCart = ({
  cartItems,
  removeFromCart,
  addToCart,
  handleIncrement,
  handleDecrement,
  cartItem,
  cartCount
}) => {


  const [selectedThumbnails, setSelectedThumbnails] =  useState({});
  const navigate = useNavigate();
 const backToHome=()=>{  
// alert('Are you sure To Delete your Account? ')
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
          <Card className="image-description d-flex flex-column justify-content-center align-items-center" style={{ border: "none"}}>
           <Card.Body  className="d-flex flex-column justify-content-center align-items-center" >
              <h6>Your cart is empty.</h6>
              <FaShoppingCart size={100} style={{color:'#0D6EFD'}} />
              <Button style={{width:"150px", marginTop:"10px"}} onClick={backToHome}>Shop Now</Button>
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
