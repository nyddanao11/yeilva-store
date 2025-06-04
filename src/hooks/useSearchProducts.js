// hooks/useSearchProducts.js
import { useContext } from 'react';
import {  SearchProductsContext } from '../pages/SearchProductContext'; // Adjust path

const useSearchProducts = () => {
  return useContext(SearchProductsContext);
};

export default useSearchProducts;