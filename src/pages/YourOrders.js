import React, { useState, useEffect } from "react";
import { ListGroup, Image, Button, Card, Row, Col, Container } from "react-bootstrap";
import "./YourOrders.css";
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';
import { useAuth} from './loginContext';

// Helper function for status color (add this outside your component)
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case 'pending': return '#FFC107'; // Amber/Yellow
    case 'processing': return '#007BFF'; // Blue
    case 'shipped': return '#28A745'; // Green
    case 'out for delivery': return '#17A2B8'; // Info/Cyan
    case 'delivered': return '#6C757D'; // Grey (if you choose to show delivered)
    case 'cancelled': return '#DC3545'; // Red
    default: return '#343A40'; // Dark/Default
  }
};

export default function Orders({ isLoggedIn }) {
  const [userCheckoutData, setUserCheckoutData] = useState(null);
 const{userEmail} = useAuth();
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
        id:order.productid,
      }));
    } else {
      // Remove brackets and quotes, and trim
      const cleanName = itemName.replace(/[{}"]/g, "").trim();
      return [{ ...order, name: cleanName, price: order.price, url: itemUrl, id:order.productid}];
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
   
    if (userEmail) {
      fetchUserCheckoutData(userEmail.replace(/"/g, ""));
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
<Container className="my-4"> {/* Added margin for better spacing */}
      <div className="d-flex align-items-center mt-2 mb-3"> {/* Added align-items-center for vertical alignment, adjusted margin */}
        <h5 className="mb-0">Your Orders</h5> {/* Removed inline margin, added mb-0 */}
        <Link to="/checkouthistory" className="ms-3 text-decoration-none text-primary fw-bold fs-6">
          ( View All )
        </Link>
      </div>

      <div className="mb-3 p-3 border rounded"> {/* Replaced inline style with Bootstrap classes */}
        <ListGroup className="cart-group">
          {!userCheckoutData || (Array.isArray(userCheckoutData) && userCheckoutData.length === 0) ? (
            <Row>
              <Col className="mb-3 d-flex flex-column justify-content-center align-items-center text-center py-4">
                <p className="lead text-muted">
                  Sorry, only undelivered orders will be displayed here.
                </p>
                <Link to="/checkouthistory" className="btn btn-outline-primary mt-2">
                  View All Orders to Buy Again
                </Link>
              </Col>
            </Row>
          ) : (
            userCheckoutData.map((order) => (
              <ListGroup.Item
                key={`${order.order_number}-${order.id || order.name}`} // Use order_number, then item ID/name
                className="order-item mb-3 p-3 border rounded" // Consistent styling
              >
                {/* Order Header: Details common to the whole order */}
                <div className="order-header mb-3">
                  <Row className="align-items-center">
                    <Col xs={12} md={6}>
                      <strong>Order ID:</strong> {order.order_number || "N/A"} <br />
                      <strong>Placed on:</strong> {new Date(order.checkout_date).toLocaleDateString() || "N/A"} <br />
                    </Col>
                    <Col xs={12} md={6} className="text-md-end mt-2 mt-md-0">
                      <strong>Status:</strong> <span style={{ color: getStatusColor(order.status) }}>{order.status || "N/A"}</span>
                    </Col>
                  </Row>
                  <hr className="my-2"/> {/* Separator for order header and items */}
                </div>

                {/* Individual Item Details within the order */}
                <Card className="border-0"> {/* Use border-0 instead of inline style */}
                  <Card.Body className="p-0"> {/* Remove default padding if not needed */}
                    <Row className="g-3 align-items-center"> {/* Added gutter and vertical alignment */}
                      {/* Left Side: Image */}
                      <Col xs={4} md={3} className="d-flex justify-content-center">
                        <Image src={order.url} alt={order.name} className="img-fluid" style={{ maxWidth: "100px", height: "auto" }} />
                      </Col>

                      {/* Right Side: Details and Buttons */}
                      <Col xs={8} md={9}>
                        <div className="item-details">
                          <h6 className="item-name fw-bold mb-1">{order.name}</h6> {/* Used fw-bold, mb-1 */}
                          <p className="item-price text-danger mb-2">₱{order.price || '0.00'}</p> {/* Used text-danger, mb-2 */}
                          <div className="d-flex flex-column flex-md-row gap-2"> {/* Responsive button group */}
                            <Button variant="primary" size="sm" onClick={() => buyAgain(order)}>Buy Again</Button>
                            {/* Conditionally render Return Item if applicable for undelivered orders */}
                            {order.status !== 'pending' && order.status !== 'cancelled' && ( // Example condition
                               <Button variant="outline-secondary" size="sm" onClick={returnOrder}>Return Item</Button>
                            )}
                          </div>
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
          className="w-100 mt-3 btn-lg" // Make button full width, add top margin, larger size
          variant="secondary" // Changed color for distinction from primary actions
        >
          Track Your Orders
        </Button>
      </div>
    </Container>
  );
}
