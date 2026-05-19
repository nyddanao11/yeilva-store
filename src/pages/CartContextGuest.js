// contexts/CartContext.js
import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { CartContext } from './CartContext';
// const CartContext = createContext();

export const CartProviderGuest = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedItems = localStorage.getItem('cartItems');
      return storedItems ? JSON.parse(storedItems) : [];
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
      return [];
    }
  });

  const [activeOrderId, setActiveOrderId] = useState(null);

const initializeGuestCheckout = useCallback(async (checkoutData) => {
  try {
    const { items, total, shipping, discount } = checkoutData;

   const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/checkout/guest-initiate`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ items, total, shipping, discount }),
  
  // 🛑 CRITICAL FRONTEND FIXED PIECE: Tells the browser to save the incoming cookie
  credentials: 'include' 
});

    if (!response.ok) {
      throw new Error('Failed to initialize checkout session');
    }

    const data = await response.json();
    
    // ✅ Safely update your state inside the async block
    if (typeof setActiveOrderId === 'function') {
      setActiveOrderId(data.orderId); 
    }
    
    return data.orderId;

  } catch (error) {
    console.error("Error establishing guest checkout session:", error);
    throw error;
  }
}, [setActiveOrderId]); // Added state setter dependency here safely

  const cartCount = useMemo(() => cartItems.length, [cartItems]);
  const [notificationProduct, setNotificationProduct] = useState(null);
  const [checkoutItemsForPayment, setCheckoutItemsForPayment] = useState([]);
   const [shippingRate, setShippingRate] = useState(0); // Moved to context
  const [voucherDiscount, setVoucherDiscount] = useState(0); // This would be the actual discount amount, not percentage


  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = useCallback((product) => {
  // We use a flag to track if we found a duplicate inside the functional loop
  let duplicateFound = false;

  setCartItems((prevCartItems) => {
    const isAlreadyInCart = prevCartItems.some(item => item.id === product.id);

    if (isAlreadyInCart) {
      duplicateFound = true;
      return prevCartItems; // Return unchanged cart array
    }

    // Since it's a digital product, quantity is strictly capped at 1
    return [...prevCartItems, { ...product, quantity: 1 }];
  });

  // Trigger your notification out here based on the result of the loop
  if (duplicateFound) {
    setNotificationProduct({
      ...product,
      alreadyInCart: true
    });
  } else {
    setNotificationProduct(product); // Normal success alert
  }
}, []); // 🚀 Dynamic dependency array is now completely EMPTY!


  const removeFromCart = (itemId) => {
    setCartItems((prevCartItems) => prevCartItems.filter((item) => String(item.id) !== String(itemId)));
  };

  const handleIncrement = (item) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      )
    );
  };

  const handleDecrement = (item) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((cartItem) =>
        cartItem.id === item.id && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );
  };

  const handleCloseNotification = () => {
    setNotificationProduct(null);
  };

  // Option 1: Clear the entire cart
  const clearEntireCart = () => {
    setCartItems([]);
    setCheckoutItemsForPayment([]); // Also clear any pending checkout items
  };

  // Option 2: Clear only the items that were part of the successful checkout
  // This is useful if the user can have other items in their cart they didn't purchase
  const clearPurchasedItems = (purchasedItemIds) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter(item => !purchasedItemIds.includes(item.id))
    );
    setCheckoutItemsForPayment([]); // Always clear the current checkout session
  };


   // Use a more robust way to get a clean number from a potentially formatted string
const getPrice = (priceString) => {
  if (typeof priceString === 'string') {
    // Strips out everything except digits and the decimal point
    const cleanedPrice = priceString.replace(/[^\d.]/g, ''); 
    return Number(cleanedPrice) || 0;
  }
  return Number(priceString) || 0;
};

const totalItemsPrice = useMemo(() => {
  return checkoutItemsForPayment.reduce((total, item) => {
    // Use the robust helper function
    const finalPrice = item.final_price ?? item.price;
    const price = getPrice(finalPrice); 

    const quantity = Number(item.quantity) || 0;

    return total + price * quantity;

  }, 0);
}, [checkoutItemsForPayment]);


  // Calculate shipping rate based on checkout items
  const isFreeShipping = useMemo(() => totalItemsPrice > 2500, [totalItemsPrice]);

 // Corrected useEffect in CartProviderGuest.js
useEffect(() => {
    const FREE_SHIPPING_THRESHOLD = 2500;
    
    let newRate;

    if (totalItemsPrice > FREE_SHIPPING_THRESHOLD) {
        newRate = 0;
    } else {
        const totalWeight = checkoutItemsForPayment.reduce((total, item) => total + (item.weight || 0), 0);
        const newMultiplier = totalWeight > 0 ? (0.145 + 30 / totalWeight) : 0;
        
        const calculatedRate = checkoutItemsForPayment.reduce((total, item) => 
             total + (item.weight || 0) * newMultiplier, 0
        );
        // Use Math.round to ensure precise number comparison
        newRate = Math.round(calculatedRate * 100) / 100;
    }

    // 🛑 CRITICAL FIX: Only update if the calculated rate is different from the current state
    if (newRate !== shippingRate) {
        setShippingRate(newRate);
    }
}, [checkoutItemsForPayment, totalItemsPrice, shippingRate]); // shippingRate must be a dependency!


  // Handle voucher application (This might need more complex logic based on your voucher system)
  // For simplicity, assuming a percentage discount
  const applyVoucherDiscount = (percentage) => {
    // Convert percentage to decimal (e.g., 10 for 10% becomes 0.10)
    setVoucherDiscount(totalItemsPrice * (percentage / 100)); // Store the actual monetary discount
  };


  // Calculate final grand total (items + shipping - voucher)
  const grandTotalAmount = useMemo(() => {
    let total = totalItemsPrice + shippingRate - voucherDiscount;
    return Math.max(0, total); // Ensure total doesn't go below zero
  }, [totalItemsPrice, shippingRate, voucherDiscount]);


  // Formatted grand total (for display)
  const formattedGrandTotal = useMemo(() => {
    return new Intl.NumberFormat('fil-PH', { style: 'currency', currency: 'PHP' }).format(grandTotalAmount);
  }, [grandTotalAmount]);


  const value = {
    cartItems,
    cartCount: cartItems.length, // useMemo already handled, but keeping direct for clarity
    addToCart,
    removeFromCart,
    handleIncrement,
    handleDecrement,
    notificationProduct,
    setNotificationProduct, // Assuming notificationProduct is still here
    handleCloseNotification,// Assuming handleCloseNotification is still here
    setCartItems, // If still needed for `isSelected` management

    // --- Checkout-specific values from Context ---
    checkoutItemsForPayment,
    setCheckoutItemsForPayment,
    totalItemsPrice, // Exposed from context
    shippingRate,    // Exposed from context
    isFreeShipping,  // Exposed from context
    voucherDiscount, // Exposed from context
    applyVoucherDiscount, // Function to apply voucher
    grandTotalAmount, // The numeric grand total
    formattedGrandTotal, // The formatted grand total string (from context)
    clearPurchasedItems,
    initializeGuestCheckout, // 👈 Added
    activeOrderId,            // 👈 Added

    // Other functions like clearEntireCart, clearPurchasedItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// At the bottom of CartContextGuest.js
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProviderGuest');
  }
  return context;
};