import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'react-bootstrap';

/**
 * Reusable breadcrumb for product detail pages reached from a listing page
 * (All Deals, Featured Products, Best Sellers, etc).
 *
 * Renders: Home > {rootLabel} > {category, if available} > {product name}
 *
 * Props:
 * - rootLabel: e.g. "Deals", "Featured", "Best Sellers"
 * - rootPath: e.g. "/alldealsproduct"
 * - product: the resolved product object (already looked up by the parent
 *   page — this component does not search allDealsProduct itself, since
 *   different listing pages may use different product arrays/contexts)
 * - categoryParam: name of the URL query param the listing page reads to
 *   pre-filter by category. Defaults to "category".
 */
const BreadCrumb = ({ rootLabel, rootPath, product, categoryParam = 'category' }) => {
  const categoryLink =
    product?.category && `${rootPath}?${categoryParam}=${encodeURIComponent(product.category)}`;

  return (
    <Breadcrumb className="mb-4 deals-breadcrumb" style={{ fontSize: '0.9rem' }}>
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
        Home
      </Breadcrumb.Item>

      <Breadcrumb.Item linkAs={Link} linkProps={{ to: rootPath }}>
        {rootLabel}
      </Breadcrumb.Item>

      {categoryLink && (
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: categoryLink }}>
          {product.category}
        </Breadcrumb.Item>
      )}

      {product && (
        <Breadcrumb.Item active className="text-truncate" style={{ maxWidth: '240px' }}>
          {product.name}
        </Breadcrumb.Item>
      )}
    </Breadcrumb>
  );
};

export default BreadCrumb;
