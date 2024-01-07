import {mens} from './MensData';
// findProductById.js

const findProductByIdMens= (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = mens.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdMens;
