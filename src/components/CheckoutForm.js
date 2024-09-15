import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, FloatingLabel, Spinner} from 'react-bootstrap';
import axios from 'axios';
import SuccessModal from'./modalCheckout';
import {useNavigate, Link, useLocation} from'react-router-dom';

const CheckoutForm = ({ cartItems, formattedGrandTotal, cartItem, selectedSize,
  selectedColor, ewalletStatus}) => {

  const location = useLocation(); // Get the state from navigation
  const passedEwalletStatus = location.state?.ewalletStatus || false; // Get ewalletStatus from location state


   const [errorMessage, setErrorMessage] = useState('');
   const [loading, setLoading] = useState(false);
    const [checkoutData, setCheckoutData] = useState('');
   const [image, setImage] = useState(null);
 
const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    name:'',
  });

 const [formData, setFormData] = useState({
  name: '', // Add the 'name' field
  quantity: cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0),
  total: formattedGrandTotal,

});
 const [cashOnDelivery, setCashOnDelivery] = useState({
  name: '', // Add the 'name' field
  quantity: cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0),
  total: formattedGrandTotal,
});

  const [isSubmitting, setIsSubmitting] = useState(false); // Add state for form submission


   const [showModal, setShowModal] = useState(false); //

 const [selectedPayment, setSelectedPayment] = useState('Cash on Delivery');

 const [paymentErrors, setPaymentErrors] = useState({
  ewallets: '',
  installment: '',
  cashOnDelivery: '',
});

 // Update handleEwalletsClick to reset error message for the selected payment method
const handleEwalletsClick = (e) => {
  setSelectedPayment(e.target.value); // Update selected payment method
  setPaymentErrors({
    ewallets: '',
    installment: '',
    cashOnDelivery: '',
  }); // Clear error messages when switching payment methods
};


 const handleImageChange = (e) => {
  const file = e.target.files[0];
  if (file && file.size > 5 * 1024 * 1024) {
    // Set specific error for installment
    setPaymentErrors((prevErrors) => ({
      ...prevErrors,
      installment: 'The file size should not exceed 5MB.',
    }));
    setImage(null); // Reset image
  } else {
    setImage(file);
    setPaymentErrors((prevErrors) => ({
      ...prevErrors,
      installment: '', // Clear error message
    }));
  }
}


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

  // Set loading to true when submitting
  setLoading(true);

  // Clean the product names for server submission
  const cleanedProductNames = cartItems.map((item) => cleanProductName(item.name));

  // Generate a string for cart item details (for display purposes)
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

  // Prepare the form data
  const formData = new FormData();
  formData.append('firstname', userData.firstname);
  formData.append('lastname', userData.lastname);
  formData.append('email', userData.email);
  formData.append('address', checkoutData.address);
  formData.append('province', checkoutData.province);
  formData.append('phone', checkoutData.phone);
  formData.append('name', itemName);  // HTML formatted cart items
  formData.append('quantity', cartItems.reduce((acc, item) => acc + item.quantity, 0));
  formData.append('total', formattedGrandTotal);
  formData.append('paymentOption', selectedPayment);

  // For non-FormData submissions, create a JSON payload (e.g., for Cash on Delivery)
  const cashOnDelivery = {
    ...userData,
    ...checkoutData,
    name: itemName,
    quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
    total: formattedGrandTotal,
    paymentOption: selectedPayment,
    productNames: cleanedProductNames,  // Cleaned product names array
  };

  try {
    // Handle installment payment logic
    if (selectedPayment === 'Installment') {
      formData.append('installmentImage', image);

      if (!image) {
         setPaymentErrors((prevErrors) => ({
          ...prevErrors,
          installment: 'Please upload your ID to proceed with the installment payment.',
        }));
        setLoading(false);
        return;
      }

      // Make the request to the installment endpoint
      const response = await axios.post('https://yeilva-store-server.up.railway.app/installmentusers', formData);
      console.log(response.data);
      setShowModal(true);
    } 
    // Handle e-wallet payment
    else if (selectedPayment === 'E-wallets banks') {
        if (!passedEwalletStatus) {
         setPaymentErrors((prevErrors) => ({
          ...prevErrors,
          ewallets: 'Sorry, this Service is not yet Available.',
        }));
          setLoading(false);
        return;
      }

      // E-wallet request using JSON payload
      const response = await axios.post('https://yeilva-store-server.up.railway.app/checkout', cashOnDelivery);
      console.log(response.data);

      setShowModal(true);  // Show success modal
    }
    // Handle other payments
    else {
      // Example: Cash on Delivery or other payment options
      const response = await axios.post('https://yeilva-store-server.up.railway.app/checkout', cashOnDelivery);
      console.log(response.data);

      setShowModal(true);
    }
  } catch (error) {
    console.error('Error submitting order:', error);
    setPaymentErrors((prevErrors) => ({
      ...prevErrors,
      [selectedPayment.toLowerCase()]: 'There was an error submitting your order. Please try again later.',
    }));
  } finally {
    setLoading(false);  // Ensure loading is stopped after the request
    setIsSubmitting(false);  // Enable form submission again
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
    console.log('checkoutdata', user);
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
     <Row className='d-flex justify-content-center align-items-center' >
     
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
              <>
                <Button variant="primary" style={{ marginTop: '15px' }}>
                  <Link to="/epayment" style={{ textDecoration: 'none', color: 'white' }}>
                    Proceed to Payment
                  </Link>
                </Button>
               {paymentErrors.ewallets && (
                  <div style={{ color: 'red', marginTop: '10px' }}>{paymentErrors.ewallets}</div>
                 )}
              </>
            )}


        {selectedPayment === 'Installment' && (
            <>
              <Form.Group controlId="formImage" style={{ marginTop: '20px', marginBottom: '15px' }} action="/installmentusers" method="post" enctype="multipart/form-data">
                <FloatingLabel controlId="floatingImage" label="Upload ID">
                  <Form.Control type="file" accept="image/*"  onChange={handleImageChange} />
                </FloatingLabel>
              </Form.Group>
             {paymentErrors.installment && (
              <div style={{ color: 'red', marginTop: '10px', marginBottom: '10px' }}>
                {paymentErrors.installment}
              </div>
            )}
              <Button variant="primary" onClick={handleEwalletsClick} style={{ marginBottom: '10px', marginRight: '15px' }}>
                <Link to="/installmentterms" style={{ textDecoration: 'none', color: 'white' }}>
                  Terms & Conditions
                </Link>
              </Button>
            </>
          )}

          <h5 style={{ color: 'black', marginBottom: '15px', marginTop: '15px' }}>Total Price: {formattedGrandTotal}</h5>
          <Button variant="danger" type="submit" className="mb-2 mt-2" disabled={loading} style={{ width: '100%' }}>
            {loading ? <Spinner animation="border" size="sm" className="me-2" /> : 'Place Order'}
          </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default CheckoutForm;