import React, { useState, useEffect } from "react";
import { ListGroup, Image, Button, Card, Row, Col } from "react-bootstrap";
import "./YourOrders.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Orders({ isLoggedIn }) {
  const [userCheckoutData, setUserCheckoutData] = useState(null);

  const normalizeOrderData = (order) => {
    // Determine correct name property
    const itemName = order.productname || order.name;
    // Remove brackets and quotes, handle undefined. Ensure it's a string before calling replace.
    const itemUrl = typeof order.url === 'string' ? order.url.replace(/[{}"]/g, "").trim() : ""; 

    // Validate data: Check for *both* name and URL being present.
    if (!itemName || !itemUrl) return [{ ...order, name: itemName, url: itemUrl }]; // Return original order if invalid

    if (itemName.includes(",")) {
      // Split names, handle potential missing URLs, and trim
      const names = itemName.split(",").map(n => n.trim());
      const urls = itemUrl.split(",").map(u => u.trim()); // Split and trim URLs

      return names.map((name, index) => ({
        ...order, // Keep other order properties like id, orderDate, status
        name: name,
        price: order.price,
        url: urls[index] || "", // Use corresponding URL or empty string
      }));
    } else {
      // Remove brackets and quotes, and trim
      const cleanName = itemName.replace(/[{}"]/g, "").trim();
      return [{ ...order, name: cleanName, price: order.price, url: itemUrl }];
    }
  };

  const fetchUserCheckoutData = async (email) => {
    if (!email) {
      console.error("Email is undefined");
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userorderdata?email=${encodeURIComponent(email.replace(/"/g, ""))}`);

      // Use flatMap to flatten the array of arrays into a single array
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
  }, [isLoggedIn]); // Depend on isLoggedIn to refetch if login status changes

  const navigate = useNavigate();

  function showOrderTracking() {
    navigate("/ordertracking");
  }
function returnOrder(){
  navigate("/needhelp");
}
  // Modified buyAgain function to accept the specific order
  function buyAgain(orderToReorder) {
    // Pass the entire order object in the state
    navigate("/checkoutbuyagain", { state: { itemToReorder: orderToReorder } });
  }

  return (
    <div style={{ marginBottom: "14px", padding: "15px" }}>
      <ListGroup className="cart-group">
        {!userCheckoutData || (Array.isArray(userCheckoutData) && userCheckoutData.length === 0) ? (
          <Row>
            <Col className="mb-3 d-flex flex-column justify-content-center align-items-center">
              <p>Sorry, we're having trouble displaying your orders or you have no past orders.</p>
            </Col>
          </Row>
        ) : (
          userCheckoutData.map((order) => (
            // Using order.id or a combination for a more unique key if id isn't always unique per item
            <ListGroup.Item
              key={`${order.id}-${order.name}`} // Combine ID and name for a more robust key
              className="order-item mb-3"
              style={{ padding: "15px", borderRadius: "6px", border: "1px solid #ddd" }}
            >
              {/* Order Details (if applicable for the normalized item) */}
              {/* Note: If normalizeOrderData splits an order into multiple items,
                  order.id, order.orderDate, order.status will be repeated for each item from the same original order.
                  Adjust display if these should only show once per original order block. */}
              <div className="order-info" style={{ marginBottom: "10px", fontSize: "14px" }}>
                <strong>Order ID:</strong> {order.order_number || "N/A"} <br />
                <strong>Placed on:</strong> {order.checkout_date || "N/A"} <br />
               
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
                        {/* Pass the current 'order' object to buyAgain */}
                        <Button variant="primary" size="sm" onClick={() => buyAgain(order)}>Buy Again</Button>
                        <Button variant="outline-secondary" size="sm" className="ms-2" onClick={returnOrder}>Return Item</Button>
                      </div>
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
