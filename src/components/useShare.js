// src/hooks/useShare.js
import { useCallback } from 'react';

const useShare = () => {
  const handleShare = useCallback((product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this product: ${product.name}`,
        url: window.location.href
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      alert('Sharing is not supported in this browser.');
    }
  }, []);

  return handleShare;
};

export default useShare;
