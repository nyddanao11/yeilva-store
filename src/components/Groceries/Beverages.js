import React from 'react';
import { Container, Row, Col, Card} from 'react-bootstrap';
import {beer} from'./BeveragesData';
import {Link} from'react-router-dom';
import'./SoldOutLabel.css';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

export default function Beverages ({cartItems, product, currentPage, setCurrentPage})  {

  const isProductSoldOut = (product) => {
    // Replace this condition with your own logic for determining if a product is sold out
    return product.stock <= 0;
  };


  const visibleProducts = beer.filter((product) => product.page === currentPage);

const totalPages = Math.max(...beer.map((product) => product.page));
const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};
  

  
  
  return (
    <Container fluid >
      <Row>

        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
          <div className="d-flex justify-content-center align-items-center mb-2">
           <h6> Beverages </h6>
           </div>
            {/* Display Grocery Items */}
            {visibleProducts.map((product) => (
             
              <Col sm={3} xs={6} key={product.id} className="d-flex  align-items-center justify-content-center" >
                <Card className="product-card mb-4 shadow-sm  " >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    {isProductSoldOut(product) && <div className="sold-out-label">Sold Out</div>}
                   <Link to={`/clickbeverages/${product.id}`}>
                   
                    <Card.Img 
                    variant="top" 
                    src={product.url} alt={product.name}
                    className="products-card" 
                    style={{ maxHeight:"75px", objectFit:"cover"}}/>
                  
                   </Link>

                    <Card.Title style={{fontSize:"14px"}}>{product.name}</Card.Title>
                    <Card.Text style={{margin:"0px"}}> ₱{product.price}</Card.Text>
   
                  </Card.Body>
                </Card>
              </Col>
            ))}
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
          </Row>
        </Col>
      </Row>
      
    </Container>
  );
};

