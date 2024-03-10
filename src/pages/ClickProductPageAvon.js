import React,{useState} from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import findProductByIdAvon from '../data/findProductByIdAvon';
import './ClickProductPage.css';
import FeaturedProduct from'../components/FeaturedProduct';
import BreadCrumbAvon from'../components/BreadCrumbAvon';
import TabbedComponentAvon from'../components/ProductTablatureAvon';


const ClickProductPageAvon = ({ addToCart }) => {
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
  const product = findProductByIdAvon(id);

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
    <Container>
        <Row className="justify-content-center">
          <BreadCrumbAvon productId={product.id} />
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center" 
        style={{border:'1px #d3d4d5 solid', paddingTop:'10px'}}>
          
          <div className="main-image-container">
                        <Image
                          src={selectedThumbnails[product.id] || product.url}
                          alt={product.name}
                          className="main-image"
                        />
                      </div>
                      <div className="thumbnails">
                        {product.thumbnails.map((thumb, id) => (
                          <img
                            key={id}
                            src={thumb}
                            alt={`Thumbnail ${id}`}
                            onClick={() => handleThumbnailClick(product.id, thumb)}
                            className="thumbnail-image"
                          />
                        ))}
                      </div>
        </Col>

        {/* Product Information */}
        <Col xs={12} md={6}>
          <h2>{product.name}</h2>
          <h6>Price: ₱{product.price}</h6>
          <p>Description: {product.description}</p>

          {/* Add to Cart Button */}
          <Button variant="primary" onClick={() => addToCart(product)}>
            Add to Cart
          </Button>
           <Button variant="primary" onClick={handleCheckoutClick} className="mx-3">
            Buy Now
          </Button>
        </Col>
      </Row>

       <Row style={{marginBottom:'60px', marginTop:'60px'}}>
        <Col>
        <TabbedComponentAvon  productId={product.id} />
        </Col>

      </Row>

       <Row style={{marginTop:"25px"}}>

      <div className="line" style={{marginBottom:'30px'}}>
      <h4 className="text">You May also Like</h4>
      </div>
     <FeaturedProduct addToCart={addToCart}/>
      </Row>
    </Container>
  );
};

export default ClickProductPageAvon;
