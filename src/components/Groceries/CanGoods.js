import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import {canned} from'./CanGoodsData';
import {Link} from'react-router-dom';
import'./SoldOutLabel.css';
import { FaShoppingCart } from 'react-icons/fa';

const CannedGoods = ({ addToCart, cartItems, product, currentPage, setCurrentPage}) => {
  
  const isProductSoldOut = (product) => {
    // Replace this condition with your own logic for determining if a product is sold out
    return product.stock <= 0;
  };


  const visibleProducts = canned.filter((product) => product.page === currentPage);

const totalPages = Math.max(...canned.map((product) => product.page));
const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

const handlePageChange = (newPage) => {
  setCurrentPage(newPage);
};
  
  return (
       <Container fluid>
      <Row>
        {/* Main Content Area for Grocery Items */}
        <Col sm={10}>
          <Row className="mt-4">
          <div className="d-flex justify-content-center align-items-center mb-2">
           <h6> Can Goods</h6>
           </div>
            {/* Display Grocery Items */}
            {visibleProducts.map((product) => (
              <Col sm={3} xs={6} key={product.id}>
                <Card className="product-card mb-4 shadow-sm  " >
                  <Card.Body className="d-flex flex-column align-items-center justify-content-center">
                    {isProductSoldOut(product) && <div className="sold-out-label">Sold Out</div>}

                   <Link to={`/clickcangoods/${product.id}`}>
                    <Card.Img 
                    variant="top" 
                    src={product.url} alt={product.name}
                    className="products-card" 
                    style={{ maxHeight:"75px", objectFit:"cover"}}/>
                   </Link>

                    <Card.Title style={{fontSize:"14px"}}>{product.name}</Card.Title>
                    <Card.Text style={{margin:"0px"}}> ₱{product.price}</Card.Text>
                   
                    <Button variant="primary" size="sm" style={{fontSize:"10px", width:"100%"}} onClick={() => addToCart(product)}> <FaShoppingCart style={{fontSize:'10px'}} />AddToCart</Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

       <div className="pagination">
        {pageNumbers.map((page) => (
                  <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={currentPage === page ? 'active-page' : ''}
            style={{
              marginRight: "5px",
              border: "none",
              background: currentPage === page ? ' #0D6EFD' : '#EFEFEF',
              color: currentPage === page ? 'white' : 'black',
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </Container>
  );
};

export default CannedGoods;
