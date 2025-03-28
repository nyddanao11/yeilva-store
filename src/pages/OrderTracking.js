import React, { useState,useEffect } from 'react';
import { Container, ProgressBar, Card, ListGroup } from 'react-bootstrap';
import axios from'axios';
import YouMayLike from'../components/YouMayLike';

export default function OrderTracking({addToCart}) {
        const [checkoutData, setCheckoutData] = useState('');
     const[orderSteps, setOrderSteps] = useState({steps:["Order Placed", "Dispatched", "Out for Delivery", "Delivered"]})
    const [deliveryStatus, setDeliveryStatus] = useState({
    order_number: 'N/A',
    orderstatus: 0, // Assuming "orderstatus" is numeric
    deliverydate: 'Not Available',
});
    console.log('deliveryStatus', deliveryStatus);

   
  const progressPercentage = (parseInt(deliveryStatus.orderstatus, 10) / orderSteps.steps.length) * 100;

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

            <ProgressBar
                now={progressPercentage}
                label={`${progressPercentage}%`}
                className="my-4"
                variant="success"
            />

            <ListGroup>
                {orderSteps.steps.map((step, index) => (
                    <ListGroup.Item
                        key={index}
                        className={index < deliveryStatus.orderstatus ? "text-success" : ""}
                    >
                        {step}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
           <YouMayLike addToCart={addToCart}/>
           </>
    );
}
