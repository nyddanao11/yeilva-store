import React, { useEffect, useState } from 'react';
import {Link} from'react-router-dom';
import axios from 'axios';

const ConfirmPage = () => {
  const [confirmationStatus, setConfirmationStatus] = useState('pending');

  useEffect(() => {
  const token = new URLSearchParams(window.location.search).get('token');
  console.log(token);

  if (token) {
    // Define the server address (replace with your server's actual address)
    const serverAddress = 'https://yeilva-store-server.up.railway.app';

    // Make the GET request using Axios
    axios.get(`${serverAddress}/confirm?token=${token}`)
      .then((response) => {
        const data = response.data;
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
    <div className="d-flex flex-column justify-content-center align-items-center">
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
