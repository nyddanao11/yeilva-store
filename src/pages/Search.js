import React, { useState } from 'react';
import { Container, InputGroup, FormControl, ListGroup, ListGroupItem, Row, Col } from 'react-bootstrap';


const Search = ({ wellnessProductData, pcproductsData, avonproductsData, beautyProductsData, dealsElectronicData, addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Combine products from different sources into a single array
  const allProducts = [ ...wellnessProductData, ...pcproductsData,  ...avonproductsData, ...beautyProductsData, ...dealsElectronicData];

  // Function to filter products based on the search query
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="my-4">
    <Row  className="justify-content-center">
      <Col xs={12} md={6} >
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
            <img src={product.url} alt={product.name} width='30px' height='30px'/>
              <span style={{marginLeft:'5px'}}>{product.name}</span>
              </div>
              <button className="btn btn-primary"  onClick={() => addToCart(product)}>AddToCart</button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      </Col>
      </Row>
    </Container>
  );
};

export default Search;
