import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchReviews = (productName) => {
  const [reviewData, setReviewData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productName) {
      const fetchReviews = async () => {
        try {
          const response = await axios.get('https://yeilva-store-server.up.railway.app/api/userreviews', {
            params: { productName }
          });
          setReviewData(response.data);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      };
      fetchReviews();
    }
  }, [productName]);

  return { reviewData, loading, error };
};

export default useFetchReviews;
