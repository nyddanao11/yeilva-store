import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image, Button } from 'react-bootstrap';
import { useParams, useNavigate} from 'react-router-dom';
import './ClickProductPage.css';
import BreadCrumbNav from'../components/BreadCrumbNav';
import TabbedComponent from'../components/ProductTablature';
import axios from 'axios';
import YouMayLike from'../components/YouMayLike';
import { FaShippingFast} from 'react-icons/fa'; // Import the icons you want to use


export default function ClickProductPage ({ addToCart, isLoggedIn, storedProducts, allProducts})  {
  const { id } = useParams();
 
  const [selectedThumbnails, setSelectedThumbnails] = useState({});
  const [reviewData, setReviewData] = useState([]);
     const [freeShippingPlace, setFreeShippingPlace] = useState(false);

  const navigate = useNavigate();

 const product = storedProducts.find(p => p.id === parseInt(id)); // Assuming product IDs are numbers
      const stockState = product.stock;
 const stockStatus = () => {
  return stockState <= 0;
};

useEffect(()=>{
  if(product.place ==='maslog')
      {setFreeShippingPlace(true)}
},[product.place])

  useEffect(() => {
    // Function to fetch reviews based on product name
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/userreviews?productName=${product.name}`);
        console.log('Response from server:', response.data); // Log the response data
        setReviewData(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };
    fetchReviews();
  }, [product.name]);

  console.log("reviewData:", reviewData);

  // Calculate the average rating
  const averageRating = reviewData.length > 0
    ? Math.round(reviewData.reduce((acc, review) => acc + review.rating, 0) / reviewData.length)
    : 0;

  console.log("averageRating:", averageRating);

  const handleThumbnailClick = (itemId, imageUrl) => {
    setSelectedThumbnails((prev) => ({
      ...prev,
      [itemId]: imageUrl,
    }));
  };

 const handleCheckoutClick = () => {
  if (!isLoggedIn) {
    alert('Please log in to continue'); // Alert user to log in
    return; // Exit the function if the user is not logged in
  }
 addToCart(product);
  navigate('/checkout'); // Redirect to checkout if the user is logged in
  
};

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
 {product && storedProducts && <BreadCrumbNav productId={product.id} storedProducts={storedProducts} />}
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
         
          <p style={{marginBottom:'12px'}}>Description: {product.description}</p>
           <h6>₱{product.price}</h6>

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
        <TabbedComponent  productId={product.id} storedProducts={storedProducts}/>
        </Col>

      </Row>

     </Container>
        <YouMayLike addToCart={addToCart}/>
    </>
  );
};

