import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Payment Successful!</h1>
      <p>Thank you for your order. We have received your payment and will process your order shortly.</p>
      <p>A confirmation email has been sent to your inbox.</p>
      {/* You can add a link to navigate back to the home page or an order history page */}
       <div className="ms-4 mb-3 mt-4">
       <Link to="/checkoutform">
           <Button variant="outline-secondary" className="btn-sm mt-3 mb-2">
             Back to Checkout
            </Button>
         </Link>
        </div>
    </div>
  );
};

export default SuccessPage;