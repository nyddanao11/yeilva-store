import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ClickProductPage.css';
import BreadCrumbNav from '../components/BreadCrumbNav';
import TabbedComponent from '../components/ProductTablature';
import axios from 'axios';
import YouMayLike from '../components/YouMayLike';
import { FaShippingFast } from 'react-icons/fa';

export default function ClickProductPage({ addToCart, isLoggedIn, storedProducts, allProducts, youMayLikeProducts }) {
  const { id } = useParams();
  const [selectedThumbnails, setSelectedThumbnails] = useState({});
  const [reviewData, setReviewData] = useState([]);
  const [freeShippingPlace, setFreeShippingPlace] = useState(false);
  const navigate = useNavigate();
     const [showModal, setShowModal] = useState(false);
   const [modalMessage, setModalMessage] = useState('');
 
 const handleClose = () => setShowModal(false);
  const handleShowModal = (message) => {
  setModalMessage(message);
  setShowModal(true);
};
const handleLoginRedirect = () => {
    setShowModal(false);
    // Redirect to login page
    window.location.href = '/login'; // or use navigate('/login') if using react-router
  };

  // Find the product here. It's fine to define it at the top.
  const product = storedProducts.find(p => p.id === parseInt(id));

  // --- All Hooks must be called before any conditional returns ---

  useEffect(() => {
    // Only run this effect if product is defined
    if (product && product.place === 'maslog') {
      setFreeShippingPlace(true);
    } else if (product && product.place !== 'maslog') { // Reset if product exists but place is not maslog
      setFreeShippingPlace(false);
    }
    // The dependency array should include product.place to react to changes
  }, [product]); // Dependency on the product object itself to re-run when product loads or changes

  useEffect(() => {
    const fetchReviews = async () => {
      // Only fetch reviews if product is defined and has a name
      if (product && product.name) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userreviews?productName=${product.name}`);
          setReviewData(response.data);
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      } else {
        // Clear review data if product or product.name is not available
        setReviewData([]);
      }
    };
    fetchReviews();
  }, [product]); // Dependency on the product object itself

  // --- Now, you can safely put your conditional return ---
  if (!product) {
    return (
      <Container>
        <Row>
          <Col>
            {/* You might want a loading spinner or a more descriptive message here */}
            <div>Product not found or loading...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  // --- All other calculations and functions that depend on 'product' go here,
  //     after the conditional return for 'product' being defined. ---

  const stockState = product.stock;
  const stockStatus = () => {
    return stockState <= 0;
  };

  const isProductDiscounted = () => {
    return (product.discount || 0) > 0;
  };

  const calculateDiscountedPrice = () => {
    if (isProductDiscounted()) {
      return (product.price * (1 - (product.discount || 0) / 100));
    }
    return product.price;
  };

  const originalPriceFormatted = product.price.toFixed(2);
  const discountedPriceCalculated = calculateDiscountedPrice();
  const discountedPriceFormatted = discountedPriceCalculated.toFixed(2);

  const averageRating = reviewData.length > 0
    ? Math.round(reviewData.reduce((acc, review) => acc + review.rating, 0) / reviewData.length)
    : 0;

  const handleThumbnailClick = (itemId, imageUrl) => {
    setSelectedThumbnails((prev) => ({
      ...prev,
      [itemId]: imageUrl,
    }));
  };

  const handleAddToCartClick = () => {
    const productToAdd = {
      ...product,
      price: isProductDiscounted() ? discountedPriceCalculated : product.price,
      originalPrice: product.price,
      discountApplied: isProductDiscounted() ? (product.discount || 0) : 0,
      displayPrice: discountedPriceFormatted
    };

    addToCart(productToAdd);
  };

  const handleCheckoutClick = () => {
     if (!isLoggedIn) {
   handleShowModal('Please login to continue')
    return; // Exit the function if the user is not logged in
  }else{
      navigate('/checkout'); // Redirect to checkout
  }
    const productToCheckout = {
      ...product,
      price: isProductDiscounted() ? discountedPriceCalculated : product.price,
      originalPrice: product.price,
      discountApplied: isProductDiscounted() ? (product.discount || 0) : 0,
      displayPrice: discountedPriceFormatted
    };
    addToCart(productToCheckout);
    navigate('/checkout');
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}>&#9733;</span>);
      } else {
        stars.push(<span key={i}>&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <>
      <Container className="mt-3">
        <Row className="justify-content-center">
          {product && storedProducts && <BreadCrumbNav productId={product.id} storedProducts={storedProducts} />}
          <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center"
            style={{ border: '1px #d3d4d5 solid', paddingTop: '10px' }}>

            <div className="main-image-container">
              <Image
                src={selectedThumbnails[product.id] || product.url}
                alt={product.name}
                className="main-image"
              />
            </div>
            <div className="thumbnails mb-2">
              {product.thumbnails.map((thumb, idx) => (
                <img
                  key={idx}
                  src={thumb}
                  alt={`Thumbnail ${idx}`}
                  onClick={() => handleThumbnailClick(product.id, thumb)}
                  className="thumbnail-image"
                />
              ))}
            </div>
          </Col>
          <Col xs={12} md={6} className='mt-2'>
            <h2>{product.name}</h2>
            <p style={{ marginBottom: '12px' }}>Description: {product.description}</p>

            {isProductDiscounted() ? (
            <div className="d-flex">
                <h6 className="original-price" style={{ textDecoration: 'line-through', color: '#888' }}>₱{originalPriceFormatted}</h6>{' '}
                <h6 className="discounted-price">₱{discountedPriceFormatted} -{product.discount}% </h6>
              </div>
            ) : (
              <h6>₱{originalPriceFormatted}</h6>
            )}

            <div className="d-flex flex-column mb-1">
              <div className="d-flex">
                <div className="text-warning me-1 mb-1" style={{ fontSize: "18px" }}>
                  {renderStars(averageRating)}
                </div>
                <span>{averageRating}</span>
                <span className="mx-3"> Reviews: {reviewData.length} </span>
              </div>
            </div>

            <p style={{ color: product.stock === 0 ? "red" : "#067d62", fontWeight: "400", marginBottom: "12px" }}>
              {product.stock === 0 ? "Out of stock" : "In stock"}
            </p>
            {freeShippingPlace ? (<p style={{ color: "#067d62", marginBottom: "10px" }}><FaShippingFast /> FreeShipping </p>) : (<p></p>)}
            {freeShippingPlace ? (<p style={{ display: 'flex', alignItems: 'center', fontSize: '15px', color: 'red', marginBottom: '12px' }}>
              Not Available outside Danao City</p>) : (<p></p>)}

            <Button variant="primary" onClick={handleAddToCartClick} disabled={stockStatus()}>
              Add to Cart
            </Button>

            <Button variant="primary" onClick={handleCheckoutClick} className="mx-3" disabled={stockStatus()}>
              Buy Now
            </Button>

          </Col>
        </Row>

        <Row style={{ marginBottom: '60px', marginTop: '60px' }}>
          <Col>
            <TabbedComponent productId={product.id} storedProducts={storedProducts} />
          </Col>
        </Row>
          <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Authentication Required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  {modalMessage}
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleLoginRedirect}>
                    Log In
                  </Button>
                </Modal.Footer>
              </Modal>

      </Container>
      <YouMayLike addToCart={addToCart} allProducts={allProducts} youMayLikeProducts={youMayLikeProducts}/>
    </>
  );
}