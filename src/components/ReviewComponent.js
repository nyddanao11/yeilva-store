import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Col, Row} from 'react-bootstrap';
import axios from'axios';
import { fetchUserData } from '../components/userService';
import Footer from '../components/Footer';
import {useNavigate, useParams} from'react-router-dom';

const ReviewComponent = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
   const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',   
  });
const { selectedProd} = useParams();

console.log('product name:', selectedProd);
const navigate = useNavigate();
const backToClickProduct =()=>{
  navigate('/');
}
  
  useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserEmail) {
      fetchUserData(storedUserEmail.replace(/"/g, ''))
        .then((user) => {
          // Set user data including joinedDate
           console.log('User data:', user);
          setUserData({ ...user });
        })


        .catch((error) => console.error('Error setting user data:', error));
    } else {
      console.log('Email is missing in local storage');
    }
  }, []);


  const handleRatingChange = (e) => {
    setRating(parseInt(e.target.value));
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const reviewData = {
    rating: rating,
    comment: comment,
    productname: selectedProd, // Assuming name is the property that holds the product name
    userData: userData,
  };
  try {
    const response = await axios.post('https://yeilva-store-server.up.railway.app/api/reviews', reviewData);
    console.log(response.data);
    // Reset form fields after successful submission
    setRating(0);
    setComment('');
    alert('review submitted successfully!');
  } catch (error) {
    console.error('Error submitting review:', error);
    alert('Error submitting review!');
  }
};


  return (
    <>
    <Container className="mt-4">
      <Row className="justify-content-center" >
        <Col sm={12} md={6}>
           <div style={{ maxWidth: '400px', padding: '20px', border: '1px solid #e0e0e0', borderRadius: '8px', background: '#fff' }}>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="rating">
              <Form.Label>Rating:</Form.Label>
              <Form.Control as="select" value={rating} onChange={handleRatingChange}>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="comment">
              <Form.Label>Comment:</Form.Label>
              <Form.Control as="textarea" rows={3} value={comment} onChange={handleCommentChange} />
            </Form.Group>

            <div>
            <Button variant="primary" type="submit" className="mt-3" >
              Submit Review
            </Button>
              <Button  variant="primary" style={{marginLeft:'15px', marginTop:"15px"}} onClick={backToClickProduct}> Cancel </Button>
            </div>
          </Form>
         </div>
        </Col>
       </Row>
      </Container>
     <div style={{marginTop:"25px"}}>
     <Footer />
     </div>
    </>
  );
};

export default ReviewComponent;
