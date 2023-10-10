// CartItem.js
import React, { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';


const CartItem = ({ item, removeFromCart, addToCart, cartItems, handleEmptyCart, handleCheckoutClick }) => {
  const [selectedSize, setSelectedSize] = useState('none');
  const [selectedColor, setSelectedColor] = useState('none');

  

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);
  };

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={3}>
            <img
              src={item.url}
              alt={item.name}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Col>
          <Col md={5}>
            <h6>{item.name}</h6>
            <p>Price: ₱{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <div className="d-flex mb-3">
              <Form.Group controlId={`sizeSelect_${item.id}`} style={{ width: '25%' }}>
                <Form.Label>Size:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedSize}
                  onChange={handleSizeChange}
                >
                  <option>none</option>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>XLarge</option>
                  {/* Add more size options as needed */}
                </Form.Control>
              </Form.Group>

              <Form.Group
                controlId={`colorSelect_${item.id}`}
                style={{ width: '25%', marginLeft: '20px' }}
              >
                <Form.Label>Color:</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedColor}
                  onChange={handleColorChange}
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
          <Col md={4}>
            <p>Total: ₱{item.price * item.quantity}</p>
            <button
            className="btn btn-danger"
            onClick={() => {
               removeFromCart(item); 

            }}
          >
            <FaTrash className="me-1" />
            Remove
          </button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
