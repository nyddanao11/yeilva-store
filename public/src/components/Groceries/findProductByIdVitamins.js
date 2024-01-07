import {vitamins} from './VitaminsMedicationsData';
// findProductById.js
const findProductByIdVitamins = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = vitamins.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdVitamins;
