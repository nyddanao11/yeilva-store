import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ScrollableCard = ({ url, name, price }) => {
  return (
    <Card style={{ width: '10rem', height: '350px', margin: '10px' }}>
      <img src={url} alt={name} style={{ objectFit: 'cover', height: '70%', width: '100%' }} />
      <div className="card-body">
        <h6>{name}</h6>
        <p>Price: ₱{price}</p>
        <Link to="/products">
          <Button variant="primary" block size="sm">
            Shop Now
          </Button>
        </Link>
        {/* Add any other content or buttons you need here */}
      </div>
    </Card>
  );
};

export default ScrollableCard;
