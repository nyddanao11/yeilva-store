import React, { useState, useEffect } from 'react';
import { Tab, Nav, Row, Col, Button } from 'react-bootstrap';
import{wellnessProductData} from'../data/wellnessProductData';
import ReviewComponent from'./ReviewComponent';
import {useNavigate} from'react-router-dom';
import axios from'axios';

const ProductDetails = ({productId}) => {

  const [clickedTabs, setClickedTabs] = useState([]);

  const selectedProduct = wellnessProductData.find((item) => item.id === productId);

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



const Reviews = ({ selectedProduct, productId }) => {
  const [clickedReviews, setClickedReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const selectedProd = selectedProduct.name;

  const writeReview = (selectedProduct) => {
    navigate(`/reviewcomponent/${selectedProd}`);
  };

  useEffect(() => {
    // Function to fetch reviews based on product name
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/userreviews?productName=${selectedProduct.name}`);
        console.log('Response from server:', response.data); // Log the response data
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    // Fetch reviews when selectedProduct changes
    if (selectedProduct) {
      fetchReviews();
    }
  }, [selectedProduct]);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    // Adding the clicked item to the state
    setClickedReviews([...clickedReviews, item]);
  };

  // Function to format user email
  const formatUserEmail = (email) => {
    const [username, domain] = email.split('@');
    const truncatedUsername = username.slice(0, 3); // Show only first 3 letters
    const truncatedEmail = `${truncatedUsername}...@${domain}`;
    return truncatedEmail;
  };

  return (
    <div className="mt-2">
      <h4>Reviews</h4>
      {/* Display existing reviews */}
      <ul>
        {reviews.map((review, index) => (
          <li key={index} onClick={() => handleItemClick(review)} style={{ padding: '10px', margin: '10px 0px', borderBottom: '1px solid', width: '250px' }}>
            <div>
              <strong>{formatUserEmail(review.email)}</strong>: {review.comments}
            </div>
          </li>
        ))}
      </ul>
      <Button style={{ width: "150px", marginTop: "15px" }} onClick={writeReview}> Write a review</Button>
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

const TabbedComponent = ({productId}) => {
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
                 <Reviews selectedProduct={wellnessProductData.find(product => product.id === productId)} />
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

export default TabbedComponent;
