import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useCart } from '../pages/CartContextGuest';

export default function PayPalSection({ setShowCheckoutModal, setModalType, setDownloadUrl }) {
  const { 
    clearPurchasedItems, 
    checkoutItemsForPayment,
    shippingRate, 
    voucherDiscount
  } = useCart();

  // 1. Calculate prices
  const subtotal = (checkoutItemsForPayment || [])
    .reduce((sum, item) => sum + Number(item.final_price || 0) * Number(item.quantity || 0), 0)
    .toFixed(2);
    
  const total = (Number(subtotal) - Number(voucherDiscount || 0)).toFixed(2);

  console.log("💰 PayPal total calculated:", total);
  
  const clientId = process.env.REACT_APP_PAYPAL_CLIENT_ID;
  const serverUrl = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';

  if (!clientId) {
    return <div className="p-4 text-red-500 font-bold">Error: PayPal Client ID is missing. Check your .env file.</div>;
  }

  return (
    <PayPalScriptProvider
      key={`${clientId}`} 
      options={{
        "client-id": clientId,
        currency: "PHP",
        intent: "capture",
      }}
    >
      <PayPalButtons
        style={{ layout: "vertical", shape: "rect", label: "pay" }}
        
        onClick={(data, actions) => {
          console.log("⚡ Checking client-side values before initialization...");
          if (Number(total) <= 0) {
            console.error("⛔ Cart validation failed: Total amount is zero or negative.");
            return actions.reject(); 
          }
          return actions.resolve(); 
        }}

        createOrder={async (data, actions) => {
          try {
            // 1. Initialize the draft order record in PostgreSQL using environment variables
            const initRes = await fetch(`${serverUrl}/api/checkout/guest-initiate`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                items: checkoutItemsForPayment, // Cleaned: Unified to use checkout items
                total_amount: total
              })
            });

            if (!initRes.ok) throw new Error('Failed to establish draft checkout record');
            
            const sessionResult = await initRes.json();
            console.log("💾 Draft order row saved with database ID:", sessionResult.orderId);

            // 2. Pass that database orderId directly to PayPal order creation endpoint
            const paypalRes = await fetch(`${serverUrl}/api/paypal/create-order`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ 
                orderId: sessionResult.orderId,
                amount: total // Good practice to pass verified total
              }) 
            });

            if (!paypalRes.ok) {
              const errorResponse = await paypalRes.json();
              throw new Error(errorResponse.error || 'PayPal order creation rejected.');
            }

            const paypalOrder = await paypalRes.json();
            return paypalOrder.id; 

          } catch (err) {
            console.error("❌ createOrder loop caught:", err.message);
            throw err;
          }
        }}

      onApprove={async (data) => {
        try {
          const res = await fetch(`${serverUrl}/api/paypal/capture-order`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              orderID: data.orderID, 
              items: checkoutItemsForPayment 
            }),
            credentials: 'include' 
          });

          // Bulletproof parsing fallback
          let result = {};
          try {
            result = await res.json();
          } catch (jsonParseError) {
            console.error("⚠️ Server did not respond with JSON format:", jsonParseError);
          }

          console.log('Capture Result from Backend:', result);

          // Check for standard server response OR basic ok status fallback
          if (res.ok && (result.success || res.status === 200)) {
            // Safely apply arguments with fallbacks
            setDownloadUrl(result.downloadLinks || []);
            
            if (clearPurchasedItems) {
              await clearPurchasedItems(result.deletedCartItemIds || []);
            }

            // Open success modal
            setModalType("paypal"); 
            setShowCheckoutModal(true); 
            console.log("✅ Payment successful and local UI updated!");
          } else {
            console.error("Capture failed on server:", result.error);
            alert(`Payment Error: ${result.error || 'Something went wrong.'}`);
          }
        } catch (error) {
          console.error("❌ Frontend Network Error:", error);
          alert("Network error: Could not reach payment capture gateway.");
        }
      }}
      />
    </PayPalScriptProvider>
  );
}