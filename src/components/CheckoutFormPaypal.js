import React,{useState} from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from '../pages/CartContext';

export default function PayPalSection({ setShowCheckoutModal, setModalType, showCheckoutModal,setDownloadUrl }) {
  const { clearPurchasedItems, cartItems,  checkoutItemsForPayment,
    setCheckoutItemsForPayment, voucherCode,totalItemsPrice, 
    shippingRate, voucherDiscount, grandTotalAmount } = useCart();

 const subtotal = (checkoutItemsForPayment || [])
    .reduce((sum, item) => sum + Number(item.final_price || 0) * Number(item.quantity || 0), 0)
    .toFixed(2);
   
const total = (Number(subtotal) + Number(shippingRate)).toFixed(2) - voucherDiscount;

console.log("💰 PayPal total:", total);
   const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
   // Add this state to your main Checkout component

  console.log("cartItems:", checkoutItemsForPayment); // 👈 debug this

  return (
    <PayPalScriptProvider
      options={{
        "client-id": clientId, // ✅ REQUIRED
        currency: "PHP",
        intent: "capture",
      
      }}
    >



   <PayPalButtons
        style={{ layout: "vertical", shape: "rect", label: "pay" }}

        createOrder={async (data, actions) => {
          try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/paypal/create-order`, {
              method: "POST",
              headers: { "Content-Type": "application/json",
        
               },
              body: JSON.stringify({ 
               amount: subtotal, // e.g., 500
               shipping: shippingRate,       // e.g., 50
               discount: voucherDiscount,
               
              }),
              credentials: 'include' // 👈 This "fetches" the cookies for the request
            });

            if (!res.ok) throw new Error("Failed to create PayPal order");

            const order = await res.json();
            return order.id; // Correctly returns the ID to PayPal
          } catch (err) {
            console.error("❌ createOrder error:", err);
            return actions.reject(); 
          }
        }}

onApprove={async (data) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/paypal/capture-order`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        orderID: data.orderID, 
        items: checkoutItemsForPayment 
      }),
      credentials: 'include' 
    });

    const result = await res.json();
    console.log('Capture Result:', result);

    if (res.ok && result.success) {
      
      // ✅ 2. Lift the download URL to the Parent (for the modal to show it)
      setDownloadUrl(result.downloadLinks);
      
      // ✅ 3. Call your specialized clear function if it exists
      if (clearPurchasedItems) {
        await clearPurchasedItems(result.deletedCartItemIds);
      }

      // ✅ 4. Trigger the Success Modal
      setModalType("paypal"); 
      setShowCheckoutModal(true); 
      
      console.log("✅ Payment successful and UI updated!");
    } else {
      // ❌ Handle Server-side Error (e.g., Insufficient funds or DB error)
      console.error("Capture failed on server:", result.error);
      alert(`Payment Error: ${result.error || 'Something went wrong.'}`);
    }
  } catch (error) {
    // ❌ Handle Network/Frontend Error
    console.error("❌ Frontend Error:", error);
  }
}}
      />
    </PayPalScriptProvider>
   
  );
}