import React, {useState} from 'react';
import { ListGroup, Image, Button, InputGroup, FormControl, Card, Row, Col, Form } from 'react-bootstrap';
import './ShoppingCart.css';


const ShoppingCart = ({
  cartItems,
  removeFromCart,
  addToCart,
  handleIncrement,
  handleDecrement,
  cartItem
  
}) => {

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      <ListGroup className="cart-group">
        {cartItems.length === 0 ? (
          <ListGroup.Item className="cart-item" >Your cart is empty.</ListGroup.Item>
        ) : (
          cartItems.map((cartItem) => (
            <ListGroup.Item key={cartItem.id} className="cart-item">

              <Card className="pb-2" style={{ border: "none" }}>
                <Card.Body>
                  <Row className="">
                    <Col md={4} className="image-description ">
                      <Image src={cartItem.url} alt={cartItem.name} height="200" className="pe-4 " />
                    </Col>
                    <Col md={8} className="item-details ">
                      <p className="item-name">{cartItem.name}</p>
                      <p className="item-price">₱{cartItem.price}</p>
                      <p className="item-description">{cartItem.description}</p>    
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

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

                <div className="d-flex align-items-center justify-content-center p-2">
                  <Button
                    variant="danger"
                    className="h-25"
                    onClick={() => removeFromCart(cartItem)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
    </div>
  );
};

export default ShoppingCart;




