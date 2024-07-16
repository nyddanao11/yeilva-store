import React from 'react';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import StaticStars from'./StaticStars';

const ImageCardFeaturedNot = ({ product}) => {

  return (
<>
    <Card style={{ width: '10rem' }} className=" mb-4"  >
      <Link to='/login'>
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <img
            src={product.url}
            alt={product.name}
            style={{ objectFit: 'cover', height: '100%', width: '100%' }}
          />
        </div>
      </Link>
      <Card.Body className="d-flex flex-column align-items-center justify-content-center ">
        <Card.Title style={{ fontSize: "13px", margin: 0, fontWeight:'400' }}>{product.name}</Card.Title>
        <Card.Text style={{ margin: '4px 0', fontWeight:'650' }}> ₱{product.price}</Card.Text>
         <StaticStars product={product}/>
      </Card.Body>
    </Card>
    </>
  );
};

export default ImageCardFeaturedNot;



