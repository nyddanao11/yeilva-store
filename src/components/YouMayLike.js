import React from 'react';
import YouMayLikeProduct from './YouMayLikeProduct';
import { Container, Row, Col } from 'react-bootstrap';
import './YouMayLike.css'; // Ensure styles are imported

export default function YouMayLike({ addToCart }) {
  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "40px" }}>
        <div className="line" style={{ marginBottom: '30px' }}>
          <h4 className="text">You May also Like</h4>
        </div>
        <Col lg={10} md={10} sm={12} style={{ padding: '5px 0px', marginBottom: '15px' }}>
          <YouMayLikeProduct addToCart={addToCart} />
        </Col>
      </Row>
    </Container>
  );
}
