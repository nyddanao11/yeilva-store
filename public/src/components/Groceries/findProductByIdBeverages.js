import {beer} from './BeveragesData';
// findProductById.js
const findProductByIdBeverages = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = beer.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdBeverages;
