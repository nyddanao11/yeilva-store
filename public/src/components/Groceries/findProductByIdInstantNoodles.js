import {Noodles} from './InstantNoodlesData';
// findProductById.js
const findProductByIdInstantNoodles = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = Noodles.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdInstantNoodles;
