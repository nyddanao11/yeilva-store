import React, { useState, useMemo, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ImageAllDeals from '../components/ImageAllDeals';
import YouMayLike from '../components/YouMayLike';
import './AllDealsProduct.css';

const PRODUCTS_PER_PAGE = 10;

const ProductCard = ({ product, addToCart }) => {
  if (!product?.url || !product?.name || !product?.price || !product?.id) {
    return null;
  }

  return (
    <Col xs={6} md={4} lg={3} xl={2} className="mb-4">
      <ImageAllDeals
        url={product.url}
        name={product.name}
        price={product.price}
        id={product.id}
        stock={product.stock}
        discount={product.discount}
        addToCart={addToCart}
      />
    </Col>
  );
};

const ProductCardSkeleton = () => (
  <Col xs={6} md={4} lg={3} xl={2} className="mb-4">
    <div className="product-skeleton" />
  </Col>
);

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  if (totalPages <= 1) return null;

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination d-flex justify-content-center align-items-center mt-2 flex-wrap">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <BsChevronLeft />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active-page' : ''}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <BsChevronRight />
      </button>
    </div>
  );
};

const EmptyCategoryState = ({ selectedCategory, onReset }) => (
  <div className="empty-deals-state text-center py-5">
    <p className="mb-2 fw-bold">No deals in {selectedCategory} right now</p>
    <p className="text-muted mb-3">New deals get added all the time — check back soon.</p>
    <Button variant="outline-dark" size="sm" onClick={onReset}>
      View all deals
    </Button>
  </div>
);

export default function AllDealsProduct({
  addToCart,
  allDealsProduct,
  youMayLikeProducts,
  mayLikeLoading,
  mayLikeError,
  dealsLoading = false,
}) {
  const [selectedCategory, setSelectedCategory] = useState('All Deals');
  const [currentPage, setCurrentPage] = useState(1);

  const formattedCategory = (cat) =>
    cat
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

  const categoryLabels = useMemo(() => {
    if (!Array.isArray(allDealsProduct)) return ['All Deals'];
    return [
      'All Deals',
      ...new Set(allDealsProduct.map((item) => formattedCategory(item.category))),
    ];
  }, [allDealsProduct]);

  // Filter by category FIRST, then paginate over the filtered set.
  // This guarantees pagination always matches what's actually visible.
  const categoryFilteredProducts = useMemo(() => {
    if (!Array.isArray(allDealsProduct)) return [];
    if (selectedCategory === 'All Deals') return allDealsProduct;
    return allDealsProduct.filter(
      (item) => formattedCategory(item.category) === selectedCategory
    );
  }, [allDealsProduct, selectedCategory]);

  const totalPages = Math.max(
    1,
    Math.ceil(categoryFilteredProducts.length / PRODUCTS_PER_PAGE)
  );

  // Keep currentPage valid whenever the filtered set shrinks (e.g. category switch)
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    return categoryFilteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
  }, [categoryFilteredProducts, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetCategory = () => setSelectedCategory('All Deals');

  if (dealsLoading) {
    return (
      <Container>
        <div className="category-buttons-wrapper mb-3 mt-3 d-flex overflow-auto">
          <div className="category-skeleton" />
        </div>
        <Row>
          {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </Row>
      </Container>
    );
  }

  if (!Array.isArray(allDealsProduct) || allDealsProduct.length === 0) {
    return (
      <Container>
        <div className="empty-deals-state text-center py-5">
          <p className="mb-0 fw-bold">No deals available right now</p>
          <p className="text-muted">Check back soon for new offers.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="category-buttons-wrapper mb-3 mt-3 d-flex overflow-auto">
        {categoryLabels.map((category, index) => (
          <Button
            key={index}
            variant={selectedCategory === category ? 'dark' : 'outline-secondary'}
            className="me-2"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {paginatedProducts.length === 0 ? (
        <EmptyCategoryState selectedCategory={selectedCategory} onReset={handleResetCategory} />
      ) : (
        <Row>
          {paginatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </Row>
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />

      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts} />
    </Container>
  );
}
