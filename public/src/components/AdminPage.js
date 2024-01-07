import React, { useState, useEffect } from 'react';
import { Container, Tab, Tabs} from 'react-bootstrap';

import DeactivateUser from './DeactivateUser';
import LoanHistory from './Loanhistory';


const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('LoanHistory');
  const [loanformHistory, setLoanformHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const [searchEmail, setSearchEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTimer, setSearchTimer] = useState(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

const loanHistoryTabContent = <LoanHistory />; // Store the component in a variable

  const renderTabContent = () => {
    switch (activeTab) {
      case 'LoanHistory':
        return loanHistoryTabContent; // Use the variable here
      case 'DeactivateUser':
        return renderDeactivateUserTab();
      // Add more cases for additional tabs
      default:
        return null;
    }
  };

  const fetchData = async () => {
    // Fetch data based on the active tab
    if (activeTab === 'LoanHistory') {
      // Fetch loan history data
      // ...
    } else if (activeTab === 'DeactivateUser') {
      // Fetch user data for deactivation
      // ...
    }
    // Add more cases for additional tabs
  };

  useEffect(() => {
    fetchData();
    console.log('Updated Loanform History:', loanformHistory);
  }, [searchEmail, activeTab]);

  const renderLoanHistoryTab = () => {
    // Render content for the 'Loan History' tab
    // Similar to your existing loan history rendering logic
     return <LoanHistory />;
  };

  const renderDeactivateUserTab = () => {
    // Render content for the 'Deactivate User' tab
    return <DeactivateUser />;
  };

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

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4" style={{color:'green'}}>YeilvaStore Dashboard</h1>

      <Tabs
        id="admin-tabs"
        activeKey={activeTab}
        onSelect={handleTabChange}
        className="mb-3"
      >
        <Tab eventKey="LoanHistory" title="Loan History">
          {/* Content for the 'Loan History' tab */}
          {renderLoanHistoryTab()}
        </Tab>
        <Tab eventKey="DeactivateUser" title="Deactivate User">
          {/* Content for the 'Deactivate User' tab */}
          {renderDeactivateUserTab()}
        </Tab>
        {/* Add more Tab components for additional tabs */}
      </Tabs>

     

     
    </Container>
  );
};

export default AdminPage;
