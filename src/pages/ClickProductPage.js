import React,{useState} from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams, useNavigate} from 'react-router-dom';
import findProductById from '../data/findProductById';
import './ClickProductPage.css';
import FeaturedProduct from'../components/FeaturedProduct';
import BreadCrumbNav from'../components/BreadCrumbNav';
import TabbedComponent from'../components/ProductTablature';
import { FaStar} from 'react-icons/fa';


const ClickProductPage = ({ addToCart }) => {
  const { id } = useParams();
 

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

  const product = findProductById(id);

  if (!product) {
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
          <BreadCrumbNav productId={product.id} />
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center">
          
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
        <Col xs={12} md={6}>
          <h2>{product.name}</h2>
          <h6>₱{product.price}</h6>
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

       <Row>
        <Col>
         <div style={{marginTop:"45px", marginBottom:"45px"}}>
        <TabbedComponent  productId={product.id}/>
        </div>
        </Col>

      </Row>

      <Row style={{marginTop:"25px"}}>
      <hr></hr>
    <h3 className='d-flex justify-content-center mb-3'>You May also Like</h3>
     <FeaturedProduct addToCart={addToCart} />
      </Row>
    </Container>
  );
};

export default ClickProductPage;
