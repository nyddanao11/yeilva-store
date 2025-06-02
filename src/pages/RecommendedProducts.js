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
    <Container>
      <Row className="d-flex justify-content-center align-items-center ">
        <div className="d-flex justify-content-center align-items-center mb-2 mt-3">
          <h4
            className="text-center"
            style={{
              color: 'green',
              border: '1px solid green',
              borderRadius: '10px',
              maxWidth: '530px',
              padding: '8px',
            }}
          >
          Recommended Products
          </h4>
        </div>
        {visibleProducts.map((product) => (
         
          <Col key={product.id} md={3} xs={6} lg={2}>
            <div >
              <ImageCardRecommendedProduct
                url={product.url}
                name={product.name}
                price={product.price}
                thumbnails={product.thumbnails}
                addToCart={addToCart}
                product={product}
              />
            </div>
          </Col>     

        ))}
      </Row>
  <div className="pagination d-flex justify-content-center align-items-center mt-2 ">
  <button
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
    style={{
      marginRight: "5px",
      border: "none",
      background: currentPage === 1 ? '#EFEFEF' : '#0D6EFD',
      color: currentPage === 1 ? 'gray' : 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <BsChevronLeft />
  </button>

  {pageNumbers.map((page) => (
    <button
      key={page}
      onClick={() => handlePageChange(page)}
      className={currentPage === page ? 'active-page' : ''}
      style={{
        marginRight: "5px",
        border: "none",
        background: currentPage === page ? '#0D6EFD' : '#EFEFEF',
        color: currentPage === page ? 'white' : 'black',
      }}
    >
      {page}
    </button>
  ))}

  <button
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
    style={{
      marginLeft: "5px",
      border: "none",
      background: currentPage === totalPages ? '#EFEFEF' : '#0D6EFD',
      color: currentPage === totalPages ? 'gray' : 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <BsChevronRight />
  </button>
</div>


    </Container>
  );
}