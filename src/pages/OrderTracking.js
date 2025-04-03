import React, { useState,useEffect } from 'react';
import { Container, ProgressBar, Card, Row, Col } from 'react-bootstrap';
import { FaBox, FaTruck, FaShippingFast, FaCheckCircle } from "react-icons/fa";
import axios from'axios';
import YouMayLike from'../components/YouMayLike';

export default function OrderTracking({addToCart}) {
       const orderSteps = [
    { label: "Ordered", icon: <FaBox />, step: 1 },
    { label: "Shipped", icon: <FaTruck />, step: 2 },
    { label: "Out for Delivery", icon: <FaShippingFast />, step: 3 },
    { label: "Delivered", icon: <FaCheckCircle />, step: 4 },
  ];
    const [deliveryStatus, setDeliveryStatus] = useState({
    order_number: 'N/A',
    orderstatus: 0, // Assuming "orderstatus" is numeric
    deliverydate: 'Not Available',
});
   
  const progressPercentage = (parseInt(deliveryStatus.orderstatus, 10) / orderSteps.length) * 100;

   const fetchUserData = async (email) => {
    if (!email) {
        console.error('Email is undefined');
        return;
    }

    try { 
       const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/orderdata?email=${encodeURIComponent(email)}`);
        const user = response.data;
        console.log('orderdata', user);
        setDeliveryStatus(user);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};


useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserEmail) {
        (async () => {
            try {
                const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/orderdata?email=${encodeURIComponent(storedUserEmail.replace(/"/g, ''))}`);
                const user = response.data;
                console.log('orderdata', user);
                setDeliveryStatus(user);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        })();
    } else {
        console.log('Email is missing in local storage');
    }
}, []); // Empty array ensures single run


    return (
        <>
          <Container className="mt-4">
          <Card>
                <Card.Body>
                    <Card.Title>Order Tracking</Card.Title>
                    <Card.Text>
                        <strong>Order ID:</strong> {deliveryStatus.order_number} <br />
                        <strong>Estimated Delivery:</strong> {deliveryStatus.deliverydate}
                    </Card.Text>
                </Card.Body>
            </Card>
      <Card className="p-4 shadow">
        <Row className="text-center mb-3">
          <Col>
            <h4>Order Tracking</h4>
          </Col>
        </Row>
        <Row className="align-items-center">
          {orderSteps.map((step, index) => (
            <Col key={index} className="text-center" >
              <div
                className={`d-inline-flex justify-content-center align-items-center rounded-circle p-3 ${
                  step.step <= deliveryStatus.orderstatus ? "bg-success text-white" : "bg-light"
                }`}
              style={{width:"50px", height:"50px"}}
              >
                {step.icon}
              </div>
              <p className="mt-2">{step.label}</p>
            </Col>
          ))}
        </Row>
        <ProgressBar
          now={(deliveryStatus.orderstatus / orderSteps.length) * 100}
          className="mt-3"
          animated
          striped
        />
      </Card>
    </Container>
           <YouMayLike addToCart={addToCart}/>
           </>
    );
}
