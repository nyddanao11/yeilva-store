import React, { useState, useEffect } from "react";
import { ListGroup, Image, Button, Card, Row, Col } from "react-bootstrap";
import "./YourOrders.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Orders({ isLoggedIn, }) {
  const [userCheckoutData, setUserCheckoutData] = useState(null);

const normalizeOrderData = (order) => {
  // Determine correct name property
  const itemName = order.productname || order.name;
  const itemUrl = order.url?.replace(/[{}"]/g, "").trim() || ""; // Remove brackets and quotes, handle undefined

  // Validate data:  Check for *both* name and URL being present.
  if (!itemName || !itemUrl) return [order];

  if (itemName.includes(",")) {
    // Split names, handle potential missing URLs, and trim
    const names = itemName.split(",").map(n => n.trim());
    const urls = itemUrl.split(",").map(u => u.trim()); // Split and trim URLs

    return names.map((name, index) => ({
      name: name,
      price: order.price,
      url: urls[index] || "", // Use corresponding URL or empty string
    }));
  } else {
    //  Remove brackets and quotes, and trim
    const cleanName = itemName.replace(/[{}"]/g, "").trim();
    return [{ name: cleanName, price: order.price, url: itemUrl }];
  }
};


 const fetchUserCheckoutData = async (email) => {
  if (!email) {
    console.error("Email is undefined");
    return;
  }

  try {
    const response = await axios.get(`https://yeilva-store-server.up.railway.app/api/userorderdata?email=${encodeURIComponent(email.replace(/"/g, ""))}`);

    const formattedData = response.data.flatMap(normalizeOrderData);
    setUserCheckoutData(formattedData);
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

  console.log('userCheckoutData', userCheckoutData);
  useEffect(() => {
    const storedUserEmail = localStorage.getItem("email");
    if (storedUserEmail) {
      fetchUserCheckoutData(storedUserEmail.replace(/"/g, ""));
    } else {
      console.log("Email is missing in local storage");
    }
  }, [isLoggedIn]);

  const navigate = useNavigate();

  function showOrderTracking() {
    navigate("/ordertracking");
  }

  return (
  <div style={{ marginBottom: "14px", padding: "15px" }}>
    <ListGroup className="cart-group">
      {!userCheckoutData || (Array.isArray(userCheckoutData) && userCheckoutData.length === 0) ? (
        <Row>
          <Col className="mb-3 d-flex flex-column justify-content-center align-items-center">
            <p>Sorry, we're having trouble displaying your orders.</p>
          </Col>
        </Row>
      ) : (
        userCheckoutData.map((order) => (
          <ListGroup.Item
            key={order.id || order.name}
            className="order-item mb-3"
            style={{ padding: "15px", borderRadius: "6px", border: "1px solid #ddd" }}
          >
            {/* Order Details */}
            <div className="order-info" style={{ marginBottom: "10px", fontSize: "14px" }}>
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Placed on:</strong> {order.orderDate} <br />
              <strong>Status:</strong> {order.status} <br />
            </div>

            <Card className="pb-2" style={{ border: "none" }}>
              <Card.Body>
                <Row>
                  {/* Left Side: Image */}
                  <Col md={4} xs={12} className="d-flex justify-content-center align-items-center">
                    <Image src={order.url} alt={order.name} className="image-main" style={{ width: "100px", height: "100px" }} />
                  </Col>

                  {/* Right Side: Details */}
                  <Col md={8} xs={12}>
                    <div className="item-details">
                      <h6 className="item-name" style={{ fontWeight: "bold" }}>{order.name}</h6>
                      <p className="item-price" style={{ color: "#B12704" }}>₱{order.price}</p>
                      <Button variant="primary" size="sm">Buy Again</Button>
                      <Button variant="outline-secondary" size="sm" className="ms-2">Return Item</Button>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </ListGroup.Item>
        ))
      )}
    </ListGroup>

    <Button onClick={showOrderTracking} disabled={!userCheckoutData || (Array.isArray(userCheckoutData) && userCheckoutData.length === 0)} className="order-tracking">
      Track your Orders
    </Button>
  </div>
);
}