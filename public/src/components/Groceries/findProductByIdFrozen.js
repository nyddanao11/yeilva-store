import {Frozen} from './FrozenFoodsData';
// findProductById.js
const findProductByIdFrozen = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = Frozen.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdFrozen;
