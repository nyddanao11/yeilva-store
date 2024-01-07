import React, { useState, useEffect } from 'react';
import { ListGroup, Image, Button, InputGroup, FormControl, Card, Row, Col } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
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

 
  const handleThumbnailClick = (itemId, imageUrl) => {
    // Update the selected thumbnail for the specific item
    setSelectedThumbnails((prevSelectedThumbnails) => ({
      ...prevSelectedThumbnails,
      [itemId]: imageUrl,
    }));
  };


  return (
    <div className="shopping-cart">
      <h2 className='page-title'>Your Shopping Cart</h2>
      <ListGroup className="cart-group">
        {cartItems.length === 0 ? (
          <ListGroup.Item className="cart-item">Your cart is empty.</ListGroup.Item>
        ) : (
          cartItems.map((cartItem) => (
            <ListGroup.Item key={cartItem.id} className="cart-item">
              <Card className="pb-2" style={{ border: "none" }}>
                <Card.Body>
                  <Row className="">
                    <Col md={4} className="image-description">
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
                <Col md={8} className="item-details">
                      <p className="item-name">{cartItem.name}</p>
                      <p className="item-price">₱{cartItem.price}</p>
                      <p className="item-description">{cartItem.description}</p>
                 
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
                    variant="danger"
                    className=""
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
