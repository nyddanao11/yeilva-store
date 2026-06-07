import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Modal, Spinner, Alert, Fade, Badge } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ClickProductPage.css';
import BreadCrumbNav from '../components/BreadCrumbNav';
import HighConversionProductPage from '../components/ProductTablature';
import axios from 'axios';
import YouMayLike from '../components/YouMayLike';
import { FaShippingFast, FaStar, FaCartPlus, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { Zap, ShieldCheck, DownloadCloud, FileText, Globe } from 'lucide-react'; // Premium UI icons
import { useCart } from './CartContextGuest';
import SEO from '../components/SEO';

export default function ClickProductPage({ isLoggedIn, storedProducts, allProducts, youMayLikeProducts }) {
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

  // Effect to find the product from storedProducts
  useEffect(() => {
    // Only attempt to find product if storedProducts is available and not empty
    if (storedProducts && storedProducts.length > 0) {
      const foundProduct = storedProducts.find(p => p.id === parseInt(id));
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
  }, [id, storedProducts]); // Depend on 'id' and 'storedProducts'

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

 // ----All other calculations and functions that depend on 'product' go here,
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
    return product.price.toFixed(2);
  };

  const originalPriceFormatted = product.price.toFixed(2);
  const discountedPriceCalculated = calculateDiscountedPrice();
 const discountedPriceFormatted = Number(discountedPriceCalculated || 0).toFixed(2);
 
  const averageRating = reviewData.length > 0
    ? Math.round(reviewData.reduce((acc, review) => acc + review.rating, 0) / reviewData.length)
    : 0;

  const handleThumbnailClick = (imageUrl) => {
    setSelectedThumbnail(imageUrl);
  };

  const handleAddToCartClick = () => {
    const productToAdd = {
      ...product,
      price: isProductDiscounted() ? discountedPriceCalculated :originalPriceFormatted,
      originalPrice: originalPriceFormatted,
      discountApplied: isProductDiscounted() ? (product.discount || 0) : 0,
      displayPrice: discountedPriceFormatted
    };
    addToCart(productToAdd);
    setAddedToCartOnce(true); // Set to true after adding to cart
  };

 const handleCheckoutClick = () => {
  
  const basePrice = Number(product.price);
  const discountedPrice = isProductDiscounted()
    ? basePrice * (1 - (product.discount || 0) / 100)
    : basePrice;

  const productToCheckout = {
    ...product,
    price: discountedPrice, // optional, still okay for UI
    final_price: discountedPrice, // ✅ crucial for checkout math
    originalPrice: basePrice,
    discountApplied: isProductDiscounted() ? (product.discount || 0) : 0,
    displayPrice: discountedPrice.toFixed(2),
     final_price: isProductDiscounted() ? discountedPriceCalculated : product.price,
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
        {product && storedProducts && (
          <BreadCrumbNav productId={product.id} storedProducts={storedProducts} />
        )}

      <Row className="justify-content-center g-4 lg-g-5 product-main-row align-items-start py-4">
    
    {/* 1. DIGITAL ASSET PREVIEW SECTION (Left Side) */}
    <Col xs={12} md={6} lg={5} className="d-flex flex-column justify-content-start align-items-center product-image-section">
      <Fade in={true} appear={true}>
        {/* Added a modern card outline background specifically built for displaying digital mockup covers */}
        <div className="main-image-container mb-3 shadow-lg rounded-4 p-3 bg-white border border-light d-flex align-items-center justify-content-center" style={{ minHeight: '360px', width: '100%' }}>
          <Image
            src={selectedThumbnail || product.url}
            alt={product.name}
            className="main-product-image img-fluid rounded-3"
            style={{ maxHeight: '420px', objectFit: 'contain' }}
          />
        </div>
      </Fade>
              
             {/* Mini Thumbnails / Preview Screens */}
        {product.thumbnails && product.thumbnails.length > 0 && (
          <div className="thumbnails-container d-flex flex-wrap justify-content-center gap-2 mt-2">
            {/* 1. Combine arrays, 2. Filter out empty strings, 3. Deduplicate URLs using Set */}
            {[...new Set([product.url, ...product.thumbnails].filter(Boolean))].map((thumb, idx) => (
              <div 
                key={idx}
                onClick={() => handleThumbnailClick(thumb)}
                className={`thumbnail-wrapper rounded-3 overflow-hidden cursor-pointer border-2 transition ${
                  (selectedThumbnail || product.url) === thumb 
                    ? 'border-primary shadow-sm scale-up' 
                    : 'border-light opacity-75'
                }`}
                style={{ width: '64px', height: '64px', padding: '2px', background: '#fff', borderStyle: 'solid' }}
              >
                <Image
                  src={thumb}
                  alt={`${product.name} preview page ${idx + 1}`}
                  className="w-100 h-100 object-fit-cover rounded-2"
                />
              </div>
            ))}
          </div>
        )}
    </Col>

    {/* 2. VALUE PROPOSITION & CONVERSION ACTION SECTION (Right Side) */}
    <Col xs={12} md={6} lg={6} xl={5} className="product-details-section ps-md-4 mt-4 mt-md-0">
      
      {/* Category or Asset Format Badge */}
      <div className="d-flex align-items-center gap-2 mb-2">
        <Badge bg="soft-primary" className="text-primary rounded-pill px-3 py-1.5 fw-bold text-uppercase tracking-wider" style={{ backgroundColor: '#e0f2fe', fontSize: '11px' }}>
          Premium Digital Guide
        </Badge>
        <span className="text-muted small d-flex align-items-center gap-1">
          <FileText size={14} /> PDF Format Included
        </span>
      </div>

      <h1 className="mb-2 text-dark fw-extrabold tracking-tight lh-sm fs-2 fs-lg-1">{product.name}</h1>
      <p className="text-secondary mb-4 fs-6 lh-base" style={{ opacity: 0.85 }}>{product.description}</p>

      {/* Modern Pricing Panel */}
      <div className="p-3 bg-light rounded-4 mb-4 border border-light-subtle">
        <div className="d-flex align-items-center justify-content-between mb-1">
          <span className="text-muted small fw-medium">Investment Price</span>
          {isProductDiscounted() && (
            <span className="badge bg-soft-danger text-danger rounded-pill px-2.5 py-1 fw-bold" style={{ backgroundColor: '#fee2e2', fontSize: '12px' }}>
              Save {product.discount}% Today
            </span>
          )}
        </div>
        
        {isProductDiscounted() ? (
          <div className="d-flex align-items-baseline gap-2">
            <h2 className="discounted-price text-danger m-0 fs-1 fw-black">₱{discountedPriceFormatted}</h2>
            <h4 className="original-price text-decoration-line-through text-muted m-0 fs-5">
              ₱{originalPriceFormatted}
            </h4>
          </div>
        ) : (
          <h2 className="price m-0 fs-1 fw-black text-dark">₱{originalPriceFormatted}</h2>
        )}
      </div>

      {/* Social Proof & Live Review Loaders */}
      <div className="d-flex align-items-center mb-4 pb-3 border-bottom border-light">
        <div className="d-flex me-3 align-items-center bg-white shadow-sm px-2.5 py-1 rounded-3 border border-light">
          {renderStars(averageRating)}
          <span className="ms-2 fw-extrabold fs-6 text-dark">{averageRating}</span>
        </div>
        <span className="text-muted small fw-medium">Based on {reviewData.length} Verified Student Ratings</span>
        
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

      {/* DIGITAL TRUST ASSURANCE CARD (Replaced Old Shipping Panel) */}
      <div className="mb-4 p-3 bg-gradient-blue rounded-4 border border-info-subtle shadow-xs" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' }}>
        <p className="text-info-dark mb-1 fw-bold fs-6 d-flex align-items-center" style={{ color: '#0369a1' }}>
          <Zap size={18} className="me-2 animate-bounce-slow text-warning" fill="currentColor" /> Instant Digital Delivery
        </p>
        <p className="text-muted small mb-0 lh-sm">
          No waiting, zero shipping fees. Access details and links are dispatched directly to your registered email and profile vault immediately upon completing payment.
        </p>
      </div>

      {/* HIGH CONVERSION ACTION FRAMEWORK */}
      <div className="d-flex flex-column gap-2.5 mt-4">
        {/* Primary CTA - Immediate Checkout Entry */}
        <Button
          variant="primary"
          onClick={handleCheckoutClick}
          className="py-3 px-4 rounded-pill fw-bold shadow-sm d-flex align-items-center justify-content-center transition-all hover-scale"
          style={{ fontSize: '16px' }}
        >
          Instant Access: Buy Now <Zap size={16} className="ms-2" fill="currentColor" />
        </Button>

        {/* Secondary CTA - Add to Cart Tray (Modified with logic safeguards) */}
        <Button
          variant="outline-secondary"
          onClick={handleAddToCartClick}
          className="py-2.5 px-4 rounded-pill fw-semibold d-flex align-items-center justify-content-center transition-all bg-transparent"
          style={{ fontSize: '14px', border: '1px solid #d1d5db', color: '#4b5563' }}
        >
          <DownloadCloud size={16} className="me-2" /> 
          {addedToCartOnce ? 'Review Inside Cart' : 'Add Guide to Cart'}
        </Button>
      </div>

      {/* SECURITY & GUARANTEE SUB-TICKERS */}
      <div className="d-flex justify-content-center gap-3 align-items-center mt-3 text-muted small">
        <span className="d-flex align-items-center gap-1" style={{ fontSize: '12px' }}>
          <ShieldCheck size={14} className="text-success" /> Secure 256-Bit SSL Checkout
        </span>
        •
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
            {product && <HighConversionProductPage productId={product.id} storedProducts={storedProducts} handleCheckoutClick={handleCheckoutClick} discountedPriceFormatted={discountedPriceFormatted}/>}
          </Col>
        </Row>

        {/* "You May Like" Section */}
        <Row className="my-5">
          <Col xs={12}>
            <YouMayLike addToCart={addToCart} allProducts={allProducts} youMayLikeProducts={youMayLikeProducts} />
          </Col>
        </Row>
      </Container>

    </>
  );
}