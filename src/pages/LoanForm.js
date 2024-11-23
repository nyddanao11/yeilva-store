// LoanForm.js
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Col, Row, FloatingLabel, Spinner } from 'react-bootstrap';
import axios from'axios';
import LoanFormModal from '../components/modalLoanForm';
import {useNavigate} from'react-router-dom';
import LoanTable from '../components/LoanTable'; // Import the LoanTable component
import LoanAccordion from '../components/LoanAccordion';
import './LoanForm.css';
import HoverButton from'../components/HoverButton'
import YouMayLike from'../components/YouMayLike';

const LoanForm = ({addToCart}) => {
  const [loanAmount, setLoanAmount] = useState('3000');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
   const [gcash, setGcash] = useState('');
    const [showModal, setShowModal] = useState(false); 
     const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const [image, setImage] = useState(null);
  const [installmentChoice, setInstallmentChoice] = useState(null); // Track installment choice
   const [birthdayError, setBirthdayError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);


 // Validation function for age
  const validateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred this year yet
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleBirthdayChange = (e) => {
    const selectedDate = e.target.value;
    setBirthday(selectedDate);

    const age = validateAge(selectedDate);
    if (age < 21) {
      setBirthdayError('You must be at least 21 years old.');
      setIsFormValid(false);
    } else {
      setBirthdayError('');
      setIsFormValid(true);
    }
  };


   // Utility to parse numeric value from formatted currency string
  const parseCurrency = (formattedCurrency) => {
    if (!formattedCurrency) return 0; // Default to 0 if null or undefined
    const numericValue = formattedCurrency.replace(/[^\d.-]/g, ''); // Remove non-numeric characters
    return parseFloat(numericValue); // Convert to number
  };


  // Calculate installment amounts
  const calculateInstallmentOne = (loanAmount, months) => {
    const total = parseCurrency(loanAmount); // Extract numeric value
    return ((total + total * 0.10) / months).toFixed(2); // Perform calculation
  };

   // Calculate installment amounts
  const calculateInstallmentTwo = (loanAmount, months) => {
    const total = parseCurrency(loanAmount); // Extract numeric value
    return ((total + total * 0.20) / months).toFixed(2); // Perform calculation
  };

const isValidPhone = (phone) => /^\d{11,15}$/.test(phone); // Adjust for your locale

    const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const[loanUserData, setLoanUserData] =useState(null);

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
    navigate('/'); // Redirect to the homepage using navigate
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

  setLoading(true); // Set loading to true when the form is submitted

   

   const formData = new FormData();
    formData.append('loanAmount', loanAmount);
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('birthday', birthday);
    formData.append('phone', phone);
    formData.append('gcash', gcash);
    formData.append('address', address);
    formData.append('image', image);
   
try {

   if (!installmentChoice || !installmentChoice.plan || !installmentChoice.amount)
     {
     
        setError('Please select an installment plan.');

      setLoading(false);
      return;
    }

      formData.append('installmentPlan', installmentChoice.plan);
      formData.append('installmentAmount', installmentChoice.amount);

  const response = await axios.post('https://yeilva-store-server.up.railway.app/api/saveLoanForm', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

      const userId = response.data.userId;
      console.log('Form submitted. User ID:', userId);

    // Close the modal and reset the form fields
    setShowModal(true);
  

    } catch (error) {
      console.error('Error submitting form:', error);
      setError('error: You cannot submit the form while your application is pending. ');
    } finally {
      setLoading(false);
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


useEffect(() => {
  const storedUserEmail = localStorage.getItem('email');
  if (storedUserEmail) {
    fetchUserData(storedUserEmail.replace(/"/g, ''), setUserData);
  } else {
    console.log('Email is missing in local storage');
  }
}, []);



  // Populate state variables with user data
  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
      setEmail(userData.email);
    
      // ... (populate other fields as needed)
    }
  }, [userData]);



  const fetchLoanUserData = async (email, setLoanUserData)  => {
  if (!email) {
    console.error('Email is undefined');
    return;
  }

  try {
    const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/loandata?email=${encodeURIComponent(email)}`);
    const user = response.data;
   setLoanUserData(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};


useEffect(() => {
  const storedUserEmail = localStorage.getItem('email');
  if (storedUserEmail) {
    fetchLoanUserData(storedUserEmail.replace(/"/g, ''), setLoanUserData);
  } else {
    console.log('Email is missing in local storage');
  }
}, []);

  // Populate state variables with user data
useEffect(() => {
  if (loanUserData) {
    setPhone(loanUserData.phone_number);
    setGcash(loanUserData.gcash_account);
    setAddress(loanUserData.address); 
    setBirthday(loanUserData.birthday);
    
  }
}, [loanUserData]);

  return (
    <>
    <Container className="mt-4">
      <Row className="justify-content-center">
     
        <Col xs={12} md={6} style={{marginBottom:'20px'}}>
     <div style={{ padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fff' }}>
              <h4 style={{ textAlign: 'center', marginBottom: '20px' }}>Loan Application</h4>
          
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formLoanAmount" className="mb-3">
          <FloatingLabel controlId="floatingSelectGrid" label="Select Loan Amount">
            <Form.Select value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} required>
              <option value="3000">3000</option>
              <option value="5000">5000</option>
              <option value="10000">10000</option>
              <option value="15000">15000</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
    

    <Form.Group controlId="formFirstName" className="mb-3">
  <FloatingLabel controlId="floatingFirstName" label="First Name">
    <Form.Control
      type="text"
      placeholder="Enter first name"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
      required
      readOnly // Add the readOnly attribute
    />
  </FloatingLabel>
</Form.Group>

<Form.Group controlId="formLastName" className="mb-3">
  <FloatingLabel controlId="floatingLastName" label="Last Name">
    <Form.Control
      type="text"
      placeholder="Enter last name"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
      required
      readOnly // Add the readOnly attribute
    />
  </FloatingLabel>
</Form.Group>

<Form.Group controlId="formEmail" className="mb-3">
  <FloatingLabel controlId="floatingEmail" label="Email">
    <Form.Control
      type="email"
      placeholder="Enter email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
      readOnly // Add the readOnly attribute
    />
  </FloatingLabel>
</Form.Group>

      <Form.Group controlId="formBirthday" className="mb-3">
        <FloatingLabel controlId="floatingBirthday" label="Birthday">
          <Form.Control
            type="date"
            placeholder="Enter birthday"
            value={birthday}
            onChange={handleBirthdayChange}
            required
          />
        </FloatingLabel>
        {birthdayError && <p style={{ color: 'red', marginTop: '5px' }}>{birthdayError}</p>}
      </Form.Group>

<Form.Group controlId="formPhone" className="mb-3">
  <FloatingLabel controlId="floatingPhone" label="Phone Number">
    <Form.Control
      type="tel"
      placeholder="Enter phone number"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
      isInvalid={!isValidPhone(phone)} // Highlight the input box if invalid
      required
    />
    <Form.Control.Feedback type="invalid">
      Please enter a valid phone number (e.g., 10-15 digits).
    </Form.Control.Feedback>
  </FloatingLabel>
</Form.Group>


<Form.Group controlId="formGcash" className="mb-3">
  <FloatingLabel controlId="floatingGcash" label="Gcash Account">
    <Form.Control type="text" placeholder="Enter Gcash Account" value={gcash} onChange={(e) => setGcash(e.target.value)}   isInvalid={!isValidPhone(phone)} // Highlight the input box if invalid
      required
    />
    <Form.Control.Feedback type="invalid">
      Please enter a valid phone number (e.g., 10-15 digits).
    </Form.Control.Feedback>
  </FloatingLabel>
</Form.Group>

<Form.Group controlId="formAddress" className="mb-3">
  <FloatingLabel controlId="floatingAddress" label="Address & landmark">
    <Form.Control as="textarea" rows={3} placeholder="Enter address" value={address} onChange={(e) => setAddress(e.target.value)} required />
  </FloatingLabel>
</Form.Group>

<Form.Group controlId="formImage" className="mb-3">
  <FloatingLabel controlId="floatingImage" label="Upload Image">
    <Form.Control type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} required/>
  </FloatingLabel>
</Form.Group>
 
       <div className={`d-flex justify-content-center align-items-center mt-4 mb-3 ${error ? 'error-border' : ''}`}>
            <p>Select a Plan:</p>
            <Button
              variant={installmentChoice?.plan === 1 ? "success" : "outline-secondary"}
              className="btn-sm"
              onClick={() => setInstallmentChoice({ plan: 1, amount: calculateInstallmentOne(loanAmount, 1) })}
              style={{ margin: "0 15px" }}
            >
              1mth x ₱{calculateInstallmentOne(loanAmount, 1)} 
              {installmentChoice?.plan === 1 && " ✓ Selected"}
            </Button>


             <Button
              variant={installmentChoice?.plan === 2 ? "success" : "outline-secondary"}
              className="btn-sm"
              onClick={() => setInstallmentChoice({ plan: 2, amount: calculateInstallmentTwo(loanAmount, 2) })}
              style={{ margin: "0 15px" }}
            >
              2mth x ₱{calculateInstallmentTwo(loanAmount, 2)} 
              {installmentChoice?.plan === 2 && " ✓ Selected"}
            </Button>

        </div>

        
         {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}

     <Button variant="primary" type="submit" className="w-100 mt-3"  disabled={loading || !installmentChoice}>
      {loading ? <Spinner animation="border" size="sm" className="me-2" /> : 'Submit'}
    </Button>


      </Form>

       {/* Move the modal outside the form */}
        {showModal && (
          <LoanFormModal show={showModal} onClose={handleCloseModal} />
        )}
</div>

       <div  className= 'd-flex justify-content-center align-items-center mt-4 mb-4'>
           <HoverButton />
       </div>
       
      </Col>
       </Row>

      <Row className='mb-3 '>
       <hr className='mt-4 '></hr>
      <h2 className='mb-3 mt-3'>FAQ</h2>
      <LoanAccordion />
      </Row>
  
    </Container>
        <YouMayLike addToCart={addToCart}/>
      </>

  );
};

export default LoanForm;
