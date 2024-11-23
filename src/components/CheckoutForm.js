import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, FloatingLabel, Spinner} from 'react-bootstrap';
import axios from 'axios';
import SuccessModal from'./modalCheckout';
import {useNavigate, Link, useLocation} from'react-router-dom';

const CheckoutForm = ({ cartItems, formattedGrandTotal, cartItem, selectedSize,
  selectedColor, ewalletStatus}) => {

   const location = useLocation();
  const passedEwalletStatus = location.state?.ewalletStatus || ewalletStatus || false; // use either location state or prop
  

   const [errorMessage, setErrorMessage] = useState('');
   const [loading, setLoading] = useState(false);
    const [checkoutData, setCheckoutData] = useState('');
   const [image, setImage] = useState(null);
    const [installmentChoice, setInstallmentChoice] = useState(null); // Track installment choice
 
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
  const [isPaymentDisabled, setIsPaymentDisabled] = useState({
    cod: false,
    installment: false,
  });

// Automatically select GCash and disable other options if `passedEwalletStatus` is true
  useEffect(() => {
    if (passedEwalletStatus) {
      setSelectedPayment('E-wallets banks');
      setIsPaymentDisabled({
        cod: true,
        installment: true,
      });
    } else {
      setIsPaymentDisabled({
        cod: false,
        installment: false,
      });
    }
  }, [passedEwalletStatus]);

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

 // Utility to parse numeric value from formatted currency string
  const parseCurrency = (formattedCurrency) => {
    if (!formattedCurrency) return 0; // Default to 0 if null or undefined
    const numericValue = formattedCurrency.replace(/[^\d.-]/g, ''); // Remove non-numeric characters
    return parseFloat(numericValue); // Convert to number
  };

  // Calculate installment amounts
  const calculateInstallment = (formattedGrandTotal, months) => {
    const total = parseCurrency(formattedGrandTotal); // Extract numeric value
    return ((total + total * 0.10) / months).toFixed(2); // Perform calculation
  };

  const grandTotalToString = (formattedGrandTotal) => {
    const total = parseCurrency(formattedGrandTotal); // Extract numeric value
    return total.toFixed(2); // Return as a string with 2 decimal places
  };

  const isButtonDisabled = loading || grandTotalToString(formattedGrandTotal) === '0.00';


  const navigate = useNavigate(); // Get the navigate function

   const handleEwalletsNavigation = () => { 
       navigate('/gcashpayment'); 
  };

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

  setLoading(true); // Start loading spinner

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

  // Prepare form data
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

  // For non-FormData submissions, create a JSON payload
  const cashOnDelivery = {
    ...userData,
    ...checkoutData,
    name: itemName,
    quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
    total: formattedGrandTotal,
    paymentOption: selectedPayment,
    productNames: cleanedProductNames, // Cleaned product names array
  };

  try {
    // Validate Installment payment
    if (
      selectedPayment === 'Installment' &&
      (!installmentChoice || !installmentChoice.plan || !installmentChoice.amount)
    ) {
      setPaymentErrors((prevErrors) => ({
        ...prevErrors,
        installment: 'Please select an installment plan.',
      }));
      setLoading(false);
      return;
    }

    if (selectedPayment === 'Installment') {
      if (!image) {
        setPaymentErrors((prevErrors) => ({
          ...prevErrors,
          installment: 'Please upload your ID to proceed with the installment payment.',
        }));
        setLoading(false);
        return;
      }

      // Append installment-specific fields
      formData.append('installmentPlan', installmentChoice.plan);
      formData.append('installmentAmount', installmentChoice.amount);
      formData.append('installmentImage', image);

      // Send Installment request
      const response = await axios.post('https://yeilva-store-server.up.railway.app/installmentusers', formData);
      console.log(response.data);
      setShowModal(true);
      return; // End after successful Installment submission
    }

    // Validate E-wallet payment
    if (selectedPayment === 'E-wallets banks') {
      if (!passedEwalletStatus) {
        setPaymentErrors((prevErrors) => ({
          ...prevErrors,
          ewallets: 'Sorry, this Service is not yet Available.',
        }));
        setLoading(false);
        return;
      }

      // Send E-wallet request
      const response = await axios.post('https://yeilva-store-server.up.railway.app/checkout', cashOnDelivery);
      console.log(response.data);
      setShowModal(true);
      return; // End after successful E-wallet submission
    }

    // Default case for other payments (e.g., Cash on Delivery)
    const response = await axios.post('https://yeilva-store-server.up.railway.app/checkout', cashOnDelivery);
    console.log(response.data);
    setShowModal(true);
  } catch (error) {
    console.error('Error submitting order:', error);
    setPaymentErrors((prevErrors) => ({
      ...prevErrors,
      [selectedPayment.toLowerCase()]: 'There was an error submitting your order. Please try again later.',
    }));
  } finally {
    setLoading(false); // Stop loading spinner
    setIsSubmitting(false); // Re-enable form submission
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
     <Row className='d-flex justify-content-center align-items-center ' >
       <div className="d-flex justify-content-center aligned-items-center">
            <h4 className="text-center mb-2" style={{ padding: '10px', marginBottom: '15px' }}>
              Checkout/Shipping Details
            </h4>
           </div>
     
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
                label="GCash"
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
                disabled={isPaymentDisabled.cod}
              />

               <Form.Check
                type="radio"
                label="Installment (purchases above ₱500)"
                name="paymentMethod"
                value="Installment"
                onChange={(e) => handleEwalletsClick(e, 'Installment')}
                checked={selectedPayment === 'Installment'} // Add checked prop
                 disabled={isPaymentDisabled.installment}
              />
            </div>
          </FloatingLabel>

         {selectedPayment === 'E-wallets banks' && (
              <>
              <Button variant={ passedEwalletStatus? "success":"primary"} onClick={handleEwalletsNavigation} disabled={ passedEwalletStatus} style={{marginTop:'10px'}}>
                { passedEwalletStatus ? 'You can now Place your Order' : 'Proceed to GCash Payment'}
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

             <div className="d-flex justify-content-center align-items-center mt-4 mb-3">
            <p>Select a Plan:</p>
             <Button
                variant={installmentChoice?.plan === 2 ? "success" : "outline-secondary"}
                className="btn-sm"
                onClick={() => setInstallmentChoice({ plan: 2, amount: calculateInstallment(formattedGrandTotal, 2) })}
                style={{margin:"0 15px"}}
              >
                2mth x ₱{calculateInstallment(formattedGrandTotal, 2)} {installmentChoice?.plan === 2 && " ✓ "}
              </Button>

              <Button
                variant={installmentChoice?.plan === 3 ? "success" : "outline-secondary"} // Highlight button based on selected plan
                className="btn-sm"
                onClick={() => setInstallmentChoice({ plan: 3, amount: calculateInstallment(formattedGrandTotal, 3) })} // Store plan and amount
              >
                3mth x ₱{calculateInstallment(formattedGrandTotal, 3)} {installmentChoice?.plan === 3 && " ✓ "}
              </Button>

            </div>



             {paymentErrors.installment && (
              <div style={{ color: 'red', marginTop: '10px', marginBottom: '10px' }}>
                {paymentErrors.installment}
              </div>
            )}
               <Link to="/installmentterms" style={{  marginBottom: '10px', marginRight: '15px'  }}>
                  Terms & Conditions
                </Link>
            </>
          )}

          <h5 style={{ color: 'black', marginBottom: '15px', marginTop: '15px' }}>Total Price: {formattedGrandTotal}</h5>
          <Button variant="danger" type="submit" className="mb-2 mt-2" disabled={isButtonDisabled } style={{ width: '100%' }}>
            {loading ? <Spinner animation="border" size="sm" className="me-2" /> : 'Place Order'}
          </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
};

export default CheckoutForm;