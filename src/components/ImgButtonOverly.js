import React from 'react';
import { Container, Button } from 'react-bootstrap';

const ImageWithOverlayButton = () => {
  return (
    <div className="position-relative">
      <img src={`${process.env.PUBLIC_URL}/images/services.png`} alt="Services" className="img-fluid" />
      <Button className="position-absolute top-50 start-50 translate-middle"  variant="primary">
        Our Services
      </Button>
    </div>
  );
};

export default ImageWithOverlayButton;
