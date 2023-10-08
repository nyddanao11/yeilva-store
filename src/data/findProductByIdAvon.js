import {avonproductsData} from './AvonProductsData';
// findProductById.js
const findProductByIdAvon = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = avonproductsData.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdAvon;
