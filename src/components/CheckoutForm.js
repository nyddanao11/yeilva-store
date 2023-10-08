import React, { useState } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import SuccessModal from'./modalCheckout';
import {useNavigate} from'react-router-dom';

const CheckoutForm = ({ cartItems, grandTotal, cartItem }) => {
 const [formData, setFormData] = useState({
  address: '',
  province: '',
  phone: '',
  email: '',
  creditCard: '',
  name: '', // Add the 'name' field
  quantity: cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0),
  total: grandTotal,
});


  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for form submission

  const [showSuccessModal, setShowSuccessModal] = useState(false);
   const [showModal, setShowModal] = useState(false); //


  const navigate = useNavigate(); // Get the navigate function

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    navigate('/'); // Redirect to the homepage using navigate
  };
  
  const handleBackToCart = () => {
    // Navigate back to the cart page or any other desired location
    navigate('/cart'); // Change the path accordingly
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'quantity' ? parseInt(value, 10) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }
     if (cartItems.length === 0) {
    console.error('Cart is empty. Cannot submit order.');
    return; // Prevent form submission
  }

  // Calculate the "name" field by mapping cart items to a formatted string
  const name = cartItems.map((item) => `${item.name} - ₱${item.price} `).join(', ');

    try {
    setIsSubmitting(true); // Disable the form submission

    const response = await axios.post('http://localhost:3001/checkout', {
      ...formData,
      name, // Include the calculated "name" field
    });
    console.log(response.data);

    setShowModal(true);
    

    // Optionally, you can redirect the user to a success page
    // history.push('/success'); // Use React Router for this
  } catch (error) {
    console.error('Error submitting order:', error);
  }
};



  return (    
     <Row>
      <Col xs={12} md={6}>
        {/* Checkout Information and List of Items */}
       <Form onSubmit={handleSubmit}>
      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="province">
        <Form.Label>Province</Form.Label>
        <Form.Control
          type="text"
          name="province"
          value={formData.province}
          onChange={handleChange}
          required
        />
    
      </Form.Group>
      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
         </Form.Group>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </Form.Group>
      <Form.Group controlId="creditCard">
        <Form.Label>Credit Card</Form.Label>
        <Form.Control
          type="text"
          name="creditCard"
          value={formData.creditCard}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="quantity">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
      </Form.Group>

          <p>Items in Cart:</p>
          <ul>
            {cartItems.map((item) => (
              <div key={item.id}>
                <img src={item.url} alt={item.name} width="100" height="100" />
                <p>
                  {item.name} - ₱{item.price} x {item.quantity}
                </p>
                <p> {item.size} {item.color}</p>
              </div>
            ))}
          </ul>
          <p>Total Price: ₱{grandTotal}</p>

          <Button variant="primary" type="submit" className="mb-2 mt-2" style={{ width: '100%' }}>
            Submit Order
          </Button>

          {showModal && (
            <SuccessModal show={showModal} onClose={handleCloseModal} handleClose={handleCloseModal} />
          )}
        </Form>
      </Col>
         <Col xs={12} md={6}>
      {/* Payment Options */}
      <div>
        <h3>Payment Options</h3>
        <div>
          <h4>GCash</h4>
          <Form.Group controlId="gcashNumber">
            <Form.Label>GCash Number</Form.Label>
            <Form.Control
              type="text"
              name="gcashNumber"
              value={formData.gcashNumber}
              onChange={handleChange}
              placeholder="Enter your GCash number"
              required
            />
          </Form.Group>
          {/* Add more GCash payment instructions or fields as needed */}
        </div>
        <div>
          <h4>Bank Transfer</h4>
          <Form.Group controlId="bankAccountNumber">
            <Form.Label>Bank Account Number</Form.Label>
            <Form.Control
              type="text"
              name="bankAccountNumber"
              value={formData.bankAccountNumber}
              onChange={handleChange}
              placeholder="Enter your bank account number"
              required
            />
          </Form.Group>
          {/* Add more bank transfer payment instructions or fields as needed */}
        </div>
        <Button variant="primary" onClick={handleBackToCart} className="mb-2 mt-2" style={{ width: '100%' }}>
        Back to Cart
      </Button>
      </div>
    </Col>
    </Row>
  );
};

export default CheckoutForm;