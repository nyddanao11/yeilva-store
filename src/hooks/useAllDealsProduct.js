// hooks/useSearchProducts.js
import { useContext } from 'react';
import {  AllDealsProductsContext } from '../pages/AllDealsProductContext'; // Adjust path

const useAllDealsProduct = () => {
  return useContext(AllDealsProductsContext);
};

export default useAllDealsProduct;