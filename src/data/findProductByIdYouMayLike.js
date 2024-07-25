import { youMayLikeData} from './YouMayLikeData';
// findProductById.js
const findProductByIdYouMayLike = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product =  youMayLikeData.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdYouMayLike;
