import {womensshoes} from './WomensShoesData';
// findProductById.js

const findProductByIdWomensShoes= (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = womensshoes.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdWomensShoes;
