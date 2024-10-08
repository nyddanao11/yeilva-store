import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';  // Make sure to use the correct Link import

const PopUpAdds = ({ delay = 3000, autoCloseAfter = null, isLoggedIn = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);

  const navigate = useNavigate();  // Only needed if you want to navigate programmatically

  // Open popup after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    // Cleanup timeout when component unmounts
    return () => clearTimeout(timer);
  }, [delay]);

  // Handle optional auto-close
  useEffect(() => {
    let autoCloseTimer;
    if (isOpen && autoCloseAfter) {
      autoCloseTimer = setTimeout(() => {
        closePopup();
      }, autoCloseAfter);
    }

    return () => clearTimeout(autoCloseTimer);
  }, [isOpen, autoCloseAfter]);

  // Close popup function
  const closePopup = useCallback(() => {
    setIsOpen(false);
    setHasClosed(true);
  }, []);

  // Close popup when pressing Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closePopup]);

  // Close popup by clicking outside the popup content
  const handleClickOutside = (e) => {
    if (e.target.className.includes('popup-overlay')) {
      closePopup();
    }
  };

  // Inline styles for the popup and overlay
  const overlayStyle = {
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100vh',
    width: '100vw',
    background: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    zIndex: '999', // High z-index to block page interaction
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const popupStyle = {
    position: 'relative',
    padding: '20px',
    background: '#fff',
    zIndex: '1000', // Popup is above the overlay
    textAlign: 'center',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
    width: '300px',
  };

  // Conditionally show popup
  if (!isOpen || hasClosed) return null;

  // Determine popup message and link based on login status
  const popupMessage = isLoggedIn
    ? 'Checkout our Deals of the Day to save Big!'
    : 'Sign Up to avail our Services and Product Deals';

  const linkPath = isLoggedIn ? '/dealsofday' : '/signupform';
 const btnMessage = isLoggedIn? 'Proceed to Deals' : 'Sign up';

  // Redirect function on button click
  const buttonRedirect = () => {
    navigate(linkPath); // Correct way to navigate programmatically
  };

  return (
    <div
      className="popup-overlay"
      style={overlayStyle}
      onClick={handleClickOutside}
    >
      <div style={popupStyle} role="dialog" aria-modal="true" aria-labelledby="popup-header">
        {/* Dynamically change the link based on login status */}
       
          <h4 id="popup-header" className="mb-3">
            {popupMessage}
         </h4>
         <Button variant="success" onClick={buttonRedirect} aria-label="popup" style={{marginRight:'10px'}}>
          {btnMessage}
        </Button>
        <Button variant="outline-secondary" onClick={closePopup} aria-label="Close popup">
         Close
        </Button>
      </div>
    </div>
  );
};

export default PopUpAdds;
