import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import ImageProduct from '../components/ImageProduct';
import YouMayLike from '../components/YouMayLike';
import './ProductPageUpdate.css'; // Example CSS Module

const ProductCard = ({ product, addToCart }) => {
  if (!product?.url || !product?.name || !product?.price || !product?.id) {
    console.error('Invalid product data:', product);
    return <Col md={2} xs={6} lg={2}><div>Product data missing.</div></Col>; //displaying a message instead of nothing.
  }

  return (
    <Col key={product.id} md={2} xs={6} lg={2}>
      <div className="product-card">
        <ImageProduct
          url={product.url}
          name={product.name}
          price={product.price}
          id={product.id}
          stock={product.stock}
          discount={product.discount}
          addToCart={addToCart}
        />
      </div>
    </Col>
  );
};

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="pagination d-flex justify-content-center align-items-center mt-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <BsChevronLeft />
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={currentPage === page ? 'active-page' : ''}
          aria-label={`Go to page ${page}`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
      >
        <BsChevronRight />
      </button>
    </div>
  );
};

export default function ProductsData({ addToCart, currentPage, setCurrentPage, storedProducts, youMayLikeProducts}) {
  const visibleProducts = storedProducts.filter((item) => item.page === currentPage);
   // Safe extraction of the active page's current category identity
  const currentCategoryName = visibleProducts.length > 0 && visibleProducts[0].category
    ? visibleProducts[0].category
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "Premium Assets";

  const totalPages = storedProducts.length > 0 ? Math.max(...storedProducts.map((item) => item.page)) : 1;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Container className="my-4 px-2 px-sm-3">
      <Row className="d-flex justify-content-center align-items-center">
       
        <div className="category-header-wrapper mb-4 border-bottom border-light-subtle pb-2">
        <h4 className="fw-black text-dark tracking-tight mb-0 position-relative d-inline-block pb-2">
          {currentCategoryName}
          <span className="position-absolute bottom-0 start-0 bg-primary rounded-pill" style={{ width: '40px', height: '3px' }}></span>
        </h4>
      </div>
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </Row>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange}
      />
      <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts }/>
    </Container>
  );
}