import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import Onboarding from './Onboarding';

export default function WebContactForm () {
  const [formData, setFormData] = useState({ name: '', email: '', project: 'Professional', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ type: 'success', msg: 'Message sent! I will get back to you within 24 hours.' });
        setFormData({ name: '', email: '', project: 'Professional', message: '' });
      } else {
        throw new Error();
      }
    } catch (err) {
      setStatus({ type: 'danger', msg: 'Something went wrong. Please email me directly at yeilvastore@gmail.com' });
    }
    setLoading(false);
  };

  return (
    <div className="mx-auto mt-5 p-4 border rounded shadow-sm bg-white" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-4">Start Your Project</h3>
      {status.msg && <Alert variant={status.type}>{status.msg}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
            type="text" required placeholder="John Doe" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            value={formData.name}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email" required placeholder="john@example.com" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            value={formData.email}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Interested Tier</Form.Label>
          <Form.Select onChange={(e) => setFormData({...formData, project: e.target.value})} value={formData.project}>
            <option>Starter</option>
            <option>Professional</option>
            <option>Enterprise</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Tell me about your business</Form.Label>
          <Form.Control 
            as="textarea" rows={4} required 
            placeholder="What are you looking to build?"
            onChange={(e) => setFormData({...formData, message: e.target.value})} 
            value={formData.message}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100" disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Send Inquiry'}
        </Button>
      </Form>
      <div className="mt-3">
      <Onboarding />
      </div>
    </div>

  );
};