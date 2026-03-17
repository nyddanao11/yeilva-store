import React, { useState } from 'react';
import { Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ServiceFAB () {
  const navigate = useNavigate();
  // State to track if the user closed the FAB
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null; // Don't render anything if hidden

  const containerStyle = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    zIndex: 1050,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end', // Align to the right
    gap: '5px'
  };

  const closeButtonStyle = {
    fontSize: '12px',
    padding: '2px 6px',
    borderRadius: '50%',
    lineHeight: '1',
    marginBottom: '-5px',
    marginRight: '-5px',
    zIndex: 1051,
    border: '1px solid #dee2e6'
  };

  const mainButtonStyle = {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.25)',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={containerStyle}>
      {/* Small Close Button */}
      <Button 
        variant="light" 
        size="sm" 
        style={closeButtonStyle}
        onClick={() => setIsVisible(false)}
        title="Hide"
      >
        ✕
      </Button>

      {/* The Label */}
      <Badge 
        bg="dark" 
        className="px-3 py-2 shadow-sm mb-1"
        style={{ cursor: 'pointer', fontSize: '0.8rem', borderRadius: '20px' }}
        onClick={() => navigate('/developerservices')}
      >
        Own a site like this! 🚀
      </Badge>

      {/* The Main FAB */}
      <Button 
        variant="primary" 
        style={mainButtonStyle}
        className="hover-pop bounce-animation"
        onClick={() => navigate('/developerservices')}
      >
        <span role="img" aria-label="developer">👨‍💻</span>
      </Button>

      {/* Animation Styles */}
      <style>
        {`
          .hover-pop:hover {
            transform: scale(1.1) rotate(5deg);
          }
          .bounce-animation {
            animation: floating 3s ease-in-out infinite;
          }
          @keyframes floating {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
};

