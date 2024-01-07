import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col} from 'react-bootstrap';
import axios from 'axios';
import SuccessModal from'./modalCheckout';
import {useNavigate} from'react-router-dom';

const CheckoutForm = ({ cartItems, grandTotal, cartItem, selectedSize,
  selectedColor}) => {

const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    address: '',
    province: '',
    phone: '',
    name:'',
  });


 const [formData, setFormData] = useState({
  name: '', // Add the 'name' field
  quantity: cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0),
  total: grandTotal,

});


  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for form submission


   const [showModal, setShowModal] = useState(false); //

    const [selectedPayment, setSelectedPayment] = useState(''); // State to manage selected payment method

  const handleEwalletsClick = (e) => {
    setSelectedPayment(e.target.value); // Update the selected payment method
  };

  const navigate = useNavigate(); // Get the navigate function

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    navigate('/'); // Redirect to the homepage using navigate
  };
  
  const handleBackToCart = () => {
    // Navigate back to the cart page or any other desired location
    navigate('/cart'); // Change the path accordingly
  };

 
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'quantity' ? parseInt(value, 10) : value;
    setFormData({ ...formData, [name]: parsedValue });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate the "name" field by mapping cart items to a formatted string
  const itemName =  cartItems.map((item) => `
    <div>
    <p>Item: ${item.name}</p>
    <p>Price: ₱${item.price}</p>
    <p>Quantity: ${item.quantity}</p>
    <p>Selected Size: ${item.selectedSize}</p>
    <p>Selected Color: ${item.selectedColor}</p>
    <img src="${item.url}" alt="${item.name}" width="100" height="100" />
    </div>
  `).join('<br>');

    const formData = {
      ...userData,
      name: itemName,
      quantity: cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0),
      total: grandTotal,
      paymentOption: selectedPayment,
  
    };

    // Prevent multiple submissions
    if (isSubmitting) {
      return;
    }
     if (cartItems.length === 0) {
    console.error('Cart is empty. Cannot submit order.');
    return; // Prevent form submission
  }

    try {
    setIsSubmitting(true); // Disable the form submission

   const response = await axios.post('https://yeilva-store-server.up.railway.app/checkout', formData);
    console.log(response.data);

    setShowModal(true);
    
    // Optionally, you can redirect the user to a success page
    // history.push('/success'); // Use React Router for this
  } catch (error) {
    console.error('Error submitting order:', error);
  }
};

 const fetchUserData = async (email, setUserData)  => {
  if (!email) {
    console.error('Email is undefined');
    return;
  }

  try {
    const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/user?email=${encodeURIComponent(email)}`);
    const user = response.data;
    setUserData(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

// In MyAccountPage component
useEffect(() => {
  const storedUserEmail = localStorage.getItem('email');
  if (storedUserEmail) {
    fetchUserData(storedUserEmail.replace(/"/g, ''), setUserData);
  } else {
    console.log('Email is missing in local storage');
  }
}, []);




  return (    
     <Row className='d-flex flex-column justify-content-center align-items-center' >
     
      <Col xs={12} md={6} style={{border:'1px #d3d4d5 solid', background:'white', borderRadius:'10px', padding:'20px'}}>

        {/* Checkout Information and List of Items */}
       <Form onSubmit={handleSubmit}>

        <Form.Group controlId="formBasicFirstName">
        <Form.Label>First name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your First name"
          value={userData.firstname || ''} // Ensure userData.firstname is initialized or use an empty string
          onChange={handleUserChange}
          readOnly
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your Last name"
          value={userData.lastname || ''}
          onChange={handleUserChange}
          readOnly
          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
          <Form.Control
          type="email"
          placeholder="Your Email"
          value={userData.email || ''}
          onChange={handleUserChange}
          readOnly
          />
       </Form.Group>

      <Form.Group controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          name="address"
          value={userData.address}
        onChange={handleUserChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="province">
        <Form.Label>Province</Form.Label>
        <Form.Control
          type="text"
          name="province"
          value={userData.province}
         onChange={handleUserChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="phone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          name="phone"
          value={userData.phone}
          onChange={handleUserChange}
          required
        />
         </Form.Group>
    
      <Form.Group controlId="quantity" style={{width:'150px'}}>
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleFormChange}
          required
        />
      </Form.Group>

       <div  style={{border:'1px #d3d4d5 solid', background:'white', 
          borderRadius:'10px', margin:'15px', padding:'10px'}}>  
         <p className='mt-3 ' style={{fontSize:'20px'}}>Items in Cart:</p>
        <ul >
          {cartItems.map((item) => (
            <div key={item.id}>
              <img src={item.url} alt={item.name} width="100" height="100" />
              <p className='mt-3'  style={{fontSize:'15px'}}>
                {item.name} - ₱{item.price} x {item.quantity}
              </p>

              <Form.Group controlId={`sizeSelect-${item.id}`} style={{width:'150px'}}>
                <Form.Label >Selected Size:</Form.Label>
                <Form.Control type="text" value={item.selectedSize} readOnly />
              </Form.Group>

              <Form.Group controlId={`colorSelect-${item.id}`} style={{width:'150px'}}>
                <Form.Label >Selected Color:</Form.Label>
                <Form.Control type="text" value={item.selectedColor} readOnly />
              </Form.Group>
            </div>
          ))}
        </ul>
       
         
      </div>


          {showModal && (
            <SuccessModal show={showModal} onClose={handleCloseModal} handleClose={handleCloseModal} />
          )}
    
    
      {/* Payment Options */}
      <div className="mx-3 " style={{border:'1px #d3d4d5 solid', background:'white', borderRadius:'10px', padding:'20px'}}>
        <h3>Payment Options</h3>
       <Form.Group controlId="paymentMethod">
            <Form.Label>Choose Payment Method</Form.Label>
            <div>
              <Form.Check
                type="radio"
                label="E-wallets banks"
                name="paymentMethod"
                value="E-wallets banks"
                onChange={(e) => handleEwalletsClick(e, 'E-wallets banks')}
                checked={selectedPayment === 'E-wallets banks'} // Add checked prop
              />
              <Form.Check
                type="radio"
                label="Cash on Delivery"
                name="paymentMethod"
                value="Cash on Delivery"
                onChange={(e) => handleEwalletsClick(e, 'Cash on Delivery')}
                checked={selectedPayment === 'Cash on Delivery'} // Add checked prop
              />
            </div>
          </Form.Group>

          {selectedPayment === 'E-wallets banks' && (
            <Button
              variant="primary"
              onClick={handleEwalletsClick}
              style={{ marginTop: "15px", marginBottom: "10px", marginRight: "15px" }}
            >
              Proceed to Payment
            </Button>
          )}


          <Button variant="primary" onClick={handleBackToCart} className="mb-2 " style={{ width: '150px', marginTop:'15px' }}>
            Back to Cart
          </Button>


             <h5 style={{color:'red', marginBottom:'15px', marginTop:'15px'}}>Total Price: ₱{grandTotal}</h5>
          <Button variant="danger" type="submit" className="mb-2 mt-2" style={{ width: '100%' }}>
           Place Order
          </Button>

        </div>
        
       </Form>
      
    </Col>
     
    </Row>
  );

};

export default CheckoutForm;