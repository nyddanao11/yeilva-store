import { pcproductsData} from './pcproductsData';
// findProductById.js
const findProductByIdPc = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = pcproductsData.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdPc;
