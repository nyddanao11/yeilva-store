import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, InputGroup, FormControl, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';


export default function Search ({ allProducts, addToCart }) {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  

  // Initialize search query from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    if (query) {
      setSearchQuery(query);
    }
  }, [location]);

  // Filter products based on the search query
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="my-4">
      <Row className="justify-content-center">
        <Col xs={12} md={6}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>

          <ListGroup>
            {filteredProducts.map((product) => (
              <ListGroupItem key={product.id}>
                <div className="d-flex justify-content-between">
                  <div>
                    <img src={product.url} alt={product.name} width="30px" height="30px" />
                    <span style={{ marginLeft: '5px' }}>{product.name}</span>
                  </div>
                  <button className="btn btn-primary" onClick={() => addToCart(product)}>
                    Add to Cart
                  </button>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

