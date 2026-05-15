import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { io } from 'socket.io-client'; // 👈 Import socket.io-client
import { FormatCartData } from '../utils/FormatCartData';
import { CartContext } from './CartContext';
import { useAuth } from './loginContext'; // ⬅️ Import your Auth context
import axios from 'axios';
// --- WebSocket Configuration ---
// NOTE: Use the base server URL for the WebSocket connection
const WS_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001'; 
const API_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001';
const LOCAL_CART_STORAGE_KEY = 'cartItems'; // Key for the guest cart in localStorage


export const CartProviderAuthenticated = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
       const { accessToken, isLoggedIn } = useAuth(); // <-- Get token and status from AuthContext
    // At the top of CartProvider:
    const [socket, setSocket] = useState(null); // Managed socket connection state
    // The 'loading' state now reflects the socket connection status or initial load
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- Unchanged Client-side State ---
    const [notificationProduct, setNotificationProduct] = useState(null);
    const [checkoutItemsForPayment, setCheckoutItemsForPayment] = useState([]);
    const [shippingRate, setShippingRate] = useState(0);
    const [voucherDiscount, setVoucherDiscount] = useState(0);
    const [voucherCode, setVoucherCode] = useState(null); 
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

        // ----------------------------------------------------------------------
    // NEW LOGIC: MERGE LOCAL CART ON LOGIN
    // ----------------------------------------------------------------------

    const mergeLocalCart = useCallback(async () => {
        const localCartJson = localStorage.getItem(LOCAL_CART_STORAGE_KEY);
        
        if (!localCartJson) {
            console.log('No guest cart found in localStorage.');
            return;
        }

        try {
            const localCartItems = JSON.parse(localCartJson);
            
            if (!localCartItems || localCartItems.length === 0) {
                 localStorage.removeItem(LOCAL_CART_STORAGE_KEY);
                 return;
            }

            console.log('Initiating cart merge for items:', localCartItems);

            // Send local cart data to the dedicated server merge endpoint
            // We use axios directly here, ensuring the accessToken is correctly attached.
            await axios.post(`${API_URL}/api/cart/merge`, { 
                cartItems: localCartItems 
            }, {
                headers: {
                    // Use the Access Token from the Auth Context for authorization
                    Authorization: `Bearer ${accessToken}`, 
                }
            });

            // If the server confirms the merge:
            // 1. Delete the local storage items to prevent re-merging
            localStorage.removeItem(LOCAL_CART_STORAGE_KEY);
            console.log('Local cart successfully merged and cleared.');

            // 2. Request a full update from the server (optional, as the server merge logic
            //    should trigger the WebSocket update 'cart:full_update' automatically)
            if (socket && socket.connected) {
                socket.emit('cart:get');
            }

        } catch (err) {
            console.error('Error during local cart merge:', err.response?.data?.error || err.message);
            // Crucial: Do NOT delete the local storage item if the merge fails!
            setError(`Failed to merge old cart: ${err.response?.data?.error || 'Server error'}`);
        }
    }, [accessToken, socket, setError]);


   // --- 1. WebSocket Connection and Event Listeners ---
    // The dependency array now watches accessToken (the key change)
    useEffect(() => {
        // Only attempt to connect if the user is explicitly logged in AND we have an accessToken
        if (!isLoggedIn || !accessToken) {
            setLoading(false);
            setError(isLoggedIn ? null : "User not logged in or token missing.");
            return;
        }

        // Initialize socket connection, passing the current in-memory accessToken
        const newSocket = io(WS_URL, {
            auth: { token: accessToken },
            // Setting transports to ensure stability in various environments
            transports: ['websocket', 'polling']
        });
        
        setSocket(newSocket); 
        setLoading(true); // Start loading when attempting connection

        // --- Connection Handlers ---
        newSocket.on('connect', () => {
            console.log('WebSocket connected:', newSocket.id);
            setError(null);
            
            // Request the initial cart state immediately upon connection
            newSocket.emit('cart:get'); 
        });

        newSocket.on('disconnect', () => {
            console.log('WebSocket disconnected');
            // Do NOT set loading to false here, as a disconnect may mean a token expired,
            // and the AuthContext might trigger a reconnect.
        });

        // --- Error Handlers ---
        newSocket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
            setError(`Connection failed: ${err.message}`);
            setLoading(false);
            // Crucial: Handle 401/Invalid Token Errors if your server is configured to send them
            if (err.message.includes('Unauthorized') || err.message.includes('401')) {
                // In a production environment, you might trigger a logout or a token refresh here, 
                // but since the HTTP API already handles the refresh, a disconnect is usually enough.
                setError("Authentication failed for WebSocket. Please refresh the page.");
            }
        });

     // 📦 Inside your CartContext or useCart hook file

            // --- Core Cart Event Listener (The Push Mechanism) ---
            newSocket.on('cart:full_update', (serverCartItems) => {
                console.log('Received cart update from server:', serverCartItems);
                
                let processedItems = Array.isArray(serverCartItems)
                    ? serverCartItems.map(FormatCartData)
                    : [];

                // 🎯 Step 1: Normalize the data (add isSelected)
                const normalizedItems = processedItems.map(item => ({
                    ...item,
                    // If isSelected exists, use its value; otherwise, default to true.
                    isSelected: item.isSelected !== undefined ? item.isSelected : true,
                }));
                
                // 🎯 Step 2: Set the state ONCE with the fully prepared data
                setCartItems(normalizedItems); 

                setLoading(false); // Make sure this is outside any extra block scope
            });

            newSocket.on('cart:update:error', (errorMessage) => {
                console.error('Cart operation failed:', errorMessage);
                setError(errorMessage);
            });

        //    // --- Core Cart Event Listener (The Push Mechanism) ---
        // newSocket.on('cart:full_update', (serverCartItems) => {
        //     console.log('Received cart update from server:', serverCartItems);
        //     const cartData = Array.isArray(serverCartItems)
        //         ? serverCartItems.map(FormatCartData)
        //         : [];
        //     setCartItems(cartData);
        //     setLoading(false); 
        // });
        
        // newSocket.on('cart:update:error', (errorMessage) => {
        //     console.error('Cart operation failed:', errorMessage);
        //     setError(errorMessage);
        // });

        // Cleanup function: Closes the socket when the token or login status changes (or component unmounts)
        return () => {
            if (newSocket) {
                newSocket.close();
                setSocket(null); // Clear the socket state
            }
        };
    }, [accessToken, isLoggedIn]); // <-- Re-run effect when Access Token changes


