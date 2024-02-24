import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from'axios';

const ReviewComponent = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

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
      comment: comment
    };
    try {
      const response = await axios.post('/api/reviews', reviewData);
      console.log(response.data);
      // Reset form fields after successful submission
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
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

      <Button variant="primary" type="submit" className="mt-3">
        Submit Review
      </Button>
    </Form>
  );
};

export default ReviewComponent;
