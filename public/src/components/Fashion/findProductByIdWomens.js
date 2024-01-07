import {womens} from './womensData';
// findProductById.js

const findProductByIdWomens= (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = womens.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdWomens;
