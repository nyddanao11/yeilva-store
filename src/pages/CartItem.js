import React, { useState } from 'react';
import { Card, Row, Col, Form, Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive';
import { useCart } from './CartContext'; // Correct path to your context

export default function CartItem ({ item})  {
 const {removeFromCart} = useCart();
const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });

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
    <>
    <Card className=" mb-3">
      <Card.Body>
        <Row  className="d-flex justify-content-center ">
          <Col lg={6} md={6} xs={4} className="mb-3 d-flex justify-content-center align-items-center ">

          {isSmallScreen ? (
              <img
                src={item.url}
                alt={item.name}
                style={{ maxWidth: '100px', height: 'auto' }}
              />
            ) : ( <img
                src={item.url}
                alt={item.name}
                style={{ maxWidth: '50%', height: 'auto' }}
              />)}
        </Col>

          <Col lg={6} md={6} xs={8} className="mb-3 ">
            <h5> {item.name}</h5>
            <h6>₱{item.price}</h6>
            <p>Quantity: {item.quantity}</p>

         {item.sizecolor && (
            <div className="mb-3" style={{display:'flex', flexWrap:'wrap'}}>
              <Form.Group controlId={`sizeSelect_${item.id}`} style={{ width: '70px' }}>
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
                style={{ width: '70px', marginLeft: '15px' }}
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
            )}

         <div className='d-flex' style={{marginTop:"20px"}}>
            <h6 style={{marginTop:'7px'}}>Total: ₱{item.price * item.quantity}</h6>
           
            </div>
            
          </Col>
        </Row>
      </Card.Body>
    </Card>
  </>
  );
};


