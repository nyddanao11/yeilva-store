// ProductContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';
import {FormatProductData} from'../utils/FormatProductData';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [clickedCategories, setClickedCategories] = useState([]);
  const [storedProducts, setStoredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Add state for allProducts

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

  async function fetchAllProducts(name) { // Add fetchAllProducts function
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/productsearch?name=${encodeURIComponent(name)}`
      );

      const data = Array.isArray(response.data)
        ? response.data.map(FormatProductData)
        : [];

      setAllProducts(data);
      console.log('Fetched search products:', data);
    } catch (error) {
      console.error('Error fetching search products:', error);
    }
  }

  const value = {
    clickedCategories,
    setClickedCategories,
    storedProducts,
    setStoredProducts,
    handleItemClickCategory,
    fetchProducts,
    allProducts, // Include allProducts in the context value
    setAllProducts, //Include setAllProducts in the context value
    fetchAllProducts, // Include fetchAllProducts in the context value
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
