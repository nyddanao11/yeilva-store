import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const ProductDetailsUpdateForm = () => {
  const initialFormData = {
    productId: '',
    featured: false,
    bestselling: false,
    recommended: false,
    discount: 0,
    stock:0,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [message, setMessage] = useState(null);
  const [variant, setVariant] = useState('success');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.productId) {
      setMessage("Product ID is required.");
      setVariant("danger");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/api/updateProductDetails`, {
        id: formData.productId, // Send `id` instead of `productId`
        featured: formData.featured,
        bestselling: formData.bestselling,
        recommended: formData.recommended,
        discount: formData.discount,
        stock: formData.stock,
      });
      setMessage(response.data.message);
      setVariant('success');
      resetForm(); // Call the reset function on success
    } catch (error) {
      console.error('Error updating product:', error);
      setMessage(error.response?.data?.error || 'Failed to update the product.');
      setVariant('danger');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Update Product Details (Admin)</h2>
      {message && <Alert variant={variant}>{message}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="featured" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Featured product"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="bestselling" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Best selling product"
            name="bestselling"
            checked={formData.bestselling}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="recommended" className="mb-3">
          <Form.Check
            type="checkbox"
            label="Recommended product"
            name="recommended"
            checked={formData.recommended}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="discount" className="mb-3">
          <Form.Label>Discount</Form.Label>
          <Form.Control
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            placeholder="Enter discount value"
          />
        </Form.Group>

          <Form.Group controlId="stock" className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock value"
          />
        </Form.Group>

        <Form.Group controlId="productId" className="mb-3">
          <Form.Label>ProductId</Form.Label>
          <Form.Control
            type="number"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            placeholder="Enter productId"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading && <Spinner animation="border" variant="primary" style={{ marginRight: '8px' }} />} Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default ProductDetailsUpdateForm;