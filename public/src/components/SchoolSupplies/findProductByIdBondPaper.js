import {bondpaper} from './BondPaperData';
// findProductById.js
const findProductByIdBondPaper = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = bondpaper.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdBondPaper;
