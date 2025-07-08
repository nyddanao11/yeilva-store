import React, { useState,useEffect } from 'react';
import { Container, ProgressBar, Card, Row, Col } from 'react-bootstrap';
import { FaBox, FaTruck, FaShippingFast, FaCheckCircle } from "react-icons/fa";
import axios from'axios';
import YouMayLike from'../components/YouMayLike';

export default function OrderTracking({addToCart, youMayLikeProducts}) {
       const orderSteps = [
    { label: "Ordered", icon: <FaBox />, step: 1 },
    { label: "Shipped", icon: <FaTruck />, step: 2 },
    { label: "Out for Delivery", icon: <FaShippingFast />, step: 3 },
    { label: "Delivered", icon: <FaCheckCircle />, step: 4 },
  ];
   const [orders, setOrders] = useState([]);
   
  const progressPercentage = (parseInt(orders.orderstatus, 10) / orderSteps.length) * 100;

  const fetchUserData = async (email) => {
    if (!email) {
        console.error('Email is undefined');
        return;
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/orderdata?email=${encodeURIComponent(email)}`);
        const userOrders = response.data; // Now an array of orders
        console.log('orderdata', userOrders);
        setOrders(userOrders);
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
};

useEffect(() => {
    const storedUserEmail = localStorage.getItem('email');
    if (storedUserEmail) {
        fetchUserData(storedUserEmail.replace(/"/g, ''));
    } else {
        console.log('Email is missing in local storage');
    }
}, []);

    return (
        <>
          <Container className="mt-4">
         {orders.map((order, orderIndex) => (
            <Card key={orderIndex} className="p-4 shadow mb-4">
                <Card.Body>
                    <Card.Title>Order Tracking</Card.Title>
                    <Card.Text>
                        <strong>Order ID:</strong> {order.order_number} <br />
                        <strong>Estimated Delivery:</strong> {order.deliverydate}
                    </Card.Text>
                </Card.Body>
                <Row className="align-items-center">
                    {orderSteps.map((step, index) => (
                        <Col key={index} className="text-center">
                            <div className={`d-inline-flex justify-content-center align-items-center rounded-circle p-3 ${step.step <= order.orderstatus ? "bg-success text-white" : "bg-light"}`} style={{ width: "50px", height: "50px" }}>
                                {step.icon}
                            </div>
                            <p className="mt-2">{step.label}</p>
                        </Col>
                    ))}
                </Row>
                <ProgressBar now={(order.orderstatus / orderSteps.length) * 100} className="mt-3" animated striped />
            </Card>
        ))}
        </Container>
           <YouMayLike addToCart={addToCart} youMayLikeProducts = {youMayLikeProducts}/>
           </>
    );
}

