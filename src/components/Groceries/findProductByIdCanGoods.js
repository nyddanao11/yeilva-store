import {canned} from './CanGoodsData';
// findProductById.js
const findProductByIdCanGoods = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = canned.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdCanGoods;
