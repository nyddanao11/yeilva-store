import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ImageCardRecommendedProduct from'../components/ImageCardRecommendedProduct';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

// Dynamic Import for wellnessProductData
export default function RecommendedProduct({ addToCart, currentPage, setCurrentPage, recommendedProducts, recommendedLoading, recommendedError}) {

 const visibleProducts = recommendedProducts.filter((product) => product.page === currentPage);
 console.log('RecommendedProducts', recommendedProducts);
 
const totalPages = Math.max(...recommendedProducts.map((product) => product.page));
const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};

if (recommendedLoading) return <div>Loading...</div>;
  if (recommendedError) return <div>Error fetching recommended products</div>;

  return (
    <Container className="my-5 px-3 px-md-4">
      {/* SECTION HEADER: Re-engineered for a clean, modern aesthetic */}
      <div className="text-center mb-4.5">
        <span className="text-primary text-uppercase tracking-widest fw-black small d-block mb-1.5" style={{ fontSize: '0.72rem' }}>
          Premium Blueprints
        </span>
        <h2 className="fw-black text-dark tracking-tight mb-2" style={{ fontSize: '1.75rem' }}>
          Online Business Creative Blueprints
        </h2>
        <div className="bg-primary mx-auto rounded-pill mb-4" style={{ width: '40px', height: '3px' }}></div>
      </div>

      {/* GRID CONFIGURATION: Engineered to balance density with breathing room */}
      <Row className="g-3 g-md-4 justify-content-center align-items-stretch">
        {visibleProducts.map((product) => (
          <Col key={product.id} xs={6} md={4} lg={3} className="d-flex">
            <div className="w-100 h-100 transition-hover">
             <ImageCardRecommendedProduct
                url={product.url}
                name={product.name}
                price={product.price}
                thumbnails={product.thumbnails}
                stock={product.stock}
                discount={product.discount}
                addToCart={addToCart}
                product={product}
              />
            </div>
          </Col>
        ))}
      </Row>

      {/* PAGINATION: Streamlined controls to eliminate visual noise */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center align-items-center gap-1 mt-4.5 pt-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn d-inline-flex align-items-center justify-content-center rounded-3 p-0 shadow-sm transition"
            style={{
              width: '38px',
              height: '38px',
              border: '1px solid #EAEAEA',
              background: currentPage === 1 ? '#F9F9F9' : '#FFFFFF',
              color: currentPage === 1 ? '#BFBFBF' : '#1A1A1A',
            }}
            aria-label="Previous Page"
          >
            <BsChevronLeft size={14} strokeWidth={0.5} />
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className="btn p-0 d-inline-flex align-items-center justify-content-center rounded-3 font-monospace fw-bold transition"
              style={{
                width: '38px',
                height: '38px',
                fontSize: '0.85rem',
                border: page === currentPage ? '1px solid transparent' : '1px solid #EAEAEA',
                background: page === currentPage ? '#0D6EFD' : '#FFFFFF',
                color: page === currentPage ? '#FFFFFF' : '#1A1A1A',
                boxShadow: page === currentPage ? '0 4px 10px rgba(13, 110, 253, 0.2)' : 'none'
              }}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="btn d-inline-flex align-items-center justify-content-center rounded-3 p-0 shadow-sm transition"
            style={{
              width: '38px',
              height: '38px',
              border: '1px solid #EAEAEA',
              background: currentPage === totalPages ? '#F9F9F9' : '#FFFFFF',
              color: currentPage === totalPages ? '#BFBFBF' : '#1A1A1A',
            }}
            aria-label="Next Page"
          >
            <BsChevronRight size={14} strokeWidth={0.5} />
          </button>
        </div>
      )}
    </Container>
  );
}