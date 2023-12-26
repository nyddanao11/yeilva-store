import { beautyProductsData } from './BeautyProductsData';
// findProductById.js
const findProductByIdBeauty = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = beautyProductsData.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdBeauty;
