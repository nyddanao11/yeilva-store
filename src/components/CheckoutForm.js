import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, FloatingLabel, Spinner} from 'react-bootstrap';
import axios from 'axios';
import SuccessModal from'./modalCheckout';
import {useNavigate, Link} from'react-router-dom';

const CheckoutForm = ({ cartItems, formattedGrandTotal, cartItem, selectedSize,
  selectedColor}) => {

   const [errorMessage, setErrorMessage] = useState('');
   const [loading, setLoading] = useState(false);
    const [checkoutData, setCheckoutData] = useState('');

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
  total: formattedGrandTotal,

});


  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for form submission


   const [showModal, setShowModal] = useState(false); //

 const [selectedPayment, setSelectedPayment] = useState('Cash on Delivery');

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
 
const cleanProductName = (productName) => {
    return productName.replace(/[{}"]/g, '').trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

 const cleanedProductNames = cartItems.map((item) => cleanProductName(item.name));
     
    // Calculate the "name" field by mapping cart items to a formatted string
    const itemName = cartItems.map((item) => `
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
      total: formattedGrandTotal,
      paymentOption: selectedPayment,
      productNames: cleanedProductNames, // Pass product names as a separate array
    };

    // Check if the selected payment option is 'Installment'
    if (selectedPayment === 'Installment') {
      try {
        setIsSubmitting(true); // Disable the form submission

        // Make the Axios request to the 'installmentuser' endpoint
        const response = await axios.post('https://yeilva-store-server.up.railway.app/installmentusers', formData);
        console.log(response.data);


        setShowModal(true);
      } catch (error) {
  console.error('Error submitting installment order:', error);
  setErrorMessage('There was an error submitting your installment order. Please make sure you dont have a pending installment and your total purchases is equal to or above ₱500.');
}

    } else {
      // Make the Axios request to the 'checkout' endpoint for other payment options
      try {
        setIsSubmitting(true); // Disable the form submission

        const response = await axios.post('https://yeilva-store-server.up.railway.app/checkout', formData);
        console.log(response.data);

        setShowModal(true);
      } catch (error) {
        console.error('Error submitting order:', error);
      } finally {
      setLoading(false);
     }
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

  const fetchCheckoutData = async (email, setCheckoutData)  => {
  if (!email) {
    console.error('Email is undefined');
    return;
  }

  try {
    const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/checkoutdata?email=${encodeURIComponent(email)}`);
    const user = response.data;
   setCheckoutData(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


useEffect(() => {
  const storedUserEmail = localStorage.getItem('email');
  if (storedUserEmail) {
    fetchCheckoutData(storedUserEmail.replace(/"/g, ''), setCheckoutData);
  } else {
    console.log('Email is missing in local storage');
  }
}, []);


  return (    
     <Row className='d-flex  justify-content-center align-items-center' >
     
      <Col xs={12} md={8} style={{border:'1px #d3d4d5 solid', background:'white', borderRadius:'10px', padding:'20px'}}>

        {/* Checkout Information and List of Items */}
       <Form onSubmit={handleSubmit}>

  <FloatingLabel controlId="formBasicFirstName" label="First name" style={{marginBottom:'10px'}}>
    <Form.Control
      type="text"
      placeholder="Your First name"
      value={userData.firstname || ''}
      onChange={handleUserChange}
      readOnly
    />
  </FloatingLabel>

  <FloatingLabel controlId="formBasicLastName" label="Last name" style={{marginBottom:'10px'}}>
    <Form.Control
      type="text"
      placeholder="Your Last name"
      value={userData.lastname || ''}
      onChange={handleUserChange}
      readOnly
    />
  </FloatingLabel>

  <FloatingLabel controlId="formBasicEmail" label="Email address" style={{marginBottom:'10px'}}>
    <Form.Control
      type="email"
      placeholder="Your FloatingLabelEmail"
      value={userData.email || ''}
      onChange={handleUserChange}
      readOnly
    />
  </FloatingLabel>

  <FloatingLabel controlId="address" label="Address & Landmark" style={{marginBottom:'10px'}}>
    <Form.Control
      as="textarea" rows={3}
      name="address"
      value={checkoutData.address}
      onChange={handleUserChange}
      required
    />
  </FloatingLabel>

  <FloatingLabel controlId="province" label="Province" style={{marginBottom:'10px'}}>
    <Form.Control
      type="text"
      name="province"
      value={checkoutData.province}
      onChange={handleUserChange}
      required
    />
  </FloatingLabel>

  <FloatingLabel controlId="phone" label="Phone" style={{marginBottom:'10px'}}>
    <Form.Control
      type="text"
      name="phone"
      value={checkoutData.phone}
      onChange={handleUserChange}
      required
    />
  </FloatingLabel>

  <FloatingLabel controlId="quantity" label="Quantity" style={{ width: '150px' }}>
    <Form.Control
      type="text"
      name="quantity"
      value={formData.quantity}
      onChange={handleFormChange}
      required
    />
  </FloatingLabel>

 <div style={{ border: '1px #d3d4d5 solid', background: 'white', borderRadius: '10px', margin: '15px', padding:'0px 15px'}}>
  <h5 className='mt-1'>Items in Cart:</h5>
  <ul style={{padding:'5px'}}>
    {cartItems.map((item) => (
      <div key={item.id} style={{marginBottom:"10px", padding:'5px 10px', border:'1px #d3d4d5 solid ', borderRadius: '5px'}} className='d-flex justify-content-center align-items-center'>
      <div >
        <img src={item.url} alt={item.name} width="100px" height="100px" />
     </div>
        <div style={{padding:'0px 3px', display:'flex', flexDirection:'column'}}>
        <p style={{ fontSize: '15px' }}>
          {item.name} - ₱{item.price} x {item.quantity}
        </p>

        {item.selectedSize && ( // Conditionally render if selectedSize has a value
          <Form.Group controlId={`sizeSelect-${item.id}`} >
            <Form.Label>Selected Size:</Form.Label>
            <Form.Control type="text" value={item.selectedSize} readOnly style={{width:'70px'}}/>
          </Form.Group>
        )}

        {item.selectedColor && ( // Conditionally render if selectedColor has a value
           <Form.Group controlId={`colorSelect-${item.id}`} >
            <Form.Label>Selected Color:</Form.Label>
            <Form.Control type="text" value={item.selectedColor} readOnly style={{width:'70px'}}/>
          </Form.Group>
         
        )}

        </div>
     
      </div>
       
    ))}

  </ul>


    <Button variant="primary" onClick={handleBackToCart} className="mb-2 " style={{ width: '100%', marginTop:'15px', padding:'0px 10px'}}>
            Back to Cart
    </Button>
</div>


          {showModal && (
            <SuccessModal show={showModal} onClose={handleCloseModal} handleClose={handleCloseModal} />
          )}
    
    
      {/* Payment Options */}
      <div className="mx-3 " style={{border:'1px #d3d4d5 solid', background:'white', borderRadius:'10px', padding:'20px'}}>
        <h3>Payment Options</h3>
       <FloatingLabel controlId="paymentMethod"  >
           
            <div>
              <Form.Check
                type="radio"
                label="E-wallet/bank transfer"
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

               <Form.Check
                type="radio"
                label="Installment (purchases above ₱500)"
                name="paymentMethod"
                value="Installment"
                onChange={(e) => handleEwalletsClick(e, 'Installment')}
                checked={selectedPayment === 'Installment'} // Add checked prop
              />
            </div>
          </FloatingLabel>

          {selectedPayment === 'E-wallets banks' && (
            <Button
              variant="primary"
              onClick={handleEwalletsClick}
              style={{ marginTop: "15px", marginBottom: "10px", marginRight: "15px" }}
            >
               <Link to='/epayment' style={{textDecoration:'none', color:'white'}}>Proceed to Payment</Link>
            </Button>
          )}

            {selectedPayment === 'Installment' && (
            <Button
              variant="primary"
              onClick={handleEwalletsClick}
              style={{ marginTop: "15px", marginBottom: "10px", marginRight: "15px" }}
            >
               <Link to='/installmentterms' style={{textDecoration:'none', color:'white'}}>Terms & Conditions</Link>
            </Button>
          )}


          {errorMessage && selectedPayment === 'Installment' && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              {errorMessage}
            </div>
          )}


        

             <h5 style={{color:'black', marginBottom:'15px', marginTop:'15px'}}>Total Price: {formattedGrandTotal}</h5>
         <Button variant="danger" type="submit" className="mb-2 mt-2"  disabled={loading} style={{ width: '100%' }}>
           {loading ? <Spinner animation="border" size="sm" className="me-2" /> : 'Place Order'} 
          </Button>

        </div>
        
       </Form>
      
    </Col>
     
    </Row>
  );

};

export default CheckoutForm;