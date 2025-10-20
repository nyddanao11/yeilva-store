import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

export default function VoucherForm ({ onVoucherValidate }) {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
     setIsLoading(true);
     setMessage('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/vouchers/validate`, { code });
      const discountPercentage = response.data.voucher.discount; 
    
    // Pass BOTH the percentage and the original 'code' back to the parent
    onVoucherValidate(discountPercentage, code); // <--- Pass 'code' here

    setMessage(`Voucher valid! Discount: ${discountPercentage}`);
    } catch (error) {
       const errorMessage = error.response?.data?.error || 'Invalid or expired voucher.';
    setMessage(errorMessage);
    }
  };

 return (
    <div style={{ width: '150px' }}>
      <Form onSubmit={handleSubmit}>
        <Form.Label>Enter voucher code</Form.Label>
        <Form.Control
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <Button type="submit" variant="outline-secondary" style={{ marginTop: '10px',width:"150px"}} disabled={isLoading || !code} >
           {isLoading ? 'Validating...' : 'Apply Voucher'}
        </Button>
      </Form>

      {message && <p>{message}</p>}
    </div>
  );
};

