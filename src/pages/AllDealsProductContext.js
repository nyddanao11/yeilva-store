// FeaturedProductsContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FormatProductData } from '../utils/FormatProductData';

export const AllDealsProductsContext = createContext();

export const AllDealsProductsProvider = ({ children }) => {
  const [allDealsProduct, setAllDealsProduct] = useState([]);
  const [allDealsLoading, setAllDealsLoading] = useState(true);
  const [allDealsError, setAllDealsError] = useState(null);

 const fetchAllDealsProduct = useCallback(async() =>  { // Add fetchAllProducts function
    setAllDealsLoading(true);
    setAllDealsError(null);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/alldealsproduct`
      );

      const data = Array.isArray(response.data)
        ? response.data.map(FormatProductData)
        : [];

      setAllDealsProduct(data);
      console.log('Fetched deals product:', data);
    } catch (error) {
      console.error('Error fetching deals product:', error);
    }
  },[]);

   useEffect(() => {
    fetchAllDealsProduct();
  }, [fetchAllDealsProduct]);

  return (
    <AllDealsProductsContext.Provider value={{ allDealsProduct, allDealsLoading, allDealsError, refetch: fetchAllDealsProduct }}>
      {children}
    </AllDealsProductsContext.Provider>
  );
};
