// src/VoucherForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';


const CreateVoucher = () => {
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/vouchers`, {
        code,
        discount,
        expirationDate,
      });
      setMessage(`Voucher created: ${response.data.code}`);
      setError('');
    } catch (error) {
      setError(`Error: ${error.response.data.error}`);
      setMessage('');
    }
  };

  return (
    <Container>
      <h1>Create Voucher</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCode">
          <Form.Label>Code</Form.Label>
          <Form.Control
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDiscount">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formExpirationDate">
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control
            type="date"
            value={expirationDate}
            onChange={(e) => setExpirationDate(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Create Voucher
        </Button>
      </Form>

      {message && <Alert variant="success" className="mt-3">{message}</Alert>}
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}


    </Container>
  );
};

export default CreateVoucher;
