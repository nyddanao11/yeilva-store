import React, { useState } from 'react';
import { Tab, Nav, Row, Col } from 'react-bootstrap';
import{wellnessProductData} from'../data/wellnessProductData';
import ReviewComponent from'./ReviewComponent';

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



const Reviews = ({ selectedProduct }) => {
  const [clickedReviews, setClickedReviews] = useState([]);

  const handleItemClick = (item) => {
    console.log('Clicked item:', item);
    // Adding the clicked item to the state
    setClickedReviews([...clickedReviews, item]);
  };

  return (
    <div className="mt-2">
      <h4>Reviews</h4>
      {/* Display existing reviews */}
      <ul>
        {clickedReviews.map((item, index) => (
          <li key={index} onClick={() => handleItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>

      {selectedProduct && (
        <ul>
          {selectedProduct.reviews.map((review, index) => (
            <li key={index} onClick={() => handleItemClick(review)}>
              {review}
            </li>
          ))}
        </ul>
      )}
          <div style={{maxWidth:"500px", border:"1px solid", borderRadius:"10px", padding:"10px"}}>
          <span>Write a review</span> 
          <ReviewComponent />
        </div>
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