// ----------------------------------------------------------------------
    // EFFECT 2: LOCAL CART SYNCHRONIZATION TRIGGER
    // ----------------------------------------------------------------------

    useEffect(() => {
        // Trigger merge ONLY when the user is confirmed to be logged in and authenticated.
        if (isLoggedIn) {
            mergeLocalCart();
        }
        // Dependency on mergeLocalCart ensures we always call the latest version
    }, [isLoggedIn, mergeLocalCart]); 

   
    // 1. Define removeFromCart (Must be done first, and wrapped in useCallback)
const removeFromCart = useCallback((itemId) => {
    if (!socket || !socket.connected) {
        setError('Not connected to server. Please try again.');
        return;
    }

    socket.emit('cart:remove', { itemId: itemId });

    // OPTIMISTIC UPDATE: Remove the item from local state immediately
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
}, [socket, setError, setCartItems]); // Dependencies required for useCallback


// Inside CartContextAuthenticated.js

const updateQuantityOnServer = useCallback((itemId, newQuantity) => {
    if (!socket || !socket.connected) {
        setError('Not connected to server. Please try again.');
        return;
    }

    if (newQuantity < 1) {
        return removeFromCart(itemId);
    }

    socket.emit('cart:update_quantity', { itemId: itemId, quantity: newQuantity });

    // 🛑 FIX: Ensure the item order is perfectly preserved.
    // The existing map is usually correct for this:
    setCartItems(prevItems => prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));

    // If the item order is still changing, it means the server's 'cart:full_update' 
    // event is arriving immediately after and is sending a re-sorted list. 
    // You MUST ensure your server-side cart fetching/updating logic preserves order 
    // (e.g., sort by the original `addedAt` timestamp or a stable ID).

}, [socket, setError, removeFromCart, setCartItems]);

const addToCart = useCallback((product) => {
    if (!socket || !socket.connected) {
        setError('Not connected to server. Please try again.');
        return;
    }

    // 1. Check if the digital product is already in the cart
    const isAlreadyInCart = cartItems.some(item => item.id === product.id);

    if (isAlreadyInCart) {
        // Instead of adding a duplicate, trigger a notification or redirect
        setNotificationProduct({
            ...product,
            alreadyInCart: true // Custom flag you can use in your UI toast/alert
        });
        return; 
    }

    // 2. If it's not in the cart, add exactly 1 quantity safely
    const finalPriceValue = Number(product.final_price ?? product.price) || 0;
    
    socket.emit('cart:add', { 
        product_id: product.id, 
        quantity: 1, 
        final_price: finalPriceValue, 
        isSelected: true 
    });

    setNotificationProduct(product);
}, [socket, setError, setNotificationProduct, cartItems]); // added cartItems to dependencies


   // Inside CartProvider:

const handleIncrement = useCallback((item) => {
    updateQuantityOnServer(item.id, item.quantity + 1);
}, [updateQuantityOnServer]); // ✅ Depends on the stable function

const handleDecrement = useCallback((item) => {
    if (item.quantity > 1) {
        updateQuantityOnServer(item.id, item.quantity - 1);
    } else {
        setItemToRemove(item); 
        setShowConfirmModal(true); 
    }
}, [updateQuantityOnServer]); // <-- Needs updateQuantityOnServer as a dependency
                               // (If updateQuantityOnServer is defined above and is stable, this is fine)
                               // If setItemToRemove/setShowConfirmModal are stable setters, they don't need to be listed.

   const confirmRemoveItem = useCallback(() => {
    if (itemToRemove) {
        // removeFromCart relies only on the stable 'socket' and 'setError'
        removeFromCart(itemToRemove.id); 
        setItemToRemove(null);
        setShowConfirmModal(false);
    }
}, [itemToRemove, removeFromCart]); // <-- Dependency on itemToRemove and removeFromCart
    
  // After (Recommended):
const handleCloseNotification = useCallback(() => { 
    setNotificationProduct(null); 
}, []); 

   // After (Recommended):
const clearEntireCart = useCallback(async () => {
    // Implement WebSocket/fetch logic here (e.g., socket.emit('cart:clear_all'))
    
    // For now, keep local state updates stable:
    setCartItems([]);
    setCheckoutItemsForPayment([]); 
}, []); // Empty array is fine since state setters are stable.

    
 
// After (Recommended):
const clearPurchasedItems = useCallback((purchasedItemIds) => {
    // 1. Guard clause: Ensure we only proceed if purchasedItemIds is a valid array.
    if (!Array.isArray(purchasedItemIds)) {
        console.warn("clearPurchasedItems called with non-array purchasedItemIds:", purchasedItemIds);
        return;
    }
    
    // Implement WebSocket/fetch logic here  
    setCartItems((prevCartItems) =>
        prevCartItems.filter(item => !purchasedItemIds.includes(item.id))
    );
    setCheckoutItemsForPayment([]);
}, []); // Empty array is fine since state setters are stable.

    // Calculate total items price for checkout items
    // const totalItemsPrice = useMemo(() => {
    //     return checkoutItemsForPayment.reduce((total, item) => total + (item.final_price * item.quantity), 0);
    // }, [checkoutItemsForPayment]);

  
     const totalItemsPrice = useMemo(() => {
  return checkoutItemsForPayment.reduce((total, item) => {
    const price = Number(item.final_price ?? item.price ?? 0);
    return total + price * (item.quantity || 0);
  }, 0);
}, [checkoutItemsForPayment]);



  // Step 1: Create a simple, specific dependency outside of useMemo
const hasMaslogItem = cartItems.some(item => item.place === 'Maslog'); 
// const hasDigitalProduct = cartItems.some(item => item.category === 'digital product'); 

// Step 2: Use the simpler dependency in useMemo
const isFreeShipping = useMemo(() => {
  // Use the derived boolean
  return totalItemsPrice > 2500 || hasMaslogItem 
}, [totalItemsPrice, hasMaslogItem]);

    const cartCount = useMemo(() => cartItems.length, [cartItems]);

    useEffect(() => {
        const FREE_SHIPPING_THRESHOLD = 2500;
       // Before the 'else' block:
        if (totalItemsPrice > FREE_SHIPPING_THRESHOLD) {
            // Check if the current rate is already 0.
            if (shippingRate !== 0) {
                setShippingRate(0); // Only update if it's currently not 0
            }
        } else {
          const totalWeight = checkoutItemsForPayment.reduce((total, item) => total + (item.weight || 0), 0);
          const newMultiplier = totalWeight > 0 ? (0.145 + 30 / totalWeight) : 0;
          // Calculate the NEW rate as a Number:
    const calculatedRate = checkoutItemsForPayment.reduce(
        (total, item) => total + (item.weight || 0) * newMultiplier, 0
    );
    
    // Round to 2 decimal places using Math.round for precise comparison
    const newRate = Math.round(calculatedRate * 100) / 100;
    
    if (newRate !== shippingRate) { // 🛑 ONLY update if the value is different!
        setShippingRate(newRate);
    }
 }
}, [checkoutItemsForPayment, totalItemsPrice, shippingRate]); // Add shippingRate to dependencies


