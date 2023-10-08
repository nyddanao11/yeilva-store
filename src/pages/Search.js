import React, { useState } from 'react';
import { Container, InputGroup, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';


const Search = ({ wellnessProductData, pcproductsData, avonproductsData, addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Combine products from different sources into a single array
  const allProducts = [...wellnessProductData, ...pcproductsData, ...avonproductsData];

  // Function to filter products based on the search query
  const filteredProducts = allProducts.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container className="my-4">
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
              <span>{product.name}</span>
              <button className="btn btn-primary"  onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Search;
