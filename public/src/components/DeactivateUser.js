import React, { useState, useEffect } from 'react';
import { Container, Table, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const DeactivateUser = ({ searchEmail }) => {
  const [userStatusEmail, setUserStatusEmail] = useState('');
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newStatus, setNewStatus] = useState({});

  const [searchTimer, setSearchTimer] = useState(null);

  const fetchUserData = async () => {
    if (userStatusEmail) {
      try {
        const response = await axios.get(`http://localhost:3001/api/userstatus?email=${encodeURIComponent(userStatusEmail)}`);
        const userDataArray = Array.isArray(response.data) ? response.data : [response.data];
        setUserData(userDataArray);
        setErrorMessage('');
      } catch (error) {
        console.error('Error fetching user data:', error);
        setErrorMessage('Error fetching user data');
      }
    }
  };

  const handleUsersStatusChange = async (user) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:3001/api/user/updateStatus', {
        email: user.email,
        status: newStatus[user.email],
      });
      await fetchUserData();
      setNewStatus((prevStatus) => ({ ...prevStatus, [user.email]: '' }));
    } catch (error) {
      console.error('Error updating status:', error);
      setErrorMessage('Error updating user status');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (userStatusEmail) {
      clearTimeout(searchTimer);
      setSearchTimer(
        setTimeout(async () => {
          await fetchUserData();
         
        }, 500)
      );
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4">Deactivate User</h3>

      <Form.Group>
        <Form.Label>Search by Email:</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={userStatusEmail}
          onChange={(e) => setUserStatusEmail(e.target.value)}
        />
        <Button variant="primary" onClick={handleSearch} style={{ marginTop: '15px', marginBottom: '15px' }}>
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
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Joined Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user) => (
              <tr key={user.email}>
                <td>{user.email}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.joineddate}</td>
                <td>{user.status}</td>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="New Status"
                    value={newStatus[user.email] || ''}
                    onChange={(e) =>
                      setNewStatus((prevStatus) => ({
                        ...prevStatus,
                        [user.email]: e.target.value,
                      }))
                    }
                  />
                </td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleUsersStatusChange(user)}
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

export default DeactivateUser;
