import {alcoholic} from './AlcoholicDrinksData';
// findProductById.js
const findProductByIdAlcoholic = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = alcoholic.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdAlcoholic;
