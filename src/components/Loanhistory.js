import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';



const LoanHistory = () => {
  const [loanformHistory, setLoanformHistory] = useState([]);
 
  const [loading, setLoading] = useState(false);
  const [paymentStates, setPaymentStates] = useState([]);
  const [searchEmail, setSearchEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTimer, setSearchTimer] = useState(null);
 const [userdata, setUserData] = useState('');



const fetchData = async () => {
  if (searchEmail) {
    try {
      // Use axios to fetch data
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/loanform-history?email=${encodeURIComponent(searchEmail)}`);
      console.log('Checkout Response:', response.data);

      if (response.data.length === 0) {
        setErrorMessage('No loanform history found for the specified email.');
      } else {
        const history = response.data;

      const initialPaymentStates = history.map((item) => {
  return {
    payment1: item.payment1 || '0',
    payment1_date: item.payment1 ? item.payment1_date : null,
    payment2: item.payment2 || '0',
    payment2_date: item.payment2 ? item.payment2_date : null,
    payment3: item.payment3 || '0',
    payment3_date: item.payment3 ? item.payment3_date : null,
    payment4: item.payment4 || '0',
    payment4_date: item.payment4 ? item.payment4_date : null,
    newStatus: item.status || '',
  };
});


        setPaymentStates(initialPaymentStates);
        setLoanformHistory(history);  // Update the loanformHistory state
      }
    } catch (error) {
      console.error('Error fetching loanform history:', error);
      setErrorMessage('Error fetching loan history');
      // Handle the error, set default values, etc.
    }
  }
};


useEffect(() => {
  fetchData();
  console.log('Updated Loanform History:', loanformHistory);
}, [searchEmail]);


  const handleSearch = async () => {
    console.log('Searching...', searchEmail);
   
    if (searchEmail) {
      clearTimeout(searchTimer);
      setSearchTimer(
        setTimeout(async () => {
          await fetchData(); // Call fetchData here
        }, 500)
      );
    }
  };



  const fetchCheckoutHistory = async (email) => {
  try {
    const checkoutResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/loanform-history?email=${encodeURIComponent(email)}`);
    console.log('Checkout Response:', checkoutResponse.data);
    setLoanformHistory(checkoutResponse.data);
  } catch (error) {
    console.error('Error fetching loanform history:', error);
    // Handle the error, set default checkout history, etc.
  }
};


const handlePaymentUpdate = async (applicationNumber, index, userEmail) => {
    try {
      setLoading(true);

      // Extract the payment and payment date values from paymentStates
      const { payment1, payment1_date, payment2, payment2_date, payment3, payment3_date, payment4, payment4_date } = paymentStates[index];

      // Create an object with the updated payments and payment dates
      const updatedPayments = {
        payment1,
        payment1_date,
        payment2,
        payment2_date,
        payment3,
        payment3_date,
        payment4,
        payment4_date,
      };

      // Make the API call to update payments and payment dates
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/updatePayments`, {
        applicationNumber,
        ...updatedPayments,
      });

      // Fetch updated checkout history
      await fetchCheckoutHistory(userEmail);
    } catch (error) {
      console.error('Error updating payments:', error);
    } finally {
      setLoading(false);
    }
  };




  const handleStatusChange = async (applicationNumber, index, userEmail) => {
    try {
      setLoading(true);

      await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/updateStatus`, {
        applicationNumber,
        newStatus: paymentStates[index].newStatus,
      });

      await fetchCheckoutHistory(userEmail);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setLoading(false);
    }
  };

 
  return (

    <Container className="mt-4">
      <h3 className="text-center mb-4">Users Loan Application History</h3>
      


      {/* Add input for searchEmail and button for searching */}
      <Form.Group>
        <Form.Label>Search by Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch} style={{marginTop:'15px', marginBottom:'15px'}}>
          Search
        </Button>

          {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}

      </Form.Group>

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
              <th>Action</th>
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
                <td>

                <Form.Group>

               <Form.Control
                      type="text"
                      placeholder="New Payment1"
                      value={paymentStates[index].payment1 || ''}
                      onChange={(e) =>
                        setPaymentStates((prev) => {
                          const updatedState = [...prev];
                          updatedState[index] = {
                            ...updatedState[index],
                            payment1: e.target.value,
                          };
                          return updatedState;
                        })
                      }
                    />

                    <Form.Control
                      type="text"
                      placeholder="New Payment Date1"
                      value={paymentStates[index].payment1_date || ''}
                      onChange={(e) =>
                        setPaymentStates((prev) => {
                          const updatedState = [...prev];
                          updatedState[index] = {
                            ...updatedState[index],
                            payment1_date: e.target.value,
                          };
                          return updatedState;
                        })
                      }
                    />




                  <Form.Control
                      type="text"
                      placeholder="New Payment2"
                      value={paymentStates[index].payment2 || ''}
                      onChange={(e) =>
                        setPaymentStates((prev) => {
                          const updatedState = [...prev];
                          updatedState[index] = {
                            ...updatedState[index],
                            payment2: e.target.value,
                          };
                          return updatedState;
                        })
                      }
                    />

                    <Form.Control
                      type="text"
                      placeholder="New Payment Date2"
                      value={paymentStates[index].payment2_date || ''}
                      onChange={(e) =>
                        setPaymentStates((prev) => {
                          const updatedState = [...prev];
                          updatedState[index] = {
                            ...updatedState[index],
                            payment2_date: e.target.value,
                          };
                          return updatedState;
                        })
                      }
                    />



                   <Form.Control
                      type="text"
                      placeholder="New Payment3"
                      value={paymentStates[index].payment3 || ''}
                      onChange={(e) =>
                        setPaymentStates((prev) => {
                          const updatedState = [...prev];
                          updatedState[index] = {
                            ...updatedState[index],
                            payment3: e.target.value,
                          };
                          return updatedState;
                        })
                      }
                    />

                    <Form.Control
                      type="text"
                      placeholder="New Payment Date3"
                      value={paymentStates[index].payment3_date || ''}
                      onChange={(e) =>
                        setPaymentStates((prev) => {
                          const updatedState = [...prev];
                          updatedState[index] = {
                            ...updatedState[index],
                            payment3_date: e.target.value,
                          };
                          return updatedState;
                        })
                      }
                    />



                 <Form.Control
                      type="text"
                      placeholder="New Payment4"
                      value={paymentStates[index].payment4 || ''}
                      onChange={(e) =>
                        setPaymentStates((prev) => {
                          const updatedState = [...prev];
                          updatedState[index] = {
                            ...updatedState[index],
                            payment4: e.target.value,
                          };
                          return updatedState;
                        })
                      }
                    />

                    <Form.Control
                      type="text"
                      placeholder="New Payment Date4"
                      value={paymentStates[index].payment4_date || ''}
                      onChange={(e) =>
                        setPaymentStates((prev) => {
                          const updatedState = [...prev];
                          updatedState[index] = {
                            ...updatedState[index],
                            payment4_date: e.target.value,
                          };
                          return updatedState;
                        })
                      }
                    />

                    <Button
                      variant="primary"
                      onClick={() => handlePaymentUpdate(item.application_number, index, item.email)}
                      disabled={loading}
                    >
                      {loading ? 'Updating Payments...' : 'Update Payments'}
                    </Button>
                 
                </Form.Group>
                 </td>

                  <td>
                   <Form.Control
                      type="text"
                      placeholder="New Status"
                      value={paymentStates[index].newStatus  || ''}
                      onChange={(e) =>
                        setPaymentStates((prev) =>
                          prev.map((state, i) =>
                            i === index
                              ? { ...state, newStatus: e.target.value }
                              : state
                          )
                        )
                      }
                    />

                  <Button
                    variant="primary"
                    onClick={() => handleStatusChange(item.application_number, index)}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Status'}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default LoanHistory;



