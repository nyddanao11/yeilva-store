import React, { useEffect, useState } from 'react';
import {Link} from'react-router-dom';

const ConfirmPage = () => {
  const [confirmationStatus, setConfirmationStatus] = useState('pending');

  useEffect(() => {
    // Here, you can make a request to your server to confirm the email.
    // You can use the 'token' parameter from the URL to identify the user.

    // Request using the 'fetch' API:
    const token = new URLSearchParams(window.location.search).get('token');
     console.log(token);
     
    if (token) {
      fetch(`https://yeilva-store-server.up.railway.app/api/confirm?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Email verified successfully') {
            setConfirmationStatus('success');
          } else {
            setConfirmationStatus('error');
          }
        })
        .catch((error) => {
          console.error('Error confirming email:', error);
          setConfirmationStatus('error');
        });
    }
  }, []);

  return (
    <div>
      {confirmationStatus === 'pending' && (
        <p>Confirmation in progress...</p>
      )}

      {confirmationStatus === 'success' && (
        <div>
          <p>Email confirmed successfully. You can now log in.</p>
          <Link to="/login" style={{ textDecoration: 'none', padding: '15px', background: '#0D6EFD', color: 'white' }}>
            Login
          </Link>
          {/* You can add a button or link to the login page here */}
        </div>
      )}


      {confirmationStatus === 'error' && (
        <p>Error confirming email. Please check your confirmation link or try again later.</p>
      )}
    </div>
  );
};

export default ConfirmPage;
