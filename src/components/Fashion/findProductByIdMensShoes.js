import {mensshoes} from './MensShoesData';
// findProductById.js

const findProductByIdMensShoes= (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = mensshoes.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdMensShoes;
