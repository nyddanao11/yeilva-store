// contexts/CartContext.js
import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';
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

  const cartCount = useMemo(() => cartItems.length, [cartItems]);
  const [notificationProduct, setNotificationProduct] = useState(null);
  const [checkoutItemsForPayment, setCheckoutItemsForPayment] = useState([]);
   const [shippingRate, setShippingRate] = useState(0); // Moved to context
  const [voucherDiscount, setVoucherDiscount] = useState(0); // This would be the actual discount amount, not percentage


  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // This will schedule the cart items update
    setCartItems((prevCartItems) => {
        const existingItem = prevCartItems.find((item) => item.id === product.id);
        let updatedItems;
        if (existingItem) {
            updatedItems = prevCartItems.map((item) =>
                item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
        } else {
            updatedItems = [...prevCartItems, { ...product, quantity: 1 }];
        }
        return updatedItems;
    });
    setNotificationProduct(product);
    // alert('items successfully added to cart');
};

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


   const totalItemsPrice = useMemo(() => {
  return checkoutItemsForPayment.reduce((total, item) => {
    const price = Number(item.final_price ?? item.price ?? 0);
    return total + price * (item.quantity || 0);
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

    // Other functions like clearEntireCart, clearPurchasedItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
