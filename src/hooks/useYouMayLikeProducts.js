// hooks/useFeaturedProducts.js
import { useContext } from 'react';
import { YouMayLikeProductContext } from '../pages/YouMayLikeProductContext'; // Adjust path

const useYouMayLikeProducts = () => {
  return useContext(YouMayLikeProductContext);
};

export default useYouMayLikeProducts;