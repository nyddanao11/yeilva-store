import {ballpen} from './BallpenMarkerData';
// findProductById.js
const findProductByIdMarker = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = ballpen.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdMarker;
