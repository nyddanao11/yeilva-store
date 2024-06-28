import React, { useState, useEffect } from 'react';
import { Tab, Nav, Row, Col, Button } from 'react-bootstrap';
import{homeProducts} from'../data/homeProducts';
import ReviewComponent from'./ReviewComponent';
import {useNavigate} from'react-router-dom';
import axios from'axios';
import { ReactComponent as PersonCircleIcon } from './person-circle.svg';

const ProductDetails = ({productId}) => {

  const [clickedTabs, setClickedTabs] = useState([]);

  const selectedProduct = homeProducts.find((item) => item.id === productId);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    // Adding the clicked item to the state
    setClickedTabs([...clickedTabs, item]);
  };

  return (
   
      <div className="d-flex flex-column mt-2">

      <h4>Product Details</h4>
        {clickedTabs.map((item, index) => (
          <span key={index} onClick={() => handleItemClick(item)}>
            {item.productdetails}
          </span>
        ))}
       {/* Render the product details */}
      {selectedProduct && (
        <span onClick={() => handleItemClick(selectedProduct)}>
          {selectedProduct.productdetails}
        </span>
      )}
      </div>
  );
};

const Reviews = ({ selectedProduct }) => {
  const [clickedReviews, setClickedReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [statusReview, setStatusReview] = useState(null);

  const navigate = useNavigate();
  const selectedProd = selectedProduct.name;

   const storedUserEmail = localStorage.getItem('email')?.replace(/^"|"$/g, ''); // Remove quotes if present
  // console.log("email from localStorage:", storedUserEmail);
  // console.log("selectedProd:", selectedProd);

  useEffect(() => {
    const reviewStatus = async () => {
      try {
        const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/reviewstatus`, {
          params: {
            userEmail: storedUserEmail,
            productName: selectedProd
          }
        });
        console.log('Response from serverStatus:', response.data); // Log the response data
        setStatusReview(response.data);
      } catch (error) {
        console.error('Error fetching review status:', error);
      }
    };

    if (storedUserEmail && selectedProd) {
      reviewStatus();
    }
  }, [storedUserEmail, selectedProd]);

  const writeReview = () => {
    if (statusReview?.reviewed) {
      alert('You have already reviewed this product.');
    } else if (statusReview === null) {
      alert('Checking review status...');
    } else {
      navigate(`/reviewcomponent/${selectedProd}`);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/userreviews`, {
          params: {
            productName: selectedProd
          }
        });
        console.log('Response from server:', response.data); // Log the response data
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    if (selectedProduct) {
      fetchReviews();
    }
  }, [selectedProduct, selectedProd]);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    setClickedReviews([...clickedReviews, item]);
  };

  const formatUserEmail = (email) => {
    const [username, domain] = email.split('@');
    const truncatedUsername = username.slice(0, 3);
    const truncatedEmail = `${truncatedUsername}...@${domain}`;
    return truncatedEmail;
  };

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
    <div className="mt-2">
      <h4>Reviews</h4>
      <ul>
        {reviews.map((review, index) => (
          <li key={index} onClick={() => handleItemClick(review)} style={{ padding: '10px', margin: '10px 0px', borderBottom: '1px solid', width: '250px', listStyle: "none" }}>
            <div>
              <PersonCircleIcon style={{ marginRight: '0.5rem' }}/>
              <strong>{formatUserEmail(review.email)}</strong>: {review.comments}
            </div>
            <div className="text-warning me-1 mb-1">
              {renderStars(review.rating)}
            </div>
          </li>
        ))}
      </ul>
      <Button style={{ width: "150px", marginTop: "15px" }} onClick={writeReview}>Write a review</Button>
    </div>
  );
};


const Shipping = () => {
  return (
    <div className="mt-2">
      <h4>Shipping</h4>
      <p>Shipping Content</p>
    </div>
  );
};

const TabbedComponentFeatured = ({productId}) => {
  const [key, setKey] = useState('details');

  return (
    <div>
      <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
        <Row>
          <Col>
            <Nav variant="tabs">
              <Nav.Item>
                <Nav.Link eventKey="details">Details</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="reviews">Reviews</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="shipping">Shipping</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tab.Content>
              <Tab.Pane eventKey="details">
                <ProductDetails productId={productId}/>
              </Tab.Pane>
              <Tab.Pane eventKey="reviews">
                <Reviews selectedProduct={homeProducts.find(product => product.id === productId)} />
              </Tab.Pane>
              <Tab.Pane eventKey="shipping">
                <Shipping />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  );
};

export default TabbedComponentFeatured;
