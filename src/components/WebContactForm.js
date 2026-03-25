import React, { useState } from 'react';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from 'react-router-dom';

export default function WebContactForm () {
  const [formData, setFormData] = useState({ name: '', email: '', project: 'Professional', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isRecaptchaLoading, setIsRecaptchaLoading] = useState(true);
  const navigate = useNavigate();

  // This function runs once the Google Script is fully ready
  const handleOnLoad = () => {
    setIsRecaptchaLoading(false);
  };

  const GOOGLE_SITE_KEY = process.env.REACT_APP_GOOGLE_SITE_KEY;

 const isFormIncomplete = !formData.name || !formData.email || !formData.message || !captchaToken;

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token); // Store the token when user clicks the checkbox
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' }); // Clear previous status

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ ...formData, captchaToken }), // Send token to server
      });

      const data = await response.json();

      if (response.status === 409) {
        // Status 409 = Conflict (Email already exists)
        setStatus({ type: 'warning', msg: 'You have already sent an inquiry! I will get back to you soon.' });
      } else if (response.ok) {
        // setStatus({ type: 'success', msg: 'Message sent! I will get back to you within 24 hours.' });
        // SUCCESS: Redirect to the new page instead of just showing an alert
        navigate('/webdevsuccess');
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
           <div className="mb-3">
            {/* 1. The Placeholder (Shown only while loading) */}
            {isRecaptchaLoading && (
              <div 
                className="d-flex align-items-center justify-content-center border rounded bg-light" 
                style={{ width: "304px", height: "78px", margin: "0 auto" }}
              >
                <Spinner animation="border" size="sm" variant="secondary" className="me-2" />
                <span className="text-muted small">Loading Security...</span>
              </div>
            )}

            {/* 2. The Actual reCAPTCHA (Hidden until loaded) */}
           <div className="mb-3 d-flex justify-content-center">
              {GOOGLE_SITE_KEY ? (
                <ReCAPTCHA
                  sitekey={GOOGLE_SITE_KEY}
                  asyncScriptOnLoad={handleOnLoad}
                  onChange={handleCaptchaChange}
                />
              ) : (
                <div className="p-3 border rounded border-danger text-danger bg-light small">
                  <strong>Developer Note:</strong> The reCAPTCHA Site Key is missing from the environment variables. 
                  Please check your Railway settings and redeploy.
                </div>
              )}
            </div>
          </div>

       <Button 
          variant="primary" 
          type="submit" 
          className="w-100" 
          // UPDATED: Disabled if loading OR if the form is incomplete
          disabled={loading || isFormIncomplete}
        >
          {loading ? <Spinner animation="border" size="sm" /> : 'Send Inquiry'}
        </Button>
      </Form>
      <div className="mt-3">
     <Button variant="outline-secondary"  className="w-100"  onClick={() => navigate('/onboarding')}>
                  Onboarding Checklist, Payment & Contract
      </Button>
      </div>
    </div>

  );
};