import {notebook} from './NotebookData';
// findProductById.js
const findProductByIdNotebook = (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = notebook.find(
    (product) => product.id === productId
  );
  return product;
};


export default findProductByIdNotebook;
