// LoanTable.js
import React from 'react';
import { Table } from 'react-bootstrap';

const LoanTable = () => {

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Loan Amount</th>
          <th>Weekly Amortization</th>
       
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>₱3,000</td>
          <td>₱825</td>
         
        </tr>
        <tr>
          <td>₱5,000</td>
          <td>₱1,375</td>
        
        </tr>
        <tr>
          <td>₱10,000</td>
          <td>₱2,750</td>
       
        </tr>
        <tr>
          <td>₱15,000</td>
          <td>₱4,125</td>
         
        </tr>
      </tbody>

        <thead>
        <tr>
          <th>Loan Amount</th>
          <th>2 Weeks Amortization</th>
      
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>₱3,000</td>
          <td>₱1,650</td>
      
        </tr>
        <tr>
          <td>₱5,000</td>
          <td>₱2,750</td>
         
        </tr>
        <tr>
          <td>₱10,000</td>
          <td>₱5,500</td>
          
        </tr>
        <tr>
          <td>₱15,000</td>
          <td>₱8,250</td>
         
        </tr>
      </tbody>


        <thead>
        <tr>
          <th>Loan Amount</th>
          <th>Monthly Amortization</th>
         </tr>
      </thead>
      <tbody>
        <tr>
          <td>₱3,000</td>
          <td>₱3,300</td>
        
        </tr>
        <tr>
          <td>₱5,000</td>
          <td>₱5,500</td>
       
        </tr>
        <tr>
          <td>₱10,000</td>
          <td>₱11,000</td>
        
        </tr>
        <tr>
          <td>₱15,000</td>
          <td>₱16,500</td>
    
        </tr>
      </tbody>

        <thead>
        <tr>
          <th>Loan Amount</th>
          <th>2 Months Amortization</th>
         </tr>
      </thead>
      <tbody>
        <tr>
          <td>₱3,000</td>
          <td>₱3,600</td>
        
        </tr>
        <tr>
          <td>₱5,000</td>
          <td>₱6,000</td>
       
        </tr>
        <tr>
          <td>₱10,000</td>
          <td>₱12,000</td>
        
        </tr>
        <tr>
          <td>₱15,000</td>
          <td>₱18,000</td>
    
        </tr>
      </tbody>


    </Table>
  );
};

export default LoanTable;
