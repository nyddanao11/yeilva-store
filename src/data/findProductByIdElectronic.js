import { dealsElectronicData } from './DealsElectronicData';
// findProductById.js
const  findProductByIdElectronic= (id) => {
  // Convert id to a number (if it's not already) and search for the product
  const productId = Number(id);
  const product = dealsElectronicData.find(
    (product) => product.id === productId
  );
  return product;
  console.log(product);
};


export default  findProductByIdElectronic;

