import React from 'react';
import YouMayLikeProduct from './YouMayLikeProduct';
import { Container, Row, Col } from 'react-bootstrap';
import './YouMayAlsoLikePage.css'; // Ensure styles are imported

export default function YouMayAlsoLikeProduct({ addToCart,youMayLikeProducts, mayLikeLoading, mayLikeError }) {
  // console.log('youmaylike:', youMayLikeProducts);
  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center" style={{ marginTop: "40px" }}>
        <div>
          <h4 className="text-title">You May also Like Product</h4>
        </div>
        <Col lg={10} md={10} sm={12} style={{ padding: '5px 0px', marginBottom: '15px' }}>
          <YouMayLikeProduct addToCart={addToCart} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError} />
        </Col>
      </Row>
    </Container>
  );
}
