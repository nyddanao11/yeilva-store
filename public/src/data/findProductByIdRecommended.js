import { recommendedProducts} from './recommendedProducts';
// findProductById.js
const findProductByIdRecommended= (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = recommendedProducts.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdRecommended;
