// CheckoutButton.js - Enhanced UI
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext';

const CheckoutButton = () => {
  const [loading, setLoading] = useState(false);
  const [voucherCode, setVoucherCode] = useState('');
  const [error, setError] = useState(null); // State for handling errors
  const { cartItems } = useCart();

  const createAndRedirect = async () => {
    setLoading(true);
    setError(null); // Clear previous errors
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/create-checkout-session`, {
        data: {
          attributes: {
            line_items: cartItems,
            voucher_code: voucherCode,
          },
        },
      });
      const checkoutUrl = response.data.data.attributes.checkout_url;
      window.location.href = checkoutUrl;
    } catch (err) {
      console.error('Error creating checkout session:', err.response ? err.response.data : err.message);
      setLoading(false);
      setError('An error occurred. Please try again or contact support.');
    }
  };

  return (
    <div className="d-grid gap-2 p-4 border rounded shadow-sm bg-light">
      {error && <Alert variant="danger" className="text-center">{error}</Alert>}
      <h4 className="text-center mb-3">Proceed to Payment</h4>
      
      {/* Voucher Code Input */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter voucher code"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
        />
      </Form.Group>
      
      {/* Payment Button */}
      <Button
        variant="success"
        size="lg"
        onClick={createAndRedirect}
        disabled={loading || cartItems.length === 0}
      >
        {loading ? (
          <>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            <span className="ms-2">Processing...</span>
          </>
        ) : (
          'Proceed to Select Payment Method'
        )}
      </Button>
      
      {/* Back to Checkout Button */}
      <Link to="/checkoutform" className="text-decoration-none">
        <Button variant="link" className="w-100 text-muted">
          Back to Checkout
        </Button>
      </Link>
    </div>
  );
};

export default CheckoutButton;