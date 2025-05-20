import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const VoucherForm = ({ onVoucherValidate }) => {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/vouchers/validate`, { code });
      setMessage(`Voucher valid! Discount: ${response.data.discount}`);
      onVoucherValidate(response.data.discount); // Pass the discount to the parent component
    } catch (error) {
      setMessage('Invalid or expired voucher');
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
        <Button type="submit" variant="outline-secondary" style={{ marginTop: '10px',width:"150px"}}>
          Validate Voucher
        </Button>
      </Form>

      {message && <p>{message}</p>}
    </div>
  );
};

export default VoucherForm;
