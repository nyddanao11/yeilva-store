import React,{useState} from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import findProductByIdMensShoes from './findProductByIdMensShoes';
import './ClickWomens.css';
import '../LoanForm.css';
import BreadCrumbMensShoes from'./BreadCrumbMensShoes'
import YouMayLike from'../YouMayLike';

const ClickMensShoes = ({ addToCart }) => {
  const { id } = useParams();
  console.log('ID from URL:', id);


  const [selectedThumbnails, setSelectedThumbnails] =  useState({});

 
  const handleThumbnailClick = (itemId, imageUrl) => {
    // Update the selected thumbnail for the specific item
    setSelectedThumbnails((prevSelectedThumbnails) => ({
      ...prevSelectedThumbnails,
      [itemId]: imageUrl,
    }));
  };

   const navigate = useNavigate();

  const handleCheckoutClick = () => {
    // Add the product to the cart
    addToCart(product);
    // Navigate to checkout and pass the product ID as a URL parameter
    navigate(`/checkout`);
  };

  // Find the product by ID
  const product = findProductByIdMensShoes(id);
     const stockState = product.stock;
 const stockStatus = () => {
  return stockState <= 0;
};

  if (!product) {
    // Handle the case where the product with the specified ID is not found
    return (
      <Container>
        <Row>
          <Col>
            <div>Product not found</div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <>
    <Container  className="mt-3">
     <Row className="justify-content-center">
        <BreadCrumbMensShoes productId={product.id} />

        <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center" 
        style={{border:'1px #d3d4d5 solid', paddingTop:'10px'}}>
        <div className="main-image-container">
                        <Image
                          src={selectedThumbnails[product.id] || product.url}
                          alt={product.name}
                          className="main-image"
                        />
                      </div>
                      <div className="thumbnails mb-2">
                       {product.thumbnails.map((thumb, index) => (
                          <img
                            key={index}
                            src={thumb}
                            alt={`Thumbnail ${index}`}
                            onClick={() => handleThumbnailClick(product.id, thumb)}
                            className="thumbnail-image"
                          />
                        ))}

                      </div>
        </Col>

        {/* Product Information */}
        <Col xs={12} md={6}>
          <h2>{product.name}</h2>
          <p>Price: ₱{product.price}</p>
          <p>Description: {product.description}</p>

          {/* Add to Cart Button */}
   <p style={{ color: product.stock === 0 ? "red" : "#067d62", fontWeight: "400" }}>
  {product.stock === 0 ? "Out of stock" : "In stock"}
</p>
        <Button variant="primary" onClick={() => addToCart(product)} disabled={stockStatus()}>
      Add to Cart
    </Button>
    <Button variant="primary" onClick={handleCheckoutClick} className="mx-3" disabled={stockStatus()}>
      Buy Now
    </Button>
        </Col>
      </Row>
     </Container>
     <YouMayLike />
     </>
  );
};

export default ClickMensShoes;
