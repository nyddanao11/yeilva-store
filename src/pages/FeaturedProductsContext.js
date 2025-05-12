// FeaturedProductsContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FormatProductData } from '../utils/FormatProductData';

export const FeaturedProductsContext = createContext();

export const FeaturedProductsProvider = ({ children }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeaturedProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://yeilva-store-server.up.railway.app/api/featuredproducts');
      setFeaturedProducts(response.data.map(FormatProductData));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <FeaturedProductsContext.Provider value={{ featuredProducts, loading, error, refetch: fetchFeaturedProducts }}>
      {children}
    </FeaturedProductsContext.Provider>
  );
};
