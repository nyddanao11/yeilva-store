import React, { useState } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function UpdateOrder() {
    const [formData, setFormData] = useState({
        orderId: '',
        orderstatus: '',
        deliverydate: ''
    });
    const [message, setMessage] = useState(null);
    const [variant, setVariant] = useState('success');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          setLoading(true); // Set loading to true when the form is submitted
            const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/updateOrder`, formData);
            setMessage(response.data.message);
            setVariant('success');
        } catch (error) {
            console.error('Error updating order:', error);
            setMessage('Failed to update the order');
            setVariant('danger');
        } finally {
  setLoading(false); // Set loading to false when the request is complete (success or failure)
}
    };

    return (
        <Container className="mt-4">
            <h2>Update Order</h2>
            {message && <Alert variant={variant}>{message}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="orderId" className="mb-3">
                    <Form.Label>Order ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="orderId"
                        placeholder="Enter Order ID"
                        value={formData.orderId}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="orderstatus" className="mb-3">
                    <Form.Label>Order Status</Form.Label>
                    <Form.Control
                        type="text"
                        name="orderstatus"
                        placeholder="Enter Order Status"
                        value={formData.orderstatus}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="deliverydate" className="mb-3">
                    <Form.Label>Delivery Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="deliverydate"
                        value={formData.deliverydate}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

              <Button variant="primary" type="submit" disabled={loading}>
                {loading && <Spinner animation="border" variant="primary" style={{ marginRight: '8px' }} />} Update Order
            </Button>


            </Form>
        </Container>
    );
}
