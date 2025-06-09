// FeaturedProductsContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FormatProductData } from '../utils/FormatProductData';

export const YouMayLikeProductContext = createContext();

export const YouMayLikeProductProvider = ({ children }) => {
  const [youMayLikeProducts, setYouMayLikeProducts] = useState([]);
  const [mayLikeLoading, setMayLikeLoading] = useState(true);
  const [mayLikeError, setMayLikeError] = useState(null);

  const fetchYouMayLikeProducts = useCallback(async () => {
    setMayLikeLoading(true);
    setMayLikeError(null);
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/youmaylikeproducts`);
      setYouMayLikeProducts(response.data.map(FormatProductData));
    } catch (err) {
      setMayLikeError(err);
    } finally {
      setMayLikeLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchYouMayLikeProducts();
  }, [fetchYouMayLikeProducts]);

  return (
    <YouMayLikeProductContext.Provider value={{ youMayLikeProducts, mayLikeLoading, mayLikeError, refetch: fetchYouMayLikeProducts }}>
      {children}
    </YouMayLikeProductContext.Provider>
  );
};
