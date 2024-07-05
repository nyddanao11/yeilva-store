import {earphoneData} from './EarphoneData';
// findProductById.js
const findProductByIdEarphone = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = earphoneData.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdEarphone;
