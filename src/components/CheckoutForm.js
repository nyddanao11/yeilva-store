import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, FloatingLabel, Spinner} from 'react-bootstrap';
import { FaCamera } from 'react-icons/fa';
import axios from 'axios';
import SuccessModal from'./modalCheckout';
import {useNavigate, Link, useLocation} from'react-router-dom';
import CameraCapture from'./CameraCapture';
import { useCart } from '../pages/CartContext'; // Correct path to your context
import { fetchUserData } from '../components/userService';
import GcashPaymentModal from './GcashPaymentModal';
import { useAuth} from '../pages/loginContext';
import PayPalSection from './CheckoutFormPaypal';


export default function CheckoutForm  ({ ewalletStatus, capturedImage, showCheckoutModal, setShowCheckoutModal}) {
      const{userEmail} = useAuth();
 const {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    handleIncrement,
    handleDecrement,
    formattedGrandTotal,
    checkoutItemsForPayment,
    setCheckoutItemsForPayment,
    voucherCode, 
    clearPurchasedItems,
    clearVoucherDiscount,
    shippingRate,
    totalItemsPrice,
    grandTotalAmount,
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
 
 // In your CheckoutForm component
const [showGcashModal, setShowGcashModal] = useState(false);
const [modalType, setModalType] = useState(false);
const [downloadUrl, setDownloadUrl] = useState(null);


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
    setShowGcashModal(true); //  will get data from context
  };

const handlePaymongoNavigation = () => {
    navigate('/paymongopayment'); //  will get data from context
  };

  const handlePaypalNavigation = () => {
    navigate('/paypalsection'); //  will get data from context
  };


 const [paymentErrors, setPaymentErrors] = useState({
  ewallets: '',
  installment: '',
  cashOnDelivery: '',
   paypal:'',
});

 // Update handleEwalletsClick to reset error message for the selected payment method
const handleEwalletsClick = (e) => {
  setSelectedPayment(e.target.value); // Update selected payment method
  setPaymentErrors({
    ewallets: '',
    installment: '',
    cashOnDelivery: '',
    paypal:'',
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
  const itemName = checkoutItemsForPayment.map((item) => `
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
  formData.append('quantity', checkoutItemsForPayment.reduce((acc, item) => acc + item.quantity, 0));
  formData.append('total', formattedGrandTotal);
  formData.append('paymentOption', selectedPayment);
  formData.append('voucherCode', voucherCode);
  formData.append('items', checkoutItemsForPayment);


  
  // For non-FormData submissions, create a JSON payload
  const cashOnDelivery = {
    ...userData,
    ...selectedAddressDetails,
    name: itemName,
    quantity: checkoutItemsForPayment.reduce((acc, item) => acc + item.quantity, 0),
    total: formattedGrandTotal,
    paymentOption: selectedPayment,
    productNames: cleanedProductNames, // Cleaned product names array
   productPrice: cleanedProductPrice.length > 0 ? cleanedProductPrice[0] : 0,
    productUrl: cleanedProductUrl,
   productWeight: cleanedProductWeight.length > 0 ? cleanedProductWeight[0] : 0,
   voucherCode: voucherCode,
   items: checkoutItemsForPayment,
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
            // 1. Get the IDs of the items the server confirmed it deleted
            clearVoucherDiscount();
            const deletedIds = response.data.deletedCartItemIds; 
            
            // 2. Clear the cart items from the local state using your context function
            await clearPurchasedItems(deletedIds); 
            
            console.log("✅ Reached: Setting Modal to True (Installment)"); // <-- 2. Debug Log
            setShowCheckoutModal(true);
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
                clearVoucherDiscount();
                // 1. Get the IDs of the items the server confirmed it deleted
                const deletedIds = response.data.deletedCartItemIds; 
                
                // 2. Clear the cart items from the local state using your context function
                await clearPurchasedItems(deletedIds); 
                
                console.log("✅ Reached: Setting Modal to True (E-wallets)"); // <-- 2. Debug Log
                 setShowCheckoutModal(true);
                return; // End after successful E-wallet submission
            }

        // Default case for other payments (e.g., Cash on Delivery)
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/checkout`, cashOnDelivery);
            console.log(response.data);
            clearVoucherDiscount();
            // 1. Get the IDs of the items the server confirmed it deleted
            const deletedIds = response.data.deletedCartItemIds; 
            
            // 2. Clear the cart items from the local state using your context function
            await clearPurchasedItems(deletedIds); 
            
            console.log("✅ Reached: Setting Modal to True (COD)"); // <-- 2. Debug Log
            setShowCheckoutModal(true);
              
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
 
  if (userEmail) {
    fetchUserData(userEmail.replace(/"/g, ''), setUserData);
  } else {
    console.log('Email is missing in local storage');
  }
}, []);


    useEffect(() => {
      
        if (userEmail) {
            fetchUserData(userEmail.replace(/"/g, ''))
                .then((user) => {
                    // console.log('User data from API:', user);
                    const addresses = user.delivery_addresses || [];

                    setUserData({
                        ...user,
                        joineddate: user.joineddate || '',
                        delivery_addresses: addresses,
                    });

                    // --- Start of New/Modified Logic for Automatic Selection ---
                    if (addresses.length > 0) {
                        const defaultAddress = addresses.find(addr => addr.is_default); // Use is_default from backend
                        if (defaultAddress) {
                            // Option 1: A default address exists
                            setSelectedAddressId(defaultAddress.id);
                            setSelectedAddressDetails(defaultAddress);
                        } else if (addresses.length === 1) {
                            // Option 2: Only one address, and it's not explicitly default
                            setSelectedAddressId(addresses[0].id);
                            setSelectedAddressDetails(addresses[0]);
                        } else {
                            // Option 3: Multiple addresses, no default. Let user choose (or pre-select first)
                            // Your current logic: setSelectedAddressId(addresses[0].id); setSelectedAddressDetails(addresses[0]);
                            // I'm changing this to null initially, forcing the "Choose an address" option to be visible
                            setSelectedAddressId(null);
                            setSelectedAddressDetails(null);
                        }
                    } else {
                        // No addresses found
                        setSelectedAddressId(null);
                        setSelectedAddressDetails(null);
                    }
                    // --- End of New/Modified Logic ---

                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching user data:', error);
                    setLoading(false);
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
        const val = e.target.value;
        if (!val) {
            setSelectedAddressId(null);
            setSelectedAddressDetails(null);
            return;
        }
        const addressId = parseInt(val, 10);
            setSelectedAddressId(addressId);
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

console.log("Selected Payment:", selectedPayment);

  return (
    <Row className="justify-content-center py-4">
  <Col xs={12} lg={12} xl={10}>
    <div className="text-center mb-5">
      <h2 className="display-5 fw-bold text-dark">Secure Checkout</h2>
      <p className="text-muted">Review your order details below to complete your purchase.</p>
    </div>

    <Row className="g-4">
      {/* LEFT COLUMN: Order Details */}
      <Col lg={6}>
        {/* User Info Card */}
        <section className="bg-white p-4 mb-4 rounded shadow-sm border">
          <h5 className="mb-3 text-uppercase text-secondary small fw-bold">Shipping To</h5>
          <div className="bg-light p-3 rounded">
            <p className="mb-1 fw-bold">{userData.firstname} {userData.lastname}</p>
            <p className="mb-0 text-muted">{userData.email}</p>
          </div>
        </section>

        {/* Order Items */}
        <section className="bg-white p-4 rounded shadow-sm border">
          <h5 className="mb-3 text-uppercase text-secondary small fw-bold">Order Summary</h5>
          <ul className="list-unstyled mb-0">
            {itemsToDisplay.map((item) => (
              <li key={item.id} className="d-flex align-items-center py-3 border-bottom">
                <img src={item.url} alt={item.name} className="rounded" style={{ width: '60px', height: '60px', objectFit: 'cover' }} />
                <div className="ms-3 flex-grow-1">
                  <p className="fw-bold mb-0">{item.name}</p>
                  <small className="text-muted">{item.selectedSize ? `Size: ${item.selectedSize} | ` : ''} Qty: {item.quantity}</small>
                </div>
                <div className="text-end fw-bold">₱{(item.final_price * item.quantity).toFixed(2)}</div>
              </li>
            ))}
          </ul>
          <Button variant="link" className="w-100 text-decoration-none mt-2 text-muted" onClick={handleBackToCart}>
            ← Edit Cart
          </Button>
        </section>
      </Col>

      {/* RIGHT COLUMN: Totals & Payment */}
      <Col lg={6}>
        <div className="sticky-top" style={{ top: '20px' }}>
          <section className="bg-white p-4 rounded shadow-sm border mb-4">
            <h5 className="mb-4 text-uppercase text-secondary small fw-bold">Total</h5>
            
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal</span>
              <span>₱{totalItemsPrice.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-3 pb-3 border-bottom">
              <span>Shipping</span>
              <span>{shippingRate === 0 ? "FREE" : `₱${shippingRate.toFixed(2)}`}</span>
            </div>
            <div className="d-flex justify-content-between mb-4">
              <span className="fw-bold fs-4">Total</span>
              <span className="fw-bold fs-4 text-success">{formattedGrandTotal}</span>
            </div>

            <hr />

          <PayPalSection
                setShowCheckoutModal={setShowCheckoutModal} // Pass function, not state
                setModalType={setModalType}
                setDownloadUrl={setDownloadUrl} // Pass this so PayPalSection can update it
                clearPurchasedItems={clearPurchasedItems}
                showCheckoutModal={showCheckoutModal}
              />
            
            {paymentErrors.general && (
              <p className="text-danger small mt-2">{paymentErrors.general}</p>
            )}
          </section>
          
          <p className="text-center small text-muted">
            🔒 Secure transaction. Your data is protected by encryption.
          </p>
        {/* ✅ FIXED MODAL LOGIC */}
            {showCheckoutModal && (
              <SuccessModal 
                show={showCheckoutModal} // Matches the state variable
                downloadUrl={downloadUrl} // Receives the URL set by PayPalSection
                onClose={() => {

                  setShowCheckoutModal(false);
                  navigate('/'); 
                  window.location.reload(); // This forces the app to pull the fresh, empty cart from the DB
                }} 
              />
            )}
            
        </div>
      </Col>
    </Row>
  </Col>
</Row>
  );
};


