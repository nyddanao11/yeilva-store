import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';

const ProductDetails = () => {
  return (
    <div>
      <h4>Product Details</h4>
      <p>Product Details Content</p>
    </div>
  );
};

const Reviews = () => {
  return (
    <div>
      <h4>Reviews</h4>
      <p>Reviews Content</p>
    </div>
  );
};

const Shipping = () => {
  return (
    <div>
      <h4>Shipping</h4>
      <p>Shipping Content</p>
    </div>
  );
};

const TabbedComponent = () => {
  const [key, setKey] = useState('details');

  return (
    <div>
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Row>
          <Col>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="details">Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="reviews">Reviews</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="shipping">Shipping</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="details">
                <ProductDetails />
              </Tab.Pane>
              <Tab.Pane eventKey="reviews">
                <Reviews />
              </Tab.Pane>
              <Tab.Pane eventKey="shipping">
                <Shipping />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default TabbedComponent;
