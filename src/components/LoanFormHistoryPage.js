
import React, { useState, useEffect } from 'react';
import { Container, Table,  } from 'react-bootstrap';
import axios from 'axios';
import { useAuth} from '../pages/loginContext';

export default function LoanFormHistoryPage () {
  const [loanformHistory, setLoanformHistory] = useState([]);
 const [userData, setUserData] = useState({});  // Ensure you have setUserData defined

      const{userEmail} = useAuth();

  const fetchUserData = async (email) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/user?email=${encodeURIComponent(email)}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchCheckoutHistory = async (email) => {
    try {
      const checkoutResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/loanform-history?email=${encodeURIComponent(email)}`);
      setLoanformHistory(checkoutResponse.data);
    } catch (error) {
      console.error('Error fetching loanform history:', error);
      // Handle the error, set default checkout history, etc.
    }
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
      <h1 className="text-center mb-4">Loan Application History</h1>
  
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Loan Amount</th>
              <th>Application Number</th>
              <th>Created Date</th>
              <th>Phone No.</th>
              <th>Gcash no.</th>
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
            {loanformHistory.map((item, index) => (
              <tr key={item.application_number}>
                <td>{index + 1}</td>
                <td>{item.loan_amount}</td>
                <td>{item.application_number}</td>
                <td>{item.created_at}</td>
                <td>{item.phone_number}</td>
                <td>{item.gcash_account}</td>
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

