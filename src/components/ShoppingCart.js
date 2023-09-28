import React from 'react';
import { ListGroup, Image, Button, InputGroup, FormControl, Card, Row, Col } from 'react-bootstrap';
import './ShoppingCart.css';

const ShoppingCart = ({ cartItems, removeFromCart, addToCart, handleIncrement, handleDecrement,item }) => {
  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      <ListGroup className="cart-group">
        {cartItems.length === 0 ? (
          <ListGroup.Item className="cart-item" >Your cart is empty.</ListGroup.Item>
        ) : (
          cartItems.map((item) => (
            <ListGroup.Item key={item.id} className="cart-item">

            <Card className="pb-2">
           	 <Card.Body>
	            <Row className="">
	              <Col md={3} className="image-description ">
	                <Image src={item.url} alt={item.name} height="200" className="pe-4 "/> 
	              </Col>
	              <Col md={6} className="item-details ">
	               <p className="item-name">{item.name}</p>
	                <p className="item-price">₱{item.price}</p>
	               <p className="item-description">{item.description}</p>
	              </Col>

	            </Row>
             </Card.Body>
            </Card>

            <div className="quantity">

              <div className= " quantity-in d-flex align-items-center justify-content-center pb-2">
                <Button
                  variant="outline-secondary"
                  className="quantity-button"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </Button>

                <InputGroup>
                  <FormControl
                    className="quantity-value"
                    value={item.quantity}
                    readOnly
                  />
                </InputGroup>

                <Button
                  variant="outline-secondary"
                  className="quantity-button"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </Button>
              </div>

              <div className="d-flex align-items-center justify-content-center p-2">
                <Button
                  variant="danger"
                  className="h-25"
                  onClick={() => removeFromCart(item)}
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
