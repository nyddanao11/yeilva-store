import React, { useEffect } from 'react';

const ConfirmPage = () => {
  useEffect(() => {
    // Here, you can make a request to your server to confirm the email.
    // You can use the 'token' parameter from the URL to identify the user.

    // Example request using the 'fetch' API:
    const token = new URLSearchParams(window.location.search).get('token');
    if (token) {
      fetch(`/api/confirm?token=${token}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // You can handle the response as needed
        })
        .catch((error) => {
          console.error('Error confirming email:', error);
        });
    }
  }, []);

  return (
    <div>
      <p>Confirmation in progress...</p>
      {/* You can add loading animations or messages here */}
    </div>
  );
};

export default ConfirmPage;
