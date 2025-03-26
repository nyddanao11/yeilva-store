import React, { useState } from 'react';
import { Container, ProgressBar, Card, ListGroup } from 'react-bootstrap';

export default function OrderTracking() {
    // Example delivery status data
    const [deliveryStatus, setDeliveryStatus] = useState({
        orderId: "123456789",
        estimatedDeliveryDate: "2025-03-30",
        currentStep: 2, // Step in delivery progress (1-4)
        steps: ["Order Placed", "Dispatched", "Out for Delivery", "Delivered"]
    });

    const progressPercentage = (deliveryStatus.currentStep / deliveryStatus.steps.length) * 100;

    return (
        <Container className="mt-4">
            <Card>
                <Card.Body>
                    <Card.Title>Order Tracking</Card.Title>
                    <Card.Text>
                        <strong>Order ID:</strong> {deliveryStatus.orderId} <br />
                        <strong>Estimated Delivery:</strong> {deliveryStatus.estimatedDeliveryDate}
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
                {deliveryStatus.steps.map((step, index) => (
                    <ListGroup.Item
                        key={index}
                        className={index < deliveryStatus.currentStep ? "text-success" : ""}
                    >
                        {step}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
}
