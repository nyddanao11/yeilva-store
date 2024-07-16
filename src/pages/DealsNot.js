import React from 'react';
import { Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LoanForm.css';
import StaticStars from'../components/StaticStars';



const DealsNot = ({url, name, price, discountedPrice, rating, product}) => {
 
  
  return (

    <>
           <Card style={{ width:"165px"}} className=" mb-4">
            <Link to='/login'>
            <div  style={{ height: '200px', overflow: 'hidden'}}>
            <img
                src={product.url}
                style={{objectFit: "cover", height: '100%', width: '100%' }}
                alt={product.name}
              />
              </div>
            </Link>
              <Card.Body className="d-flex flex-column align-items-center justify-content-center ">
                <Card.Title style={{ fontSize:"13px" }}>{product.name}</Card.Title>
                <Card.Text style={{margin:"0px"}}>
                  <span className="text-muted ms-1" ><strike>₱{product.discountedPrice}</strike></span>
                  <span className="ms-2 "  style={{paddingLeft:"2px", color:"black", fontWeight:"bold", fontSize:"13px"}}>₱{product.price}</span>
                  <span style={{paddingLeft:"4px", color:"red", fontWeight:"bold", fontSize:"13px"}}>{product.percentage}</span>
                </Card.Text>
                        <StaticStars product={product}/>

              </Card.Body>
            </Card>
       </>
    
  );
};

export default DealsNot;
