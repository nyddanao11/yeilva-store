import {speakerData } from './SpeakerData';
// findProductById.js
const findProductByIdSpeaker= (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = speakerData.find(
    (product) => product.id === productId
  );
  return product;
};

export default findProductByIdSpeaker;
