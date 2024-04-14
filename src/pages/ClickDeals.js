import React,{useState} from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import findProductByIdDeals from '../data/findProductByIdDeals';
import './ClickProductPage.css';
import FeaturedProduct from'../components/FeaturedProduct';
import BreadCrumbDeals from'../components/BreadCrumbDeals';
import TabbedComponent from'../components/ProductTablatureDeals';
import { FaStar} from 'react-icons/fa';


const ClickDeals= ({ addToCart }) => {
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
  const product = findProductByIdDeals(id);

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
    <Container  className="mt-3 p-2">
             <Row className="justify-content-center">
        <BreadCrumbDeals productId={product.id} />

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
        <Col xs={12} md={6}>
          <h2>{product.name}</h2>
          <div >
                    <span className="text-muted ms-1" ><strike>₱{product.discountedPrice}</strike></span>
                  <span className="ms-2 " style={{paddingLeft:"2px", color:"black", fontWeight:"bold", fontSize:"16px"}}>₱{product.price}</span>
                  <span style={{paddingLeft:"6px", color:"red", fontWeight:"bold", fontSize:"16px"}}>{product.percentage}</span>
          </div>
          <p>Description: {product.description}</p>
           <div className="d-flex flex-column mb-3">
                  <div className="d-flex ">
                    <span className="text-warning me-1 mb-2">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <FaStar key={index} />
                      ))}
                    </span>
                    <span className="text-muted">{product.rating}</span>
                    <span className="mx-3"> Number of Reviews: {product.reviews.length} </span>
                  </div>
              </div>
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
        <TabbedComponent  productId={product.id} />
        </Col>

      </Row>

       <Row style={{marginTop:"25px"}}>

      <div className="line" style={{marginBottom:'30px'}}>
      <h4 className="text">You May also Like</h4>
      </div>

     <FeaturedProduct addToCart={addToCart} />
      </Row>
    </Container>
  );
};

export default ClickDeals;
