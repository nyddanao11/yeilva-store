import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const AddProduct = () => {
  const [product, setProduct] = useState({
        id:'',
        name:'',
        category:'',
        price:'' ,
        weight:'',
        url: '',
        stock:'' ,
         page:'' ,
        thumbnails:[],
        description: '',
        place:'',
        sizecolor:'',
        productdetails:'',
        shipping:'',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://yeilva-store-server.up.railway.app/add-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...product,
          thumbnails: product.thumbnails.split(','), // Convert thumbnails to an array
        }),
      });

      if (response.ok) {
        alert('Product added successfully!');
        setProduct({
          id: '',
          name: '',
          category: '',
          price: '',
          weight: '',
          url: '',
          stock: '',
          page: '',
          thumbnails: '',
          description: '',
          place: '',
        });
      };
    const result = await response.json();

    if (response.ok) {
      alert(result.message); // Show success message
    } else {
      alert(`Error: ${result.message}`); // Show error message
    }
  } catch (error) {
    console.error('Request failed:', error);
    alert('Something went wrong. Please try again.');
  }
};


  return (
    <Container className="mt-5">
      <h1 className="text-center mb-4">Add Product</h1>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="id" className="mb-3">
              <Form.Label>Product ID</Form.Label>
              <Form.Control
                type="text"
                name="id"
                value={product.id}
                onChange={handleChange}
                placeholder="Enter Product ID"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Enter Product Name"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="category" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="Enter Category"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="text"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Enter Price"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="weight" className="mb-3">
              <Form.Label>Weight</Form.Label>
              <Form.Control
                type="text"
                name="weight"
                value={product.weight}
                onChange={handleChange}
                placeholder="Enter Weight"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="url" className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="url"
                value={product.url}
                onChange={handleChange}
                placeholder="Enter Image URL"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="stock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="Enter Stock Quantity"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="page" className="mb-3">
              <Form.Label>Page</Form.Label>
              <Form.Control
                type="text"
                name="page"
                value={product.page}
                onChange={handleChange}
                placeholder="Enter Page Number"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="thumbnails" className="mb-3">
          <Form.Label>Thumbnails (comma-separated URLs)</Form.Label>
          <Form.Control
            type="text"
            name="thumbnails"
            value={product.thumbnails}
            onChange={handleChange}
            placeholder="Enter Thumbnail URLs"
          />
        </Form.Group>
        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Enter Product Description"
          />
        </Form.Group>
        <Form.Group controlId="place" className="mb-3">
          <Form.Label>Place</Form.Label>
          <Form.Control
            type="text"
            name="place"
            value={product.place}
            onChange={handleChange}
            placeholder="Enter Place of Origin"
          />
        </Form.Group>
         <Form.Group controlId="sizecolor" className="mb-3">
          <Form.Label>Sizecolor</Form.Label>
          <Form.Control
            type="text"
            name="sizecolor"
            value={product.sizecolor}
            onChange={handleChange}
            placeholder="Enter With Size and Color"
          />
        </Form.Group>
         <Form.Group controlId="productdetails" className="mb-3">
          <Form.Label>Product details</Form.Label>
          <Form.Control
            type="text"
            name="productdetails"
            value={product.productdetails}
            onChange={handleChange}
            placeholder="Enter Product Details"
          />
        </Form.Group>
         <Form.Group controlId="shipping" className="mb-3">
          <Form.Label>Shipping</Form.Label>
          <Form.Control
            type="text"
            name="shipping"
            value={product.shipping}
            onChange={handleChange}
            placeholder="Enter Shipping details"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
