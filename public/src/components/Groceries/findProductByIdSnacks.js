import {snacks} from './SnacksData';
// findProductById.js
const findProductByIdSnacks = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = snacks.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdSnacks;
