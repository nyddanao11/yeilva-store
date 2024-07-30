import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';

const GenerateVouchers = () => {

  const generateVoucherCode = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

  const [message, setMessage] = useState('');

  const generateVouchers = async () => {
    const discounts = [10, 15];
    const voucherPromises = [];

    discounts.forEach((discount) => {
      for (let i = 0; i < 50; i++) {
        const code = generateVoucherCode();
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1); // Set expiration date 1 month from now

        const voucher = {
          code,
          discount,
          expirationDate: expirationDate.toISOString().split('T')[0],
        };

        voucherPromises.push(
          axios.post('https://yeilva-store-server.up.railway.app/api/vouchers', voucher)
        );
      }
    });

    try {
      await Promise.all(voucherPromises);
      setMessage('Vouchers created successfully!');
    } catch (error) {
      setMessage('Error creating vouchers');
    }
  };

  return (
    <div>
      <Button onClick={generateVouchers} variant="primary">Generate Vouchers</Button>
      {message && <p>{message}</p>}
    </div>
  );
};

const generateVoucherCode = () => {
  return Math.random().toString(36).substr(2, 8).toUpperCase();
};

export default GenerateVouchers;
