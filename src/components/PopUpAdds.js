import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './PopUpAdds.css'; // Import external CSS for styles

const PopUpAdds = ({ delay = 3000, autoCloseAfter = null, isLoggedIn = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasClosed, setHasClosed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    let autoCloseTimer;
    if (isOpen && autoCloseAfter) {
      autoCloseTimer = setTimeout(() => {
        closePopup();
      }, autoCloseAfter);
    }

    return () => clearTimeout(autoCloseTimer);
  }, [isOpen, autoCloseAfter]);

  const closePopup = useCallback(() => {
    setIsOpen(false);
    setHasClosed(true);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closePopup();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [closePopup]);

  const handleClickOutside = (e) => {
    if (e.target.className.includes('popup-overlay')) {
      closePopup();
    }
  };

  if (!isOpen || hasClosed) return null;

  const popupMessage = isLoggedIn
    ? 'Check out our Deals of the Day to save big!'
    : 'Sign up to avail our services and product deals';

  const linkPath = isLoggedIn ? '/alldealsproduct' : '/signupform';
  const btnMessage = isLoggedIn ? 'Proceed to Deals' : 'Sign Up';

  const buttonRedirect = () => {
    navigate(linkPath);
  };

  return (
    <div
      className="popup-overlay"
      onClick={handleClickOutside}
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-header"
    >
      <div className="popup-content">
        <h4 id="popup-header" className="popup-title">
          {popupMessage}
        </h4>
        <div className="popup-actions">
          <Button variant="success" onClick={buttonRedirect} className="mb-2">
            {btnMessage}
          </Button>
          <Button variant="outline-secondary" onClick={closePopup}  className="mb-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PopUpAdds;
