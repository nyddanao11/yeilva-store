import { useContext } from 'react';
import { RecommendedProductsContext } from '../pages/RecommendedProductsContext'; // Adjust path

const useRecommendedProducts = () => {
  return useContext(RecommendedProductsContext);
};

export default useRecommendedProducts;