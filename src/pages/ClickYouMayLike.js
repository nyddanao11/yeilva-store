import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Modal, Spinner, Alert, Fade, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ClickProductPage.css';
import BreadCrumbYouMayLike from'../components/BreadCrumbYouMayLike';
import HighConversionProductLike from'../components/ProductTablatureYouMayLike';
import axios from 'axios';
import YouMayLike from '../components/YouMayLike';
import { FaShippingFast, FaStar, FaCartPlus, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Zap, ShieldCheck, DownloadCloud, FileText, Globe } from 'lucide-react'; // Premium UI icons
import { useCart } from './CartContext';
import SEO from '../components/SEO';

export default function ClickProductPage({ isLoggedIn, youMayLikeProducts  }) {
  const { addToCart } = useCart();
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

  // Effect to find the product from  youMayLikeProducts
  useEffect(() => {
    // Only attempt to find product if  youMayLikeProducts is available and not empty
    if ( youMayLikeProducts &&  youMayLikeProducts.length > 0) {
      const foundProduct =  youMayLikeProducts.find(p => p.id === parseInt(id));
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
  }, [id,  youMayLikeProducts]); // Depend on 'id' and 'storedProducts'

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

   // ---- Loading / error states ----
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

   // ---- Derived values (single source of truth, computed once) ----
  const isOutOfStock = (product.stock ?? 0) <= 0;
  const hasDiscount = (product.discount || 0) > 0;
  const basePrice = Number(product.price);
  const finalPrice = hasDiscount ? basePrice * (1 - (product.discount || 0) / 100) : basePrice;

  const originalPriceFormatted = basePrice.toFixed(2);
  const finalPriceFormatted = finalPrice.toFixed(2);

  const hasReviews = reviewData.length > 0;
  const exactAverageRating = hasReviews
    ? reviewData.reduce((acc, review) => acc + review.rating, 0) / reviewData.length
    : 0;
  const roundedAverageRating = Math.round(exactAverageRating);

  const handleThumbnailClick = (imageUrl) => setSelectedThumbnail(imageUrl);
  const handleThumbnailKeyDown = (event, imageUrl) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleThumbnailClick(imageUrl);
    }
  };

  // Single helper so cart + checkout payloads can never drift apart
  const buildCartPayload = () => ({
    ...product,
    price: finalPrice,
    final_price: finalPrice,
    originalPrice: basePrice,
    discountApplied: hasDiscount ? (product.discount || 0) : 0,
    displayPrice: finalPriceFormatted,
  });

  const handleAddToCartClick = () => {
    if (isOutOfStock) return;
    addToCart(buildCartPayload());
    setAddedToCartOnce(true);
  };

  const handleCheckoutClick = () => {
    if (isOutOfStock) return;
    if (!isLoggedIn) {
      handleShowModal('Please log in to continue to checkout.');
      return;
    }
    const productToCheckout = {
      ...buildCartPayload(),
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
     <SEO 
        title={product.name} 
        description={product.description} 
        type="product" 
      />
      <Container className="my-4 product-page-container">
        {/* Breadcrumb Navigation */}
        {product &&  youMayLikeProducts && (
          <BreadCrumbYouMayLike productId={product.id}  youMayLikeProducts={ youMayLikeProducts} />
        )}

     <Row className="justify-content-center g-4 lg-g-5 product-main-row align-items-start py-4">

          {/* DIGITAL ASSET PREVIEW */}
          <Col xs={12} md={6} lg={5} className="d-flex flex-column justify-content-start align-items-center product-image-section">
            <Fade in={true} appear={true}>
              <div
                className="main-image-container mb-3 shadow-lg rounded-4 p-3 bg-white border border-light d-flex align-items-center justify-content-center"
                style={{ minHeight: '360px', width: '100%' }}
              >
                <Image
                  src={selectedThumbnail || product.url}
                  alt={product.name}
                  className="main-product-image img-fluid rounded-3"
                  style={{ maxHeight: '420px', objectFit: 'contain' }}
                />
              </div>
            </Fade>

            {product.thumbnails && product.thumbnails.length > 0 && (
              <div className="thumbnails-container d-flex flex-wrap justify-content-center mt-2" style={{ gap: '0.5rem' }}>
                {[...new Set([product.url, ...product.thumbnails].filter(Boolean))].map((thumb, idx) => {
                  const isActive = (selectedThumbnail || product.url) === thumb;
                  return (
                    <div
                      key={idx}
                      role="button"
                      tabIndex={0}
                      aria-label={`View preview page ${idx + 1}`}
                      aria-pressed={isActive}
                      onClick={() => handleThumbnailClick(thumb)}
                      onKeyDown={(e) => handleThumbnailKeyDown(e, thumb)}
                      className={`thumbnail-wrapper rounded-3 overflow-hidden border-2 ${isActive ? 'border-primary shadow-sm' : 'border-light opacity-75'}`}
                      style={{
                        width: '64px',
                        height: '64px',
                        padding: '2px',
                        background: '#fff',
                        borderStyle: 'solid',
                        cursor: 'pointer',
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 120ms ease',
                      }}
                    >
                      <Image
                        src={thumb}
                        alt={`${product.name} preview page ${idx + 1}`}
                        className="w-100 h-100 rounded-2"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </Col>

          {/* VALUE PROP + CONVERSION ACTIONS */}
          <Col xs={12} md={6} lg={6} xl={5} className="product-details-section ps-md-4 mt-4 mt-md-0">

            <div className="d-flex align-items-center gap-2 mb-2">
              <span
                className="text-primary rounded-pill fw-bold text-uppercase"
                style={{ backgroundColor: '#e0f2fe', fontSize: '11px', letterSpacing: '0.05em', padding: '0.35rem 0.75rem' }}
              >
                Premium Digital Guide
              </span>
              <span className="text-muted small d-flex align-items-center gap-1">
                <FileText size={14} /> PDF Format Included
              </span>
            </div>

            <h1 className="mb-2 text-dark lh-sm fs-2 fs-lg-1" style={{ fontWeight: 800, letterSpacing: '-0.01em' }}>
              {product.name}
            </h1>
            <p className="text-secondary mb-4 fs-6 lh-base" style={{ opacity: 0.85 }}>{product.description}</p>

            {/* Pricing */}
            <div className="p-3 bg-light rounded-4 mb-4 border border-light-subtle">
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span className="text-muted small fw-medium">Investment Price</span>
                {hasDiscount && (
                  <span
                    className="text-danger rounded-pill fw-bold"
                    style={{ backgroundColor: '#fee2e2', fontSize: '12px', padding: '0.25rem 0.65rem' }}
                  >
                    Save {product.discount}% Today
                  </span>
                )}
              </div>

              {hasDiscount ? (
                <div className="d-flex align-items-baseline gap-2">
                  <h2 className="text-danger m-0 fs-1" style={{ fontWeight: 900 }}>₱{finalPriceFormatted}</h2>
                  <h4 className="text-decoration-line-through text-muted m-0 fs-5">₱{originalPriceFormatted}</h4>
                </div>
              ) : (
                <h2 className="m-0 fs-1 text-dark" style={{ fontWeight: 900 }}>₱{originalPriceFormatted}</h2>
              )}
            </div>

            {/* Social proof */}
            <div className="d-flex align-items-center mb-4 pb-3 border-bottom border-light">
              {hasReviews ? (
                <>
                  <div className="d-flex me-3 align-items-center bg-white shadow-sm px-2 py-1 rounded-3 border border-light">
                    {renderStars(roundedAverageRating)}
                    <span className="ms-2 fw-bold fs-6 text-dark">{exactAverageRating.toFixed(1)}</span>
                  </div>
                  <span className="text-muted small fw-medium">Based on {reviewData.length} Verified Student Ratings</span>
                </>
              ) : (
                !loadingReviews && (
                  <span className="text-muted small fw-medium">No ratings yet — be the first to review this guide.</span>
                )
              )}

              {loadingReviews && (
                <span className="ms-3 text-info small d-flex align-items-center">
                  <Spinner animation="border" size="sm" className="me-1" /> Updating...
                </span>
              )}
              {errorReviews && (
                <span className="ms-3 text-danger small d-flex align-items-center">
                  <FaExclamationTriangle className="me-1" /> Review sync error.
                </span>
              )}
            </div>

            {/* Trust / delivery card */}
            <div
              className="mb-4 p-3 rounded-4 border border-info-subtle"
              style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}
            >
              <p className="mb-1 fw-bold fs-6 d-flex align-items-center" style={{ color: '#0369a1' }}>
                <Zap size={18} className="me-2 text-warning" fill="currentColor" /> Instant Digital Delivery
              </p>
              <p className="text-muted small mb-0 lh-sm">
                No waiting, zero shipping fees. Access details and links are sent directly to your registered email and profile vault immediately after payment.
              </p>
            </div>

            {isOutOfStock && (
              <Alert variant="secondary" className="d-flex align-items-center gap-2 mb-3">
                <FaExclamationTriangle /> This guide is currently unavailable for purchase.
              </Alert>
            )}

            {/* Actions */}
            <div className="d-flex flex-column gap-2 mt-4">
              <Button
                variant="primary"
                onClick={handleCheckoutClick}
                disabled={isOutOfStock}
                className="py-3 px-4 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center"
                style={{ fontSize: '16px' }}
              >
                Instant Access: Buy Now <Zap size={16} className="ms-2" fill="currentColor" />
              </Button>

              <Button
                variant="outline-secondary"
                onClick={handleAddToCartClick}
                disabled={isOutOfStock}
                className="py-2 px-4 rounded-pill fw-semibold d-flex align-items-center justify-content-center bg-transparent"
                style={{ fontSize: '14px', border: '1px solid #d1d5db', color: '#4b5563' }}
              >
                <DownloadCloud size={16} className="me-2" />
                {addedToCartOnce ? 'Added — View Cart' : 'Add Guide to Cart'}
              </Button>
            </div>

            <div className="d-flex justify-content-center gap-3 align-items-center mt-3 text-muted small flex-wrap">
              <span className="d-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
                <ShieldCheck size={14} className="text-success" /> Secure 256-Bit SSL Checkout
              </span>
              <span>•</span>
              <span className="d-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
                <Globe size={14} className="text-primary" /> Lifetime Product Access Updates
              </span>
            </div>

          </Col>
        </Row>

        {/* Product Details Tabs */}
        <Row className="my-5">
          <Col xs={12}>
            {/* Ensure product is available before passing to TabbedComponent */}
            {product && <HighConversionProductLike  productId={product.id} youMayLikeProducts={youMayLikeProducts} handleCheckoutClick={handleCheckoutClick} discountedPriceFormatted={finalPriceFormatted}/>}
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