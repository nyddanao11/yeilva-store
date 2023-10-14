import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ImageCardFeaturedProduct = ({ addToCart, product }) => {
  return (
    <Card style={{ width: '10rem', margin: '10px' }} className="product-card">
      <Link to={`/clickproductpagefeaturedproduct/${product.id}`}>
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={product.url}
            alt={product.name}
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
        </div>
      </Link>
      <div className="card-body" style={{ height: '100px' }}>
        <p style={{fontSize:"13px", margin:"0px"}}><strong>{product.name}</strong></p>
        <p style={{ color: "#EE6005",  margin:"0px"}}>Price: ₱{product.price}</p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => addToCart(product)}
          style={{ width: '100%', fontSize: '12px' }}
        >
          <FaShoppingCart className="me-1" />Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default ImageCardFeaturedProduct;
