import React, { useState, useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import axios from 'axios';

const CheckoutHistoryPage = () => {
  const [checkoutHistory, setCheckoutHistory] = useState([]);
  const [userData, setUserData] = useState({});  // Ensure you have setUserData defined

  const userEmail = localStorage.getItem('email');

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/user?email=${encodeURIComponent(email)}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCheckoutHistory = async (email) => {
    try {
      const checkoutResponse = await axios.get(`http://localhost:3001/api/checkout-history?email=${encodeURIComponent(email)}`);
      setCheckoutHistory(checkoutResponse.data);
    } catch (error) {
      console.error('Error fetching checkout history:', error);
      // Handle the error, set default checkout history, etc.
    }
  };


// Function to remove HTML tags
const removeHtmlTags = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

  useEffect(() => {
    const fetchData = async () => {
      if (userEmail) {
        await fetchUserData(userEmail);
        await fetchCheckoutHistory(userEmail);
      }
    };

    fetchData();
  }, [userEmail]);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Checkout History</h1>
 
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Item Description</th>
              <th>Checkout Date</th>
              <th>Total</th>
              <th>Order Number</th>
            </tr>
          </thead>
          <tbody>
            {checkoutHistory.map((item, index) => (
              <tr key={item.order_number}>
                <td>{index + 1}</td>
                <td>
                  <div>
                    <div>
                    <p>{removeHtmlTags(item.name)}</p>
                  </div>
                  </div>
                </td>
                <td>{item.checkout_date}</td>
                <td>{item.total}</td>
                <td>{item.order_number}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default CheckoutHistoryPage;
