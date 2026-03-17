import React, { useEffect, useState } from 'react';
import { Container, Table, Badge, Spinner, Alert, Card, Button } from 'react-bootstrap';

 export default function AdminInquiries () {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admin/inquiries`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setInquiries(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInquiries();
  }, []);

  // Inside AdminInquiries component, before the return:

const handleMarkContacted = async (id) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admin/inquiries/${id}/contacted`, { method: 'PATCH' });
    if (response.ok) {
      // Update local state so the badge changes immediately
      setInquiries(inquiries.map(item => 
        item.id === id ? { ...item, status: 'contacted' } : item
      ));
    }
  } catch (err) {
    alert("Error updating status");
  }
};

const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this lead?")) return;
  
  try {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admin/inquiries/${id}`, { method: 'DELETE' });
    if (response.ok) {
      // Filter out the deleted item from state
      setInquiries(inquiries.filter(item => item.id !== id));
    }
  } catch (err) {
    alert("Error deleting lead");
  }
};

const downloadCSV = () => {
  // 1. Define the headers
  const headers = ["ID", "Date", "Name", "Email", "Tier", "Status", "Message"];
  
  // 2. Map the data into rows
  const rows = inquiries.map(item => [
    item.id,
    new Date(item.created_at).toLocaleDateString(),
    item.name,
    item.email,
    item.project_tier,
    item.status,
    // Replace quotes and newlines in messages to avoid breaking the CSV format
    `"${item.message.replace(/"/g, '""')}"`
  ]);

  // 3. Combine headers and rows into a single string
  const csvContent = [
    headers.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");

  // 4. Create a Blob (Binary Large Object) and trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", `YeilvaStore_Leads_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  if (loading) return <Container className="text-center py-5"><Spinner animation="border" /></Container>;
  if (error) return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
       <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center">
        <h4 className="mb-0">Client Inquiries</h4>
        <div className="d-flex gap-2 align-items-center">
          <Button 
            variant="outline-light" 
            size="sm" 
            onClick={downloadCSV}
            disabled={inquiries.length === 0}
          >
            📥 Export CSV
          </Button>
          <Badge bg="primary">{inquiries.length} Total Leads</Badge>
        </div>
      </Card.Header>
        <Card.Body>
          <Table responsive hover mb-0>
            <thead className="table-light">
              <tr>
                <th>Date</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Tier</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.map((item) => (
                <tr key={item.id}>
                  <td>{new Date(item.created_at).toLocaleDateString()}</td>
                  <td className="fw-bold">{item.name}</td>
                  <td><a href={`mailto:${item.email}`}>{item.email}</a></td>
                  <td>
                    <Badge bg={item.project_tier === 'Enterprise' ? 'purple' : 'info'} style={{backgroundColor: item.project_tier === 'Enterprise' ? '#6f42c1' : ''}}>
                      {item.project_tier}
                    </Badge>
                  </td>
                  <td className="text-truncate" style={{ maxWidth: '200px' }} title={item.message}>
                    {item.message}
                  </td>
                  <td>
                    <Badge bg={item.status === 'new' ? 'success' : 'secondary'}>
                      {item.status.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="d-flex gap-2">
                      {item.status === 'new' && (
                        <Button 
                          variant="outline-success" 
                          size="sm" 
                          onClick={() => handleMarkContacted(item.id)}
                        >
                          Check
                        </Button>
                      )}
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        onClick={() => handleDelete(item.id)}
                      >
                        Trash
                      </Button>
                    </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {inquiries.length === 0 && <p className="text-center mt-3 text-muted">No inquiries found yet.</p>}
        </Card.Body>
      </Card>
    </Container>
  );
};

