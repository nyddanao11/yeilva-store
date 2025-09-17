import React from 'react';
import {Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const CancelPage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Payment Canceled</h1>
      <p>Your payment was not completed. You can try again or contact support for assistance.</p>
      {/* You can add a link to retry the checkout */}
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

export default CancelPage;