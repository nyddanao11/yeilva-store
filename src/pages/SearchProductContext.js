// FeaturedProductsContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FormatProductData } from '../utils/FormatProductData';

export const SearchProductsContext = createContext();

export const SearchProductsProvider = ({ children }) => {
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [searchError, setSearchError] = useState(null);

 async function fetchSearchProducts(name) { // Add fetchAllProducts function
    setSearchLoading(true);
    setSearchError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/productsearch?name=${encodeURIComponent(name)}`
      );

      const data = Array.isArray(response.data)
        ? response.data.map(FormatProductData)
        : [];

      setSearchProducts(data);
      console.log('Fetched search products:', data);
    } catch (error) {
      console.error('Error fetching search products:', error);
    }
  }

  return (
    <SearchProductsContext.Provider value={{ searchProducts, searchLoading, searchError, setSearchProducts, fetchSearchProducts }}>
      {children}
    </SearchProductsContext.Provider>
  );
};
