import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, FloatingLabel, Spinner} from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import SuccessModal from'./modalCheckout';
import {useNavigate, Link, useLocation} from'react-router-dom';
import CameraCapture from'./CameraCapture';
import { useCart } from '../pages/CartContext'; // Correct path to your context
import { fetchUserData } from '../components/userService';


export default function CheckoutForm  ({ ewalletStatus, capturedImage}) {
 const {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    handleIncrement,
    handleDecrement,
    formattedGrandTotal,
    checkoutItemsForPayment,
    setCheckoutItemsForPayment, // This is key for passing selected items to checkout
     clearPurchasedItems,
  } = useCart();
   const location = useLocation();
  const passedEwalletStatus = location.state?.ewalletStatus || ewalletStatus || false; // use either location state or prop
   const itemsToDisplay =  checkoutItemsForPayment || []; // Ensure it's an array to avoid .length errors
  
   const [loading, setLoading] = useState(false);
    const [checkoutData, setCheckoutData] = useState('');
   const [image, setImage] = useState(null);
    const [installmentChoice, setInstallmentChoice] = useState(null); // Track installment choice
    const [selfieImage, setSelfieImage] = useState(null); // Store captured selfie
     // const [submittedOrderId, setSubmittedOrderId] = useState(null); // State to hold the orderId

  // ... (other states like loading, error, etc.)
 
 const [userData, setUserData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        joineddate: '',
        delivery_addresses: [], // Initialize as empty array
    });
    const [selectedAddressId, setSelectedAddressId] = useState(null); // State to hold the ID of the selected address
    const [selectedAddressDetails, setSelectedAddressDetails] = useState(null); // State to hold the details of the selected address

 const [formData, setFormData] = useState({
  name: '', // Add the 'name' field
  quantity: itemsToDisplay.reduce((accumulator, item) => accumulator + item.quantity, 0),
  total: formattedGrandTotal,

});



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

  const handleEwalletsNavigation = () => {
    navigate('/gcashpayment'); // GcashPaymentModal will get data from context
  };

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

  // const handleCloseModal = () => {
  //   setShowModal(false); // Close the modal
  //   clearPurchasedItems();
  //   navigate('/'); // Redirect to the homepage using navigate
  // };
  
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

 // Convert selfieImage (data URL) to Blob
  const convertToBlob = async (dataUrl) => {
    const blob = await fetch(dataUrl).then((res) => res.blob());
    return blob;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

   if (!selectedAddressDetails) {
        // You might want to show an error message to the user here
        console.error("No delivery address selected.");
        alert('Please choose an Address before proceeding');
        setLoading(false); // Stop loading if it was started
        return; // Prevent submission
    }
 // console.log("selectedAddressDetails structure:", selectedAddressDetails);
 //    console.log("streetAddress value:", selectedAddressDetails.streetAddress);
 //    console.log("stateProvince value:", selectedAddressDetails.stateProvince);
 //    console.log("phoneNumber value:", selectedAddressDetails.phoneNumber);

    // If you had the incorrect nested access:
  setLoading(true); // Start loading spinner

  // Clean the product names for server submission
  const cleanedProductNames = cartItems.map((item) => cleanProductName(item.name));
   const cleanedProductPrice = cartItems.map((item) => item.price);
 const cleanedProductUrl = cartItems.map((item) => cleanProductName(item.url));
 const cleanedProductWeight = cartItems.map((item) => item.weight);

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
  formData.append('address', selectedAddressDetails.streetAddress);
  formData.append('province', selectedAddressDetails.stateProvince);
  formData.append('phone', selectedAddressDetails.phoneNumber);
  formData.append('city', selectedAddressDetails.city);
  formData.append('postalCode', selectedAddressDetails.postalCode);
  formData.append('fullName', selectedAddressDetails.fullName);
  formData.append('apartmentSuite', selectedAddressDetails.apartmentSuite || '');
  formData.append('name', itemName);  // HTML formatted cart items
  formData.append('quantity', cartItems.reduce((acc, item) => acc + item.quantity, 0));
  formData.append('total', formattedGrandTotal);
  formData.append('paymentOption', selectedPayment);
  
  // For non-FormData submissions, create a JSON payload
  const cashOnDelivery = {
    ...userData,
    ...selectedAddressDetails,
    name: itemName,
    quantity: cartItems.reduce((acc, item) => acc + item.quantity, 0),
    total: formattedGrandTotal,
    paymentOption: selectedPayment,
    productNames: cleanedProductNames, // Cleaned product names array
   productPrice: cleanedProductPrice.length > 0 ? cleanedProductPrice[0] : 0,
    productUrl: cleanedProductUrl,
   productWeight: cleanedProductWeight.length > 0 ? cleanedProductWeight[0] : 0,
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


        if (!selfieImage) {
           setPaymentErrors((prevErrors) => ({
              ...prevErrors,
              installment: 'Please upload your Selfie to proceed with the installment payment.',
            }));
            setLoading(false);
          return;
        }

    // Convert selfieImage to Blob
    let selfieBlob;
    try {
      selfieBlob = await convertToBlob(selfieImage);
    } catch (error) {
      console.error('Failed to convert selfie image to Blob:', error);
      setLoading(false);
      return;
    }
      // Append installment-specific fields
      formData.append('installmentPlan', installmentChoice.plan);
      formData.append('installmentAmount', installmentChoice.amount);
      formData.append('installmentImage', image);
      formData.append('selfie', selfieBlob, 'selfie.png'); // Selfie Image

  // Log FormData keys and values for debugging
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
}


      // Send Installment request
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/installmentusers`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setShowModal(true);
      return; // End after successful Installment submission
    }

    // Validate E-wallet payment
    if (selectedPayment === 'E-wallets banks') {
      if (!passedEwalletStatus) {
        setPaymentErrors((prevErrors) => ({
          ...prevErrors,
          ewallets: 'Sorry, Please proceed to Gcash payment first to submit your Order.',
        }));
        setLoading(false);
        return;
      }

      // Send E-wallet request
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/checkout`, cashOnDelivery);
      console.log(response.data);
      setShowModal(true);
      return; // End after successful E-wallet submission
    }

    // Default case for other payments (e.g., Cash on Delivery)
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/checkout`, cashOnDelivery);
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
  }
};



 const fetchUserData = async (email, setUserData)  => {
  if (!email) {
    console.error('Email is undefined');
    return;
  }

  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user?email=${encodeURIComponent(email)}`);
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


    useEffect(() => {
        const storedUserEmail = localStorage.getItem('email');
        if (storedUserEmail) {
            fetchUserData(storedUserEmail.replace(/"/g, ''))
                .then((user) => {
                    console.log('User data from API:', user);
                    setUserData({
                        ...user,
                        joineddate: user.joineddate || '',
                        delivery_addresses: user.delivery_addresses || [],
                    });
                    setLoading(false);

                    // Set the default address as selected initially, if available
                    if (user.delivery_addresses && user.delivery_addresses.length > 0) {
                        const defaultAddress = user.delivery_addresses.find(addr => addr.isDefault);
                        if (defaultAddress) {
                            setSelectedAddressId(defaultAddress.id);
                            setSelectedAddressDetails(defaultAddress);
                        } else {
                            // If no default, select the first one
                            setSelectedAddressId(user.delivery_addresses[0].id);
                            setSelectedAddressDetails(user.delivery_addresses[0]);
                        }
                    } else {
                        // Crucial: If no addresses, set selectedAddressDetails to null explicitly
                        setSelectedAddressId(null);
                        setSelectedAddressDetails(null);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
                    // Also clear selected address details if fetch fails
                    setSelectedAddressId(null);
                    setSelectedAddressDetails(null);
                });
        } else {
            console.log('Email is missing in local storage');
            setLoading(false);
            setSelectedAddressId(null);
            setSelectedAddressDetails(null);
        }
    }, []);

    const handleAddressSelect = (e) => {
        const addressId = parseInt(e.target.value, 10);
        setSelectedAddressId(addressId);
        // Find the selected address from the userData.delivery_addresses array
        const selected = userData.delivery_addresses.find(addr => addr.id === addressId);
        setSelectedAddressDetails(selected);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </div>
        );
    }


  return (
    <Row className='d-flex justify-content-center align-items-center'>
      <Col xs={12} md={8}>
      
      <div className="text-center mb-4 mt-2">
            {/* Correct way to conditionally render based on a boolean */}
            {passedEwalletStatus && (
                <h2 className="display-6 fw-bold">Checkout & Shipping Details</h2>
            )}
            <p className="text-muted mt-2">Please review your order and provide your shipping information.</p>
        </div>
      
        <div className="p-4 mb-4" style={{ border: '1px #d3d4d5 solid', background: 'white', borderRadius: '10px' }}>
          <Form onSubmit={handleSubmit}>
            {/* User Information - Read Only */}
            <h4 className="mb-3 text-primary">Your Information</h4>
            <Row className="g-3 mb-4">
              <Col md={6}>
                <FloatingLabel controlId="formBasicFirstName" label="First Name">
                  <Form.Control
                    type="text"
                    value={userData.firstname || ''}
                    readOnly
                    disabled
                  />
                </FloatingLabel>
              </Col>
              <Col md={6}>
                <FloatingLabel controlId="formBasicLastName" label="Last Name">
                  <Form.Control
                    type="text"
                    value={userData.lastname || ''}
                    readOnly
                    disabled
                  />
                </FloatingLabel>
              </Col>
              <Col xs={12}>
                <FloatingLabel controlId="formBasicEmail" label="Email Address">
                  <Form.Control
                    type="email"
                    value={userData.email || ''}
                    readOnly
                    disabled
                  />
                </FloatingLabel>
              </Col>
            </Row>

            {/* Shipping Information */}
             <h4 className="mb-3 text-primary">Shipping Information</h4>

            {userData.delivery_addresses.length > 0 ? (
                <>
                    {/* Address Selection Dropdown */}
                    <Form.Group controlId="addressSelect" className="mb-3">
                        <FloatingLabel controlId="floatingAddressSelect" label="Select Delivery Address">
                            <Form.Select
                                value={selectedAddressId || ''} // Use selected address ID
                                onChange={handleAddressSelect}
                            >
                                <option value="">Choose an address...</option>
                                {userData.delivery_addresses.map((address) => (
                                    <option key={address.id} value={address.id}>
                                        {address.fullName} - {address.streetAddress}, {address.city}, {address.stateProvince},{address.phoneNumber}
                                        {address.isDefault && ' (Default)'}
                                    </option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    </Form.Group>

                    {/* Display Selected Address Details */}
                    {selectedAddressDetails ? (
                        <>
                            <p className="fw-bold mt-4 mb-2">Selected Address Details:</p>
                            <div className="border p-3 rounded mb-4 bg-light">
                                <p className="mb-1"><strong>{selectedAddressDetails.fullName}</strong></p>
                                <p className="mb-1">{selectedAddressDetails.streetAddress}
                                    {selectedAddressDetails.apartmentSuite && `, ${selectedAddressDetails.apartmentSuite}`}</p>
                                <p className="mb-1">{selectedAddressDetails.city}, {selectedAddressDetails.stateProvince} {selectedAddressDetails.postalCode}</p>
                                <p className="mb-0">Phone: {selectedAddressDetails.phoneNumber}</p>
                                {selectedAddressDetails.isDefault && <span className="badge bg-info mt-2">Default Address</span>}
                            </div>
                        </>
                    ) : (
                        <p className="text-muted mb-2">Please select a delivery address.</p>
                    )}
                </>
            ) : (
                <p>
                    No delivery addresses found for your account. Please {' '}
                    <a href="/myaccount" target="_blank" rel="noopener noreferrer">add one in your account settings</a>.
                </p>
            )}

            {/* Items in Cart */}
            <h4 className="mb-3 text-primary">Your Order</h4>
            <div className="p-3 mb-4" style={{ border: '1px #d3d4d5 solid', background: '#f9f9f9', borderRadius: '10px' }}>
              {itemsToDisplay.length > 0 ? (
                <ul className="list-unstyled mb-0">
                  {itemsToDisplay.map((item) => (
                    <li key={item.id} className="d-flex align-items-center mb-3 p-2 border rounded bg-white">
                      <img src={item.url} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px', borderRadius: '5px' }} />
                      <div className="flex-grow-1">
                        <p className="fw-bold mb-1">{item.name}</p>
                        <p className="mb-1">₱{item.price} x {item.quantity}</p>
                        {item.selectedSize && <p className="text-muted mb-0">Size: {item.selectedSize}</p>}
                        {item.selectedColor && <p className="text-muted mb-0">Color: {item.selectedColor}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted">Your cart is empty.</p>
              )}
              <Button variant='outline-secondary' onClick={handleBackToCart} className="w-100 mt-3">
                Back to Cart
              </Button>
            </div>

            {/* Payment Options */}
            <h4 className="mb-3 text-primary">Payment Options</h4>
            <div className="p-4 mb-4" style={{ border: '1px #d3d4d5 solid', background: 'white', borderRadius: '10px' }}>
              <Form.Group className="mb-3">
                <Form.Check
                  type="radio"
                  label="GCash (E-wallets/Banks)"
                  name="paymentMethod"
                  id="paymentMethodGcash"
                  value="E-wallets banks"
                  onChange={(e) => handleEwalletsClick(e, 'E-wallets banks')}
                  checked={selectedPayment === 'E-wallets banks'}
                  className="mb-2"
                />
                {selectedPayment === 'E-wallets banks' && (
                  <div className="ms-4 mb-3">
                    <Button
                  variant={passedEwalletStatus ? "success" : "primary"}
                  onClick={handleEwalletsNavigation} // <--- USE THE PROP HERE!
                  disabled={passedEwalletStatus}
                >
                  {passedEwalletStatus ? 'Payment Verified, Proceed to Place Order' : 'Proceed to GCash Payment'}
                </Button>
                    {paymentErrors.ewallets && (
                      <div className="text-danger mt-2">{paymentErrors.ewallets}</div>
                    )}
                  </div>
                )}

                <Form.Check
                  type="radio"
                  label="Cash on Delivery"
                  name="paymentMethod"
                  id="paymentMethodCod"
                  value="Cash on Delivery"
                  onChange={(e) => handleEwalletsClick(e, 'Cash on Delivery')}
                  checked={selectedPayment === 'Cash on Delivery'}
                  disabled={isPaymentDisabled.cod}
                  className="mb-2"
                />

                <Form.Check
                  type="radio"
                  label="Installment (purchases above ₱500)"
                  name="paymentMethod"
                  id="paymentMethodInstallment"
                  value="Installment"
                  onChange={(e) => handleEwalletsClick(e, 'Installment')}
                  checked={selectedPayment === 'Installment'}
                  disabled={isPaymentDisabled.installment}
                />
                {selectedPayment === 'Installment' && (
                  <div className="ms-4 mt-3">
                    <Form.Group controlId="formImageUpload" className="mb-3">
                      <FloatingLabel controlId="floatingImage" label="Upload Valid ID (e.g., Driver's License, Passport)">
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
                      </FloatingLabel>
                    </Form.Group>

                    <div className="text-center mb-3">
                      <p className="mb-2"><FaCamera className="me-2" />Capture a Selfie</p>
                      <CameraCapture onCapture={(capturedImage) => setSelfieImage(capturedImage)} />
                    </div>

                    {selfieImage && (
                      <div className="text-center mb-3 p-3 border rounded bg-light">
                        <p className="mb-2 fw-bold">Selfie Preview:</p>
                        <img
                          src={selfieImage}
                          alt="Captured Selfie"
                          style={{ width: '100%', maxWidth: '250px', borderRadius: '8px', border: '1px solid #ddd' }}
                          className="img-fluid"
                        />
                      </div>
                    )}

                    <p className="mb-2 fw-bold">Select Installment Plan:</p>
                    <div className="d-flex justify-content-center flex-wrap gap-2 mb-3">
                      <Button
                        variant={installmentChoice?.plan === 2 ? "success" : "outline-secondary"}
                        onClick={() => setInstallmentChoice({ plan: 2, amount: calculateInstallment(formattedGrandTotal, 2) })}
                      >
                        2 Months x ₱{calculateInstallment(formattedGrandTotal, 2)} {installmentChoice?.plan === 2 && " ✓ "}
                      </Button>
                      <Button
                        variant={installmentChoice?.plan === 3 ? "success" : "outline-secondary"}
                        onClick={() => setInstallmentChoice({ plan: 3, amount: calculateInstallment(formattedGrandTotal, 3) })}
                      >
                        3 Months x ₱{calculateInstallment(formattedGrandTotal, 3)} {installmentChoice?.plan === 3 && " ✓ "}
                      </Button>
                    </div>

                    {paymentErrors.installment && (
                      <div className="text-danger mt-2">{paymentErrors.installment}</div>
                    )}

                    <div className="text-center mt-3">
                      <Link to="/installmentterms" className="text-primary text-decoration-underline">
                        Read Installment Terms & Conditions
                      </Link>
                    </div>
                  </div>
                )}
              </Form.Group>
            </div>

            {/* General error display */}
            {paymentErrors.general && <p className="text-danger text-center mb-2">{paymentErrors.general}</p>}


            {/* Total Price and Place Order Button */}
            <div className="p-4" style={{ border: '1px #d3d4d5 solid', background: 'white', borderRadius: '10px' }}>
              <h3 className="mb-3 text-end">Total Price: <span className="text-success">{formattedGrandTotal}</span></h3>
              <Button type="submit" className="w-100 py-2" disabled={isButtonDisabled} style={{ backgroundColor: '#E92409', border: 'none' }}>
                {loading ? <Spinner animation="border" size="sm" className="me-2" /> : 'Place Order'}
              </Button>
            </div>

            {/* The modal is rendered here */}
            {showModal && (
                <SuccessModal
                    show={showModal}
                    onClose={() => {
                        setShowModal(false); // Hide the modal
                  
                     clearPurchasedItems(itemsToDisplay.map(item => item.id)); // Use itemsToDisplay directly here
                        navigate('/'); // <--- NOW NAVIGATE
                    }}
                   
                />
            )}
     
          </Form>
             
        </div>
      </Col>

    </Row>
  );
};


