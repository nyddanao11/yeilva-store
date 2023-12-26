import React from 'react';

const Sidebar = ({ subcategories, selectSubcategory }) => {
  return (
    <div className="sidebar">
      <h3>Subcategories</h3>
      <ul>
        {subcategories.map((subcategory) => (
          <li key={subcategory} onClick={() => selectSubcategory(subcategory)}>
            {subcategory}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;


import React, { useState } from 'react';
import ProductList from './ProductList'; // Component to display filtered products
import Sidebar from './Sidebar';

const Products = ({ products }) => {
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  const subcategories = [...new Set(products.map((product) => product.subcategory))];

  const filterProducts = () => {
    if (!selectedSubcategory) {
      return products; // Display all products when no subcategory is selected
    }
    return products.filter((product) => product.subcategory === selectedSubcategory);
  };

  return (
    <div className="product-page">
      <Sidebar subcategories={subcategories} selectSubcategory={setSelectedSubcategory} />
      <div className="main-content">
        <h2>Products</h2>
        <ProductList products={filterProducts()} />
      </div>
    </div>
  );
};

export default Products;

