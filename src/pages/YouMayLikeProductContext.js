// FeaturedProductsContext.js
import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { FormatProductData } from '../utils/FormatProductData';

export const YouMayLikeProductContext = createContext();

export const YouMayLikeProductProvider = ({ children }) => {
  const [youMayLikeProducts, setYouMayLikeProducts] = useState([]);
  const [mayLikeLoading, setMayLikeLoading] = useState(true);
  const [mayLikeError, setMayLikeError] = useState(null);

 
// The Simpler (but slightly less performant) Fix:
const fetchYouMayLikeProducts = useCallback(async () => {
    setMayLikeLoading(true);
    setMayLikeError(null);
    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/youmaylikeproducts`);
        const newProducts = response.data.map(FormatProductData);
        
        // 🛑 FINAL SIMPLE LOOP BREAK FIX
        setYouMayLikeProducts(currentProducts => {
            // Compare the stringified version of the arrays
            if (JSON.stringify(currentProducts) === JSON.stringify(newProducts)) {
                 setMayLikeLoading(false);
                 return currentProducts; // Return existing reference if content is identical
            }
            setMayLikeLoading(false);
            return newProducts; // Update state
        });
    } catch (err) {
        setMayLikeError(err);
    } finally {
        // We moved setLoading into the setter above, so this block is now optional
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
