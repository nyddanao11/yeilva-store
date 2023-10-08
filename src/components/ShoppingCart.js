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

  const [selectedSize, setSelectedSize] = useState('none');
  const [selectedColor, setSelectedColor] = useState('none');

   const handleSizeChangeInCart = (event, cartItem) => {
    const newSize = event.target.value;
    setSelectedSize(newSize); // Update the selected size

    const updatedCartItem = {
      ...cartItem,
      size: newSize,
    };
   
    addToCart(updatedCartItem); // Pass the updated cart item to addToCart
  };

  const handleColorChangeInCart = (event, cartItem) => {
    const newColor = event.target.value;
    setSelectedColor(newColor); // Update the selected color

    const updatedCartItem = {
      ...cartItem,
      color: newColor,
    };
   
    addToCart(updatedCartItem); // Pass the updated cart item to addToCart
  };

  

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

                      <div className='d-flex ' >
                      {/* Display size and color options as dropdowns */}
                      <Form.Group controlId="sizeSelect" style={{ width: '25%' }}>
                        <Form.Label>Size:</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedSize} // Use the selectedSize prop
                          onChange={(e) => handleSizeChangeInCart(e, cartItem)}
                        >
                          <option>none</option>
                          <option>Small</option>
                          <option>Medium</option>
                          <option>Large</option>
                          <option>XLarge</option>
                          {/* Add more size options as needed */}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group controlId="colorSelect" style={{ width: '25%', marginLeft: '20px' }}>
                        <Form.Label>Color:</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedColor} // Use the selectedColor prop
                          onChange={(e) => handleColorChangeInCart(e, cartItem)}
                        >
                          <option>none</option>
                          <option>white</option>
                          <option>Red</option>
                          <option>Blue</option>
                          <option>Green</option>
                          <option>Yellow</option>
                          <option>gray</option>
                          <option>Black</option>
                          {/* Add more color options as needed */}
                        </Form.Control>
                      </Form.Group>
                    </div>
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




