import {cooking} from './CookingItemsData';
// findProductById.js
const findProductByIdCooking = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = cooking.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdCooking;
