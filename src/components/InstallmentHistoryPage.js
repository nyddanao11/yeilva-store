
import React, { useState, useEffect } from 'react';
import { Container, Table,  } from 'react-bootstrap';
import axios from 'axios';

const InstallmentHistoryPage = () => {
  const [installmentHistory, setInstallmentHistory] = useState([]);
 const [userData, setUserData] = useState({});  // Ensure you have setUserData defined


  const userEmail = localStorage.getItem('email');

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/user?email=${encodeURIComponent(email)}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCheckoutHistory = async (email) => {
    try {
      const checkoutResponse = await axios.get(`https://yeilva-store-server.up.railway.app/api/Installment-history?email=${encodeURIComponent(email)}`);
      setInstallmentHistory(checkoutResponse.data);
    } catch (error) {
      console.error('Error fetching loanform history:', error);
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
      <h1 className="text-center mb-4">Product Installment History</h1>
   


      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Amount </th>
              <th>Item</th>
              <th>Order number</th>
              <th>Checkout Date</th>
              <th>Phone no.</th>
              <th>Address</th>
               <th>Payment1</th>
                <th>Payment Date1</th>
                <th>Payment2</th>
                <th>Payment Date2</th>
                 <th>Payment3</th>
                 <th>Payment Date3</th>
                  <th>Payment4</th>
                   <th>Payment Date4</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            {installmentHistory.map((item, index) => (
              <tr key={item.order_number}>
                <td>{index + 1}</td>
                <td>{item.total}</td>
                <td>
                  <div>
                    <div>
                    <p>{removeHtmlTags(item.name)}</p>
                  </div>
                  </div>
                  </td>
                <td>{item.order_number}</td>
                <td>{item.checkout_date}</td>
                <td>{item.phone}</td>
                <td>{item.address}</td>
                <td>{item.payment1}</td>
                 <td>{item.payment1_date}</td>
                <td>{item.payment2}</td>
                  <td>{item.payment2_date}</td>
                <td>{item.payment3}</td>
                  <td>{item.payment3_date}</td>
                <td>{item.payment4}</td>
                  <td>{item.payment4_date}</td>
                <td>{item.status}</td>
               
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default InstallmentHistoryPage;
