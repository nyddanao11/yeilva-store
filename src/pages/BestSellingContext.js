import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FormatProductData } from '../utils/FormatProductData';

export const BestSellingContext = createContext();

export const BestSellingProvider = ({ children }) => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [bestLoading, setBestLoading] = useState(true);
  const [bestError, setBestError] = useState(null);

  const fetchBestSellingProducts = useCallback(async () => {
    setBestLoading(true);
    setBestError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/bestsellingproducts`);
      setBestSellingProducts(response.data.map(FormatProductData));
    } catch (err) {
      setBestError(err);
    } finally {
      setBestLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBestSellingProducts();
  }, [fetchBestSellingProducts]);

  return (
    <BestSellingContext.Provider value={{ bestSellingProducts, bestLoading, bestError, refetch: fetchBestSellingProducts }}>
      {children}
    </BestSellingContext.Provider>
  );
};
