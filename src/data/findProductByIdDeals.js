import { deals } from './DealsData';
// findProductById.js
const findProductById = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = deals.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductById;

