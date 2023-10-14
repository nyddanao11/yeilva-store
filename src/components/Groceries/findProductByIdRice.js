import {rice} from './RiceData';
// findProductById.js
const findProductByIdRice = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = rice.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdRice;
