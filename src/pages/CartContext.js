import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import { io } from 'socket.io-client'; // 👈 Import socket.io-client
import { FormatCartData } from '../utils/FormatCartData';

const CartContext = createContext();

// --- WebSocket Configuration ---
// NOTE: Use the base server URL for the WebSocket connection
const WS_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:3001'; 
const JWT_STORAGE_KEY = 'authToken';

// --- WebSocket Instance (outside the component to maintain a single connection) ---
// We will initialize this inside the useEffect/Provider for better control
let socket;

/**
 * Helper to retrieve the JWT from local storage.
 * NOTE: For WebSockets, we pass the token during connection (initial handshake)
 * or as part of the payload for authenticated actions.
 * @returns {string | null} The JWT token.
 */
const getAuthToken = () => {
    try {
        return localStorage.getItem(JWT_STORAGE_KEY);
    } catch (e) {
        console.error("Error retrieving JWT from localStorage:", e);
        return null;
    }
};


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
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
    useEffect(() => {
        const token = getAuthToken();

        if (!token) {
            setLoading(false);
            setError("User not logged in or token missing.");
            return;
        }

        // Initialize WebSocket connection
        socket = io(WS_URL, {
            // Pass the JWT token on connection handshake
            auth: {
                token: token
            }
        });

        // --- Connection Handlers ---
        socket.on('connect', () => {
            console.log('WebSocket connected:', socket.id);
            setError(null);
            // After connection, request the initial cart data
            socket.emit('cart:get'); 
        });

        socket.on('disconnect', () => {
            console.log('WebSocket disconnected');
            setLoading(false);
        });

        // --- Error Handlers ---
        socket.on('connect_error', (err) => {
            console.error('Socket connection error:', err.message);
            setError(`Connection failed: ${err.message}`);
            setLoading(false);
        });

        // --- Core Cart Event Listener (The Push Mechanism) ---
        // The server will respond to 'cart:get' and successful mutations by emitting this event.
        socket.on('cart:full_update', (serverCartItems) => {
            console.log('Received cart update from server:', serverCartItems);
            // Apply client-side formatting
            const cartData = Array.isArray(serverCartItems)
                ? serverCartItems.map(FormatCartData)
                : [];
                console.log('cartItems:', cartData);
            setCartItems(cartData);
            setLoading(false); // Finished initial load
        });
        
        // --- Mutation Error Listener ---
        socket.on('cart:update:error', (errorMessage) => {
            console.error('Cart operation failed:', errorMessage);
            setError(errorMessage);
            // Optionally, re-fetch the cart state if an operation failed
            // socket.emit('cart:get'); 
        });


        // Cleanup function: Closes the socket connection when the component unmounts
        return () => {
            if (socket) {
                socket.off('connect');
                socket.off('disconnect');
                socket.off('connect_error');
                socket.off('cart:full_update');
                socket.off('cart:update:error');
                socket.close();
            }
        };
    }, []); // Empty dependency array ensures this runs once on mount


    // The `fetchCart` function is now obsolete and removed!
    // The initial load is handled by `socket.emit('cart:get')` on connect.

    // --- 2. WebSocket-Driven Cart Mutation Functions ---

    /**
     * Sends an action to the server via WebSocket.
     * The server handles DB logic and pushes the final state back via 'cart:full_update'.
     */
    const addToCart = (product) => {
        if (!socket || !socket.connected) {
            setError('Not connected to server. Please try again.');
            return;
        }
        // Send a message (event) to the server
        socket.emit('cart:add', { 
            product_id: product.id, 
            quantity: 1 
        });
        // Optimistic UI Update (optional but recommended for speed)
        setNotificationProduct(product);
    };

    const updateQuantityOnServer = (itemId, newQuantity) => {
        if (!socket || !socket.connected) {
            setError('Not connected to server. Please try again.');
            return;
        }
        
        if (newQuantity < 1) {
            // If new quantity is 0 or less, we treat it as a remove action
            return removeFromCart(itemId);
        }

        socket.emit('cart:update_quantity', {
            itemId: itemId, 
            quantity: newQuantity 
        });
        
        // OPTIMISTIC UPDATE: Update the local state immediately
        setCartItems(prevItems => prevItems.map(item =>
            item.id === itemId ? { ...item, quantity: newQuantity } : item
        ));
    };

    const removeFromCart = (itemId) => {
        if (!socket || !socket.connected) {
            setError('Not connected to server. Please try again.');
            return;
        }

        socket.emit('cart:remove', { itemId: itemId });
        
        // OPTIMISTIC UPDATE: Remove the item from local state immediately
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };


   // Inside CartProvider:

const handleIncrement = useCallback((item) => {
    // updateQuantityOnServer relies only on the stable 'socket' and 'setError'
    updateQuantityOnServer(item.id, item.quantity + 1);
}, []); // <-- Empty dependency array means this function is stable

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
        if (totalItemsPrice > FREE_SHIPPING_THRESHOLD) {
          setShippingRate(0);
        } else {
          const totalWeight = checkoutItemsForPayment.reduce((total, item) => total + (item.weight || 0), 0);
          const newMultiplier = totalWeight > 0 ? (0.145 + 30 / totalWeight) : 0;
          const calculatedShippingRate = (
            checkoutItemsForPayment.reduce((total, item) =>
              total + (item.weight || 0) * newMultiplier, 0)
          ).toFixed(2);
          setShippingRate(Number(calculatedShippingRate));
        }
      }, [checkoutItemsForPayment, totalItemsPrice]);
    
    // After (Recommended):
const applyVoucherDiscount = useCallback((percentage) => { 
    setVoucherDiscount(totalItemsPrice * (percentage / 100));
}, [totalItemsPrice]); 

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
        grandTotalAmount: 1000, // Replace with your actual grandTotalAmount memo
        formattedGrandTotal: 'PHP 1,000.00', // Replace with your actual formattedGrandTotal memo
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