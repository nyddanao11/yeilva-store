import { dealsFashion } from './DealsFashion';
// findProductById.js
const findProductByIdDealsFashion = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = dealsFashion.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdDealsFashion ;

