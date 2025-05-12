import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FormatProductData } from '../utils/FormatProductData';

export const RecommendedProductsContext = createContext();

export const RecommendedProvider = ({ children }) => {
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  const [recommendedLoading, setRecommendedLoading] = useState(true);
  const [recommendedError, setRecommendedError] = useState(null);

  const fetchRecommendedProducts = useCallback(async () => {
    setRecommendedLoading(true);
    setRecommendedError(null);
    try {
      const response = await axios.get('https://yeilva-store-server.up.railway.app/api/recommendedproducts');
      setRecommendedProducts(response.data.map(FormatProductData));
    } catch (err) {
      setRecommendedError(err);
    } finally {
      setRecommendedLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendedProducts();
  }, [fetchRecommendedProducts]);

  return (
    <RecommendedProductsContext.Provider value={{ recommendedProducts, recommendedLoading, recommendedError, refetch: fetchRecommendedProducts }}>
      {children}
    </RecommendedProductsContext.Provider>
  );
};
