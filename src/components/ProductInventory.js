import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Row, Col, Badge } from 'react-bootstrap';

export default function ProductInventory () {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: 0, category: '' });

  // 1. Fetch Products from Backend
  const fetchProducts = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching inventory", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  // 2. Handle Add Product
  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        fetchProducts(); // Refresh list
        setShowModal(false);
        setNewProduct({ name: '', price: '', stock: 0, category: '' });
      }
    } catch (err) {
      console.error("Error adding product", err);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>📦 Product Inventory</h2>
        <Button variant="primary" onClick={() => setShowModal(true)}>+ Add New Product</Button>
      </div>

      <Table responsive hover className="shadow-sm border">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td className="fw-bold">{p.name}</td>
              <td>{p.category}</td>
              <td>₱{parseFloat(p.price).toLocaleString()}</td>
              <td>{p.stock_quantity}</td>
              <td>
                {p.stock_quantity > 10 ? (
                  <Badge bg="success">In Stock</Badge>
                ) : p.stock_quantity > 0 ? (
                  <Badge bg="warning" text="dark">Low Stock</Badge>
                ) : (
                  <Badge bg="danger">Out of Stock</Badge>
                )}
              </td>
              <td>
                <Button variant="outline-secondary" size="sm" className="me-2">Edit</Button>
                <Button variant="outline-danger" size="sm">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Add Product Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAddProduct}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control 
                type="text" required 
                onChange={e => setNewProduct({...newProduct, name: e.target.value})} 
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Price (PHP)</Form.Label>
                  <Form.Control 
                    type="number" step="0.01" required 
                    onChange={e => setNewProduct({...newProduct, price: e.target.value})} 
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control 
                    type="number" required 
                    onChange={e => setNewProduct({...newProduct, stock: e.target.value})} 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control 
                type="text" 
                onChange={e => setNewProduct({...newProduct, category: e.target.value})} 
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Product</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