//     // Step 1: Identify your cart composition
// const hasMaslogItem = cartItems.some(item => item.place === 'Maslog');
// const physicalItems = cartItems.filter(item => item.category !== 'digital product');
// const hasPhysicalItems = physicalItems.length > 0;

// // Step 2: Determine if shipping is free based ONLY on physical rules or local pickup
// const isFreeShipping = useMemo(() => {
//   // If there are NO physical items, it's a digital-only order (Free Shipping)
//   if (!hasPhysicalItems) return true;

//   // If there are physical items, check the 2500 threshold or Maslog location
//   return totalItemsPrice > 2500 || hasMaslogItem;
// }, [totalItemsPrice, hasMaslogItem, hasPhysicalItems]);
//    const cartCount = useMemo(() => cartItems.length, [cartItems]);


// // Step 3: Update Shipping Rate in useEffect
// useEffect(() => {
//   if (isFreeShipping) {
//     if (shippingRate !== 0) setShippingRate(0);
//   } else {
//     // 🛑 IMPORTANT: Calculate weight ONLY for the physical items
//     const physicalWeight = physicalItems.reduce((total, item) => total + (item.weight || 0), 0);

//     if (physicalWeight > 0) {
//       const newMultiplier = 0.145 + 30 / physicalWeight;
//       const calculatedRate = physicalWeight * newMultiplier;
//       const newRate = Math.round(calculatedRate * 100) / 100;

//       if (newRate !== shippingRate) {
//         setShippingRate(newRate);
//       }
//     } else {
//       // Fallback if physical items somehow have 0 weight
//       if (shippingRate !== 0) setShippingRate(0);
//     }
//   }
// }, [physicalItems, totalItemsPrice, shippingRate, isFreeShipping]);
    
const applyVoucherDiscount = useCallback((percentage, code) => { // <-- Add 'code' parameter
    setVoucherDiscount(totalItemsPrice * (percentage / 100));
    setVoucherCode(code); // <-- Store the code
}, [totalItemsPrice, setVoucherDiscount, setVoucherCode]);

 // ✅ NEW: reset function
  const clearVoucherDiscount = useCallback(() => {
    setVoucherDiscount(0);
    setVoucherCode(null);
  }, []);

    // Calculate final grand total
    const grandTotalAmount = useMemo(() => {
        let total = totalItemsPrice + shippingRate - voucherDiscount;
        return Math.max(0, total);
    }, [totalItemsPrice, shippingRate, voucherDiscount]);

    // Formatted grand total
    const formattedGrandTotal = useMemo(() => {
        return new Intl.NumberFormat('fil-PH', { style: 'currency', currency: 'PHP' }).format(grandTotalAmount);
    }, [grandTotalAmount]);
    

    const value = useMemo(() => ({
        cartItems,
        cartCount: cartItems.length, // useMemo already handled, but keeping direct for clarity
        loading,
        error,
        setCartItems,
        // fetchCart is removed from context value

        addToCart,
        removeFromCart,
        handleIncrement,
        handleDecrement,
        confirmRemoveItem,
       handleCloseNotification,
        notificationProduct,
        setNotificationProduct,
        // ... (rest of the checkout-related values) ...
        checkoutItemsForPayment,
        setCheckoutItemsForPayment,
        totalItemsPrice,
        shippingRate,
        voucherDiscount,
        voucherCode,
        applyVoucherDiscount,
        grandTotalAmount, // Replace with your actual grandTotalAmount memo
        formattedGrandTotal, // Replace with your actual formattedGrandTotal memo
        showConfirmModal,
        itemToRemove,
        setShowConfirmModal,
        isFreeShipping,
        clearPurchasedItems,
        clearVoucherDiscount
    }), [
        cartItems, cartCount, loading, error, notificationProduct, handleIncrement, handleDecrement,  handleCloseNotification,confirmRemoveItem,
        checkoutItemsForPayment, totalItemsPrice, shippingRate, voucherDiscount, showConfirmModal, itemToRemove, 
        isFreeShipping, voucherCode,clearPurchasedItems,clearVoucherDiscount
    ]);


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