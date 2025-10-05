import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { io } from 'socket.io-client'; // 👈 Import socket.io-client
import { FormatCartData } from '../utils/FormatCartData';
import { CartContext } from './CartContext';
import { useAuth } from './loginContext'; // ⬅️ Import your Auth context
// --- WebSocket Configuration ---
// NOTE: Use the base server URL for the WebSocket connection
const WS_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001'; 


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
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

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

        // --- Core Cart Event Listener (The Push Mechanism) ---
        newSocket.on('cart:full_update', (serverCartItems) => {
            console.log('Received cart update from server:', serverCartItems);
            const cartData = Array.isArray(serverCartItems)
                ? serverCartItems.map(FormatCartData)
                : [];
            setCartItems(cartData);
            setLoading(false); 
        });
        
        newSocket.on('cart:update:error', (errorMessage) => {
            console.error('Cart operation failed:', errorMessage);
            setError(errorMessage);
        });

        // Cleanup function: Closes the socket when the token or login status changes (or component unmounts)
        return () => {
            if (newSocket) {
                newSocket.close();
                setSocket(null); // Clear the socket state
            }
        };
    }, [accessToken, isLoggedIn]); // <-- Re-run effect when Access Token changes


   
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

// 3. Define addToCart (Can be anywhere after dependencies are defined)
const addToCart = useCallback((product) => {
    if (!socket || !socket.connected) {
        setError('Not connected to server. Please try again.');
        return;
    }
    socket.emit('cart:add', { product_id: product.id, quantity: 1 });
    setNotificationProduct(product);
}, [socket, setError, setNotificationProduct]);


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
const clearPurchasedItems = useCallback(async (purchasedItemIds) => {
    // Implement WebSocket/fetch logic here
    
    setCartItems((prevCartItems) =>
        prevCartItems.filter(item => !purchasedItemIds.includes(item.id))
    );
    setCheckoutItemsForPayment([]);
}, []); // Empty array is fine since state setters are stable.

    // Calculate total items price for checkout items
    const totalItemsPrice = useMemo(() => {
        return checkoutItemsForPayment.reduce((total, item) => total + (item.price * item.quantity), 0);
    }, [checkoutItemsForPayment]);

    // Calculate shipping rate (remains client-side logic for now)
    const isFreeShipping = useMemo(() => totalItemsPrice > 2500, [totalItemsPrice]);
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
    
 const applyVoucherDiscount = useCallback((percentage) => { 
    setVoucherDiscount(totalItemsPrice * (percentage / 100));
}, [totalItemsPrice, setVoucherDiscount]); // ✅ Added setVoucherDiscount

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
        applyVoucherDiscount,
        grandTotalAmount, // Replace with your actual grandTotalAmount memo
        formattedGrandTotal, // Replace with your actual formattedGrandTotal memo
        showConfirmModal,
        itemToRemove,
        setShowConfirmModal,
    }), [
        cartItems, cartCount, loading, error, notificationProduct, handleIncrement, handleDecrement,  handleCloseNotification,confirmRemoveItem,
        checkoutItemsForPayment, totalItemsPrice, shippingRate, voucherDiscount, showConfirmModal, itemToRemove
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