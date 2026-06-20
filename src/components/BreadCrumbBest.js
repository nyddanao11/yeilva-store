import React from 'react';
import BreadCrumb from './BreadCrumb';

/**
 * Deals-page breadcrumb. Looks up the product from allDealsProduct and
 * delegates rendering to the shared BreadCrumb component.
 *
 * NOTE: previously this component also tracked a `clickedItems` state array
 * intended to build up a clickable trail, but it was never actually
 * populated on navigation and the rendered items had no working link, so
 * it never functioned. Removed in favor of a real category breadcrumb.
 */
const BreadCrumbBest = ({ productId, bestSellingProducts}) => {
  const selectedProduct = bestSellingProducts?.find((item) => item.id === productId);

  return (
    <BreadCrumb
      rootLabel="Content Creation"
      rootPath="/bestsellingproduct"
      product={selectedProduct}
      categoryParam="category"
    />
  );
};
export default BreadCrumbBest;



