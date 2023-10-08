import { homeProducts} from './homeProducts';
// findProductById.js
const findProductByIdFeatured= (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = homeProducts.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdFeatured;
