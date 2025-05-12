// hooks/useFeaturedProducts.js
import { useContext } from 'react';
import { BestSellingContext } from '../pages/BestSellingContext'; // Adjust path

const useBestSellingProducts = () => {
  return useContext(BestSellingContext);
};

export default useBestSellingProducts;