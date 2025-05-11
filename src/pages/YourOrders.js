import React, { useState, useEffect } from "react";
import { ListGroup, Image, Button, Card, Row, Col } from "react-bootstrap";
import "../components/ShoppingCart.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Orders({ isLoggedIn, }) {
  const [userCheckoutData, setUserCheckoutData] = useState(null);

 const normalizeOrderData = (order) => {
  // Determine correct name property
  const itemName = order.productname || order.name;
  const itemUrl = order.url.replace(/[{}"]/g, "").trim(); // Remove brackets and quotes

  if (!itemName || !itemUrl) return [order]; // Validate data

  return itemName.includes(",")
    ? itemName.split(",").map((name, index) => ({
        name: name.trim(),
        price: order.price,
        url: itemUrl.split(",")[index]?.trim() || "", // Handle multiple URLs
      }))
    : [{ name: itemName.trim(), price: order.price, url: itemUrl }];
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
    <div style={{ marginBottom: "14px" }}>
      <ListGroup className="cart-group">
        {!userCheckoutData || (Array.isArray(userCheckoutData) && userCheckoutData.length === 0) ?  (
          <Row>
            <Col className="mb-3 d-flex flex-column justify-content-center align-items-center">
              <p>Sorry, we're having trouble displaying your orders.</p>
            </Col>
          </Row>
        ) : (
          userCheckoutData.map((order) => (
            <ListGroup.Item
              key={order.id || order.name}
              className="cart-item mb-3"
              style={{ boxShadow: "0 2px 5px 0 rgba(0,0,0,.2)" }}
            >
              <Card className="pb-2" style={{ border: "none" }}>
                <Card.Body>
                  <Row>
                    <Col
                      md={4}
                      className="image-description d-flex flex-column justify-content-center align-items-center"
                    >
                      <div className="main-image-container">
                        <Image
                          src={order.url}
                          alt={order.name}
                          className="image-main"
                        />
                      </div>
                    </Col>
                    <Col md={8} className="item-details mt-3">
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

      <Button
        onClick={showOrderTracking}
        disabled={!userCheckoutData || (Array.isArray(userCheckoutData) && userCheckoutData.length === 0)}
        className="order-tracking"
      >
        Track your Orders
      </Button>
    </div>
  );
}