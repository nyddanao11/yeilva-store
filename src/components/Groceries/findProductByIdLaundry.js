import {laundry} from './LaundryPersonalCareData';
// findProductById.js
const findProductByIdLaundry = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = laundry.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdLaundry;
