import React, { useState, useEffect } from 'react';
import { Card, Form, Row, Col, Button, Alert, Spinner, InputGroup, Badge } from 'react-bootstrap';

const PAYMENT_METHODS = ['PayPal', 'Maya', 'GCash'];
const BRAND_GREEN = '#2e7d32'; // matches the AdminPage header color

/**
 * Admin dashboard tool: after manually confirming a PayPal/Maya/GCash invoice
 * was paid, use this to log the order and generate a download link.
 * On success, the server also emails the customer their download link and
 * sends you a notification — this form just shows the result and gives you
 * a copy-link fallback in case either email needs resending.
 *
 * Fetches its own product list (id + name, all categories, only items with
 * a file attached) rather than relying on the storefront's ProductContext,
 * since that context is category-scoped and this dropdown isn't.
 *
 * Auth here rides on the httpOnly 'jwtToken' cookie set by /api/adminlogin
 * (credentials: 'include' on every fetch) rather than a token read from JS —
 * httpOnly cookies can't be read by the frontend at all, by design.
 *
 * Props:
 *  - onClose: optional close handler if rendered inside a modal
 */
const AdminManualOrderFulfillment = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    customerName: '',
    productId: '',
    paymentMethod: PAYMENT_METHODS[0],
    referenceNumber: '',
    amountPaid: ''
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null); // { downloadUrl, orderId, emailSent }
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      setProductsLoading(true);
      setProductsError('');
      try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/admin/products-list`, {
          credentials: 'include' // sends the httpOnly admin session cookie
        });

        if (!response.ok) {
          throw new Error('Failed to load products');
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setProductsError('Could not load product list — try refreshing this tab.');
      } finally {
        setProductsLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/manual-fulfillment`, {
        method: 'POST',
        credentials: 'include', // sends the httpOnly admin session cookie
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Something went wrong generating the link.');
      }

      setResult({
        downloadUrl: data.downloadUrl,
        orderId: data.orderId,
        emailSent: data.emailSent
      });
      setStatus('success');
    } catch (err) {
      setErrorMessage(err.message);
      setStatus('error');
    }
  };

  const handleCopy = async () => {
    if (!result?.downloadUrl) return;
    await navigator.clipboard.writeText(result.downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    setFormData({
      email: '',
      customerName: '',
      productId: '',
      paymentMethod: PAYMENT_METHODS[0],
      referenceNumber: '',
      amountPaid: ''
    });
    setResult(null);
    setStatus('idle');
  };

  return (
    <Card className="shadow-sm border-0">
      <Card.Body className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="fw-bold mb-0" style={{ color: BRAND_GREEN }}>
            Fulfill Manual Order
          </h4>
          {onClose && (
            <Button variant="link" className="text-muted p-0" onClick={onClose} aria-label="Close">
              &times;
            </Button>
          )}
        </div>

        {status === 'success' && result ? (
          <Alert variant="success" className="mb-0">
            <Alert.Heading className="h6 fw-bold">
              Order #{result.orderId} fulfilled
            </Alert.Heading>
            <p className="mb-2">
              {result.emailSent
                ? 'The customer has been emailed their download link, and a notification was sent to your inbox.'
                : 'The order was logged, but the automatic email could not be sent — use the copy-link button below to send it yourself.'}
            </p>

            <Form.Label className="small text-muted mb-1">Download link (backup / resend)</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control readOnly value={result.downloadUrl} />
              <Button
                variant={copied ? 'success' : 'outline-secondary'}
                onClick={handleCopy}
              >
                {copied ? 'Copied!' : 'Copy Link'}
              </Button>
            </InputGroup>

            <Button variant="outline-success" size="sm" onClick={handleReset}>
              Fulfill Another Order
            </Button>
          </Alert>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Customer Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.customerName}
                    onChange={handleChange('customerName')}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Customer Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    onChange={handleChange('email')}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Product</Form.Label>
                  <Form.Select
                    value={formData.productId}
                    onChange={handleChange('productId')}
                    disabled={productsLoading}
                    required
                  >
                    <option value="" disabled>
                      {productsLoading ? 'Loading products...' : 'Select a product'}
                    </option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </Form.Select>
                  {productsError && (
                    <Form.Text className="text-danger">{productsError}</Form.Text>
                  )}
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    value={formData.paymentMethod}
                    onChange={handleChange('paymentMethod')}
                  >
                    {PAYMENT_METHODS.map((method) => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Reference / Transaction No.</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.referenceNumber}
                    onChange={handleChange('referenceNumber')}
                    placeholder="e.g. PayPal transaction ID"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>Amount Paid (₱)</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>₱</InputGroup.Text>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={formData.amountPaid}
                      onChange={handleChange('amountPaid')}
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
            </Row>

            {status === 'error' && (
              <Alert variant="danger" className="mt-3 mb-0 py-2">
                {errorMessage}
              </Alert>
            )}

            <div className="d-flex align-items-center mt-4">
              <Button
                type="submit"
                disabled={status === 'submitting' || productsLoading}
                style={{ backgroundColor: BRAND_GREEN, borderColor: BRAND_GREEN }}
              >
                {status === 'submitting' ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Generating link...
                  </>
                ) : (
                  'Generate Link & Email Customer'
                )}
              </Button>
              {formData.paymentMethod && (
                <Badge bg="light" text="dark" className="ms-3 border">
                  Paying via {formData.paymentMethod}
                </Badge>
              )}
            </div>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default AdminManualOrderFulfillment;
