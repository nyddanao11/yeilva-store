import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Modal, Spinner, Alert, Fade } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ClickProductPage.css';
import BreadCrumbCartItems from'../components/BreadCrumbCartItems';
import TabbedComponent from'../components/ProductTablatureCartItems';
import axios from 'axios';
import YouMayLike from '../components/YouMayLike';
import { FaShippingFast, FaStar, FaCartPlus, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { useCart } from './CartContext';

export default function ClickCartItem ({ isLoggedIn, youMayLikeProducts })  {
   const {addToCart, cartItems} = useCart();

  const { id } = useParams();
  const navigate = useNavigate();

  // State for product details
  const [product, setProduct] = useState(null); // Will store the found product
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [errorProduct, setErrorProduct] = useState(null);

  // State for reviews
  const [reviewData, setReviewData] = useState([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [errorReviews, setErrorReviews] = useState(null);

  // Other states
  const [addedToCartOnce, setAddedToCartOnce] = useState(false);
  const [freeShippingPlace, setFreeShippingPlace] = useState(false);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleClose = () => setShowModal(false);
  const handleShowModal = (message) => {
    setModalMessage(message);
    setShowModal(true);
  };
  const handleLoginRedirect = () => {
    setShowModal(false);
    window.location.href = '/login';
  };

  // Effect to find the product from bestSellingProducts
  useEffect(() => {
    // Only attempt to find product if bestSellingProducts is available and not empty
    if ( cartItems &&  cartItems.length > 0) {
      const foundProduct = cartItems.find(p => p.id === parseInt(id));
      if (foundProduct) {
        setProduct(foundProduct);
        setLoadingProduct(false); // Product found, stop loading
        setErrorProduct(null); // Clear any previous errors
        setSelectedThumbnail(foundProduct.url); // Set initial selected thumbnail
      } else {
        setProduct(null); // Product not found
        setLoadingProduct(false); // Stop loading even if not found
        setErrorProduct('The requested product was not found.');
      }
    } else {
        // If storedProducts is not yet available, or is empty, keep loading or set an error if it should have products
        // For now, we'll keep loading as `storedProducts` might be fetched asynchronously by the parent.
        // If `storedProducts` is always expected to be non-empty after an initial load,
        // you might want to set `setErrorProduct` here if `storedProducts` remains empty.
        // For instance, if `storedProducts` comes from an API call in the parent:
        // if (!loadingInitialProductsInParent && storedProducts.length === 0) {
        //   setErrorProduct("No products available to display.");
        //   setLoadingProduct(false);
        // }
    }
  }, [id,  cartItems]); // Depend on 'id' and 'storedProducts'

  // Effect to set free shipping place
  useEffect(() => {
    if (product) { // Only run if product is defined
      setFreeShippingPlace(product.place === 'maslog');
    }
  }, [product]); // Dependency on the product object itself to re-run when product loads or changes

  // Effect to fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      if (product && product.name) {
        setLoadingReviews(true);
        setErrorReviews(null);
        try {
          const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userreviews?productName=${product.name}`);
          setReviewData(response.data);
        } catch (error) {
          console.error('Error fetching reviews:', error);
          setErrorReviews('Failed to load reviews.');
          setReviewData([]);
        } finally {
          setLoadingReviews(false);
        }
      } else if (product === null && !loadingProduct) {
        // If product is null and we're no longer loading, reviews can't be fetched
        setReviewData([]);
        setLoadingReviews(false);
      }
    };
    fetchReviews();
  }, [product, loadingProduct]); // Depend on 'product' and 'loadingProduct'

  // Conditional rendering for loading and error states at the top
  if (loadingProduct) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" role="status" className="text-primary">
          <span className="visually-hidden">Loading product...</span>
        </Spinner>
        <p className="ms-3 text-muted">Fetching product details...</p>
      </Container>
    );
  }

  if (errorProduct) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          <Alert.Heading><FaExclamationTriangle className="me-2" />Oh snap! Product not found!</Alert.Heading>
          <p>{errorProduct} Please try again or go back to the homepage.</p>
          <hr />
          <Button variant="danger" onClick={() => navigate('/')}>Go to Home</Button>
        </Alert>
      </Container>
    );
  }

  if (!product) {
    // This case should ideally be caught by errorProduct, but as a fallback
    return (
      <Container className="mt-5">
        <Alert variant="warning" className="text-center">
          <Alert.Heading><FaExclamationTriangle className="me-2" />Product data unavailable.</Alert.Heading>
          <p>The product you are looking for does not exist or could not be loaded. Please verify the URL.</p>
          <hr />
          <Button variant="warning" onClick={() => navigate('/')}>Go to Home</Button>
        </Alert>
      </Container>
    );
  }

  // --- All other calculations and functions that depend on 'product' go here,
  //     after the conditional return for 'product' being defined. ---

  const stockState = product.stock;
  const isOutOfStock = stockState <= 0;

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

  const handleThumbnailClick = (imageUrl) => {
    setSelectedThumbnail(imageUrl);
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
    setAddedToCartOnce(true); // Set to true after adding to cart
  };

  const handleCheckoutClick = () => {
    if (!isLoggedIn) {
      handleShowModal('Please login to continue');
      return;
    }

    const productToCheckout = {
      ...product,
      price: isProductDiscounted() ? discountedPriceCalculated : product.price,
      originalPrice: product.price,
      discountApplied: isProductDiscounted() ? (product.discount || 0) : 0,
      displayPrice: discountedPriceFormatted,
      quantity: 1,
      isSelected: true,
    };

    navigate('/checkout', { state: { selectedItems: [productToCheckout] } });
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? "text-warning" : "text-secondary opacity-50"}
          style={{ fontSize: "1.2rem" }}
        />
      );
    }
    return stars;
  };

  return (
    <>
      <Container className="my-4 product-page-container">
        {/* Breadcrumb Navigation */}
        {product &&  cartItems && (
          <BreadCrumbCartItems productId={product.id}  cartItems={ cartItems} />
        )}

        <Row className="justify-content-center g-4 product-main-row">
          <Col xs={12} md={6} lg={5} className="d-flex flex-column justify-content-center align-items-center product-image-section">
            <Fade in={true} appear={true}>
              <div className="main-image-container mb-3 shadow-sm rounded">
                <Image
                  src={selectedThumbnail || product.url}
                  alt={product.name}
                  className="main-product-image img-fluid rounded"
                />
              </div>
            </Fade>
            {product.thumbnails && product.thumbnails.length > 0 && (
              <div className="thumbnails-container d-flex flex-wrap justify-content-center gap-2 mt-2">
                {[product.url, ...product.thumbnails].map((thumb, idx) => (
                  <Image
                    key={idx}
                    src={thumb}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    onClick={() => handleThumbnailClick(thumb)}
                    className={`thumbnail-image border ${selectedThumbnail === thumb ? 'active-thumbnail border-primary shadow-sm' : 'border-light'}`}
                    fluid
                  />
                ))}
              </div>
            )}
          </Col>

          <Col xs={12} md={6} lg={5} className='product-details-section ps-md-4'>
            <h1 className="mb-2 display-5 fw-bold">{product.name}</h1>
            <p className="text-muted mb-3 fs-5">{product.description}</p>

            {/* Price display */}
            {isProductDiscounted() ? ( // Call the function here
              <div className="d-flex align-items-baseline mb-3">
                <h3 className="original-price text-decoration-line-through text-muted me-2 fs-4">
                  ₱{originalPriceFormatted}
                </h3>
                <h2 className="discounted-price text-danger me-2 fs-2 fw-bold">₱{discountedPriceFormatted}</h2>
                <span className="badge bg-success fs-6 fw-bold">-{product.discount}% OFF</span>
              </div>
            ) : (
              <h2 className="price mb-3 fs-2 fw-bold">₱{originalPriceFormatted}</h2>
            )}

            {/* Reviews and Stock Status */}
            <div className="d-flex align-items-center mb-3">
              <div className="d-flex me-3 align-items-center">
                {renderStars(averageRating)}
                <span className="ms-2 fw-bold fs-5 text-dark">{averageRating}</span>
              </div>
              <span className="text-muted fs-6">({reviewData.length} Reviews)</span>
              {loadingReviews && (
                <span className="ms-3 text-info d-flex align-items-center">
                  <Spinner animation="border" size="sm" className="me-1" /> Loading reviews...
                </span>
              )}
              {errorReviews && (
                <span className="ms-3 text-danger d-flex align-items-center">
                  <FaExclamationTriangle className="me-1" /> Error loading reviews.
                </span>
              )}
            </div>

            <p className={`fw-bold fs-5 ${isOutOfStock ? "text-danger" : "text-success"} mb-3`}>
              {isOutOfStock ? "Out of Stock" : `In Stock (${stockState} available)`}
            </p>

            {/* Shipping Information */}
            {freeShippingPlace && (
              <div className="mb-4 p-3 bg-light rounded border border-success">
                <p className="text-success mb-1 fw-bold fs-5 d-flex align-items-center">
                  <FaShippingFast className="me-2 fs-4" /> Free Shipping to Maslog (Danao City)!
                </p>
                <p className="text-muted small mb-0">This offer applies only within the specified area.</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row mt-4 gap-3">
              <Button
                variant="primary"
                onClick={handleAddToCartClick}
                disabled={isOutOfStock}
                className="px-4 py-2 flex-grow-1 d-flex align-items-center justify-content-center"
              >
                <FaCartPlus className="me-2" /> {addedToCartOnce ? 'Add More to Cart' : 'Add to Cart'}
              </Button>
              <Button
                variant="outline-primary"
                onClick={handleCheckoutClick}
                disabled={isOutOfStock}
                className="px-4 py-2 flex-grow-1 d-flex align-items-center justify-content-center"
              >
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>

        {/* Product Details Tabs */}
        <Row className="my-5">
          <Col xs={12}>
            {/* Ensure product is available before passing to TabbedComponent */}
            {product && <TabbedComponent  productId={product.id} cartItems={cartItems}/>}
          </Col>
        </Row>

        {/* "You May Like" Section */}
        <Row className="my-5">
          <Col xs={12}>
            <YouMayLike addToCart={addToCart}  youMayLikeProducts={youMayLikeProducts} />
          </Col>
        </Row>
      </Container>

      {/* Authentication Required Modal */}
      <Modal show={showModal} onHide={handleClose} centered backdrop="static" keyboard={false}>
        <Modal.Header closeButton className="bg-primary text-white">
          <Modal.Title><FaExclamationTriangle className="me-2" />Authentication Required</Modal.Title>
        </Modal.Header>
        <Modal.Body className="py-4">
          <p className="lead text-center">{modalMessage}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleLoginRedirect}>
            <FaCheckCircle className="me-1" /> Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}