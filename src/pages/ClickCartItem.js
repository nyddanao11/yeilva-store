import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import './ClickProductPage.css';
import YouMayLike from'../components/YouMayLike';
import BreadCrumbCartItems from'../components/BreadCrumbCartItems';
import TabbedComponent from'../components/ProductTablatureCartItems';
import axios from 'axios';
import { FaShippingFast} from 'react-icons/fa'; // Import the icons you want to use

export default function ClickCartItem ({ addToCart, isLoggedIn, cartItems, youMayLikeProducts })  {

  const { id } = useParams();
   // console.log('ID from URL:', id);

  const [selectedThumbnails, setSelectedThumbnails] = useState({});
  const [reviewData, setReviewData] = useState([]);
  const [freeShippingPlace, setFreeShippingPlace] = useState(false);
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


  const navigate = useNavigate();

  const product = cartItems.find(p => p.id === parseInt(id)); // Assuming product IDs are numbers
     
useEffect(()=>{
  if(product.place ==='maslog')
      {setFreeShippingPlace(true)}
},[product.place])


  useEffect(() => {
    // Function to fetch reviews based on product name
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userreviews?productName=${product.name}`);
        console.log('Response from server:', response.data); // Log the response data
        setReviewData(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [product.name]);

  console.log("reviewData:", reviewData);
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

  // Calculate the average rating
  const averageRating = reviewData.length > 0
    ? Math.round(reviewData.reduce((acc, review) => acc + review.rating, 0) / reviewData.length)
    : 0;

  // console.log("averageRating:", averageRating);

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
    // 1. Check if logged in first
    if (!isLoggedIn) {
      handleShowModal('Please login to continue');
      return; // Stop execution if not logged in
    }

    // 2. Prepare the single item for checkout
    // This creates the exact object structure your CheckoutPage expects for a single item
    const productToCheckout = {
      ...product,
      // Ensure any specific checkout-related properties are included
      price: isProductDiscounted() ? discountedPriceCalculated : product.price,
      originalPrice: product.price,
      discountApplied: isProductDiscounted() ? (product.discount || 0) : 0,
      displayPrice: discountedPriceFormatted,
      quantity: 1, // When buying now, usually it's a quantity of 1
      isSelected: true, // Mark as selected for CheckoutPage
    };

    // 3. Navigate to checkout, passing the single item in an array
    // The CheckoutPage expects an array of selected items.
    navigate('/checkout', { state: { selectedItems: [productToCheckout] } });

    // Important: Do NOT call addToCart here if "Buy Now" means immediate checkout
    // without affecting the persistent cart. If "Buy Now" should also add to cart,
    // call addToCart(productToCheckout) *before* the navigate.
    // However, for typical "Buy Now" flow, we just want to proceed with *this* item.
  };

   

  // Function to convert rating to stars
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i}>&#9733;</span>); // Filled star
      } else {
        stars.push(<span key={i}>&#9734;</span>); // Empty star
      }
    }
    return stars;
  };

  return (
    <>
    <Container className="mt-3">
     <Row className="justify-content-center">
      {product && cartItems && <BreadCrumbCartItems productId={product.id} cartItems={cartItems} />}
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center align-items-center mb-3" 
        style={{border:'1px #d3d4d5 solid', paddingTop:'10px', paddingBottom:'10px'}}>
          
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

        {/* Product Information */}
        <Col xs={12} md={6}>
              <h2>{product.name}</h2>
         
          <p style={{marginBottom:'12px'}}>Description: {product.description}</p>
             {isProductDiscounted() ? (
           <div className="d-flex">
            <h6 className="original-price" style={{ textDecoration: 'line-through', color: '#888' }}>
              ₱{originalPriceFormatted}
            </h6>
            {/* Add margin-left to the discounted price for spacing */}
            <h6 className="discounted-price ms-2">₱{discountedPriceFormatted}</h6>
            {/* Add margin-left to the discount percentage for spacing */}
            <h6 className="ms-2" style={{ color: '#888' }}>
              -{product.discount}%
            </h6>
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

<p style={{ color: product.stock === 0 ? "red" : "#067d62", fontWeight: "400", marginBottom:"12px"}}>
  {product.stock === 0 ? "Out of stock" : "In stock"}
</p>
{freeShippingPlace?(<p style={{color:"#067d62",marginBottom:"10px"}}><FaShippingFast/> FreeShipping </p>):(<p></p>)}
   {freeShippingPlace? (<p style={{ display: 'flex', alignItems: 'center', fontSize: '15px', color: 'red', marginBottom:'12px'}}>
              Not Available outside Danao City</p>):(<p></p>)}

        <Button variant="primary" onClick={() => addToCart(product)} disabled={stockStatus()}>
      Add to Cart
    </Button>
    <Button variant="primary" onClick={handleCheckoutClick} className="mx-3" disabled={stockStatus()}>
      Buy Now
    </Button>
        </Col>
      </Row>

       <Row style={{marginBottom:'60px', marginTop:'60px'}}>
        <Col>
        <TabbedComponent  productId={product.id} cartItems={cartItems}/>
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
        <YouMayLike addToCart={addToCart} youMayLikeProducts={youMayLikeProducts}/>
    </>
  );
};


