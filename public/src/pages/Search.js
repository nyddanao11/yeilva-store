import React, { useState } from 'react';
import { Container, InputGroup, FormControl, ListGroup, ListGroupItem } from 'react-bootstrap';


const Search = ({ wellnessProductData, pcproductsData, avonproductsData, beautyProductsData, addToCart }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Combine products from different sources into a single array
  const allProducts = [...wellnessProductData, ...pcproductsData, ...avonproductsData, ...beautyProductsData];

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
            <img src={product.url} alt={product.name} width='35px' height='35px'/>
              <span>{product.name}</span>
              <button className="btn btn-primary"  onClick={() => addToCart(product)}>AddToCart</button>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default Search;
