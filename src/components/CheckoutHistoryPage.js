import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Image } from 'react-bootstrap';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import YouMayLike from'./YouMayLike';

export default function CheckoutHistoryPage ({isLoggedIn, addToCart, youMayLikeProducts}) {
  const [checkoutHistory, setCheckoutHistory] = useState([]);
  const [userData, setUserData] = useState({});  // Ensure you have setUserData defined

  const userEmail = localStorage.getItem('email');
  const navigate = useNavigate();

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

  const fetchCheckoutHistory = async (email) => {
    if (!email) {
      console.error("Email is undefined");
      return;
    }

    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/checkout-history?email=${encodeURIComponent(email.replace(/"/g, ""))}`);

      // Use flatMap to flatten the array of arrays into a single array
      const formattedData = response.data.flatMap(normalizeOrderData);
      setCheckoutHistory(formattedData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
   

 useEffect(() => {
    const storedUserEmail = localStorage.getItem("email");
    if (storedUserEmail) {
      fetchCheckoutHistory(storedUserEmail.replace(/"/g, ""));
    } else {
      console.log("Email is missing in local storage");
    }
  }, [isLoggedIn]); // Depend on isLoggedIn to refetch if login status changes  

  

 // Modified buyAgain function to accept the specific order
  function buyAgain(orderToReorder) {
    // Pass the entire order object in the state
    navigate("/checkoutbuyagain", { state: { itemToReorder: orderToReorder } });
  }

  return (
    <>
    <Container className="mt-4">
      <h1 className="text-center mb-4">Checkout History</h1>
 
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>No.</th>
              <th>Item </th>
                <th>Price </th>
              <th>Checkout Date</th>
              <th>Total</th>
              <th>Order Number</th>
              <th>Buy Again</th>
            </tr>
          </thead>
          <tbody>
            {checkoutHistory.map((item, index) => (
              <tr key={item.order_number}>
                <td>{index + 1}</td>
                <td><Image src={item.url} alt={item.productname} className="image-main" style={{ width: "50px", height: "50px" }} /></td>
                <td>{item.price}</td>
                <td>{item.checkout_date}</td>
                <td>{item.total}</td>
                <td>{item.order_number}</td>
                <td><Button variant = 'primary' onClick={()=> buyAgain(item)}>Buy Again</Button></td>
          </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
            <YouMayLike addToCart={addToCart} youMayLikeProducts = {youMayLikeProducts}/>
</>
  );
};

