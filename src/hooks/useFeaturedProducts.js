// hooks/useFeaturedProducts.js
import { useContext } from 'react';
import { FeaturedProductsContext } from '../pages/FeaturedProductsContext'; // Adjust path

const useFeaturedProducts = () => {
  return useContext(FeaturedProductsContext);
};

export default useFeaturedProducts;