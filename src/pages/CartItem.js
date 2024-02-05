import React, { useState } from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const CartItem = ({ item, removeFromCart }) => {
  const [selectedSize, setSelectedSize] = useState('none');
  const [selectedColor, setSelectedColor] = useState('none');

  const handleSizeChange = (event) => {
    const newSize = event.target.value;
    setSelectedSize(newSize);

    // Update the selected size in the item
    item.selectedSize = newSize;

    // You might need to update the item in the cart as well if it's part of a cart state
    // e.g., cartItems[index] = item;
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setSelectedColor(newColor);

    // Update the selected color in the item
    item.selectedColor = newColor;

    // You might need to update the item in the cart as well if it's part of a cart state
    // e.g., cartItems[index] = item;
  };

  return (
    <Card className="mb-3">
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
                  <option value="none">none</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="XLarge">XLarge</option>
                  <option value="XXLarge">XXLarge</option>
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
                  <option value="none">none</option>
                  <option value="white">White</option>
                  <option value="Red">Red</option>
                  <option value="Blue">Blue</option>
                  <option value="Green">Green</option>
                  <option value="Yellow">Yellow</option>
                  <option value="gray">Gray</option>
                  <option value="Black">Black</option>
                  <option value="Pink">Pink</option>
                </Form.Control>
              </Form.Group>
            </div>
          </Col>
          <Col md={4}>
            <p>Total: ₱{item.price * item.quantity}</p>
            <button
                className="btn btn-success"
              onClick={() => {
                removeFromCart(item.id);
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
