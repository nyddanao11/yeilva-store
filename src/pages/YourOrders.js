import React,{useState, useEffect} from "react";
import { ListGroup, Image, Button, Card, Row, Col } from 'react-bootstrap';
import '../components/ShoppingCart.css';
import OrderTracking from './OrderTracking';
import {useNavigate} from'react-router-dom';

export default function Orders({isLoggedIn}){
	const [storedOrders, setStoredOrders] = useState([]);
	
useEffect(() => {
  const ordersStored = JSON.parse(localStorage.getItem('orders')) || [];
      if (ordersStored) {      
          setStoredOrders(ordersStored);
      }else {
       console.log('stored orders not found!');
      }
  }, [isLoggedIn]);
console.log("storedOrders", storedOrders);
const navigate =useNavigate();

function showOrderTracking(){
	navigate('/ordertracking');
}

	return(
		<div style={{marginBottom:"14px"}}>
		  <ListGroup className="cart-group">
		{storedOrders.length === 0 || null? ( 
                  <Row >
                    <Col className=" mb-3 d-flex flex-column justify-content-center align-items-center">
                      <p>Sorry, were having trouble displaying your orders.</p>
                    </Col>
                  </Row>
             
		  ):(storedOrders.map((order) => (
            <ListGroup.Item key={order.id} className="cart-item mb-3" style={{boxShadow:'0 2px 5px 0 rgba(0,0,0,.2)'}}>
              <Card className="pb-2 " style={{ border: "none"}}>
                <Card.Body >
               
                  <Row >
                    <Col md={4}  className="image-description d-flex flex-column justify-content-center align-items-center">
                       <div className="main-image-container">
                        <Image
                          src={order.url}
                          alt={order.name}
                          className="image-main"
                        />
                      </div>
                    </Col>
                <Col md={8}  className="item-details mt-3">
                      <h6 className="item-name">{order.name}</h6>  
                      <p className="item-price">₱{order.price}</p>
                    </Col>
                  </Row>
                 
                 
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>
      <Button onClick={showOrderTracking} disabled={storedOrders.length===0 || null} className="order-tracking">Track your Orders </Button>
		</div>
		);

}