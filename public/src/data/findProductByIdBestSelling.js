import { bestSellingProducts} from './bestSellingProducts';
// findProductById.js
const findProductByIdBestSelling = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = bestSellingProducts.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdBestSelling;
