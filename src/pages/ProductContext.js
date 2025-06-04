// ProductContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';
import {FormatProductData} from'../utils/FormatProductData';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [clickedCategories, setClickedCategories] = useState([]);
  const [storedProducts, setStoredProducts] = useState([]);

  const handleItemClickCategory = (categoryName) => {
    setClickedCategories([categoryName.toLowerCase()]);
  };

  async function fetchProducts(category) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/productsdata?category=${encodeURIComponent(category)}`
      );

      const data = Array.isArray(response.data)
        ? response.data.map(FormatProductData)
        : [];

      setStoredProducts(data);
      console.log('Fetched category products:', data);
    } catch (error) {
      console.error('Error fetching category products:', error);
    }
  }

  const value = {
    clickedCategories,
    setClickedCategories,
    storedProducts,
    setStoredProducts,
    handleItemClickCategory,
    fetchProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
