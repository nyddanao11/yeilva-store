import React, { createContext, useState, useContext, useEffect, useMemo, useCallback } from 'react';
import {FormatCartData} from'../utils/FormatCartData';

const CartContext = createContext();

// --- API Configuration ---
const API_URL = `${process.env.REACT_APP_SERVER_URL}/api/cart`; 
// KEY: Assuming your JWT token is stored here after successful login
const JWT_STORAGE_KEY = 'authToken'; 

/**
 * Helper to retrieve the JWT from local storage and format the Authorization header.
 * @returns {HeadersInit} The headers object containing the Authorization header, or an empty object.
 */
const getAuthHeaders = () => {
    try {
        const token = localStorage.getItem(JWT_STORAGE_KEY);
        if (token) {
            return {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // MANDATORY: Format is 'Bearer <token>'
            };
        }
    } catch (e) {
        console.error("Error retrieving JWT from localStorage:", e);
    }
    // If no token is found, return standard headers
    return { 'Content-Type': 'application/json' }; 
};


export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Keep client-side state for checkout/UI logic
    const [notificationProduct, setNotificationProduct] = useState(null);
    const [checkoutItemsForPayment, setCheckoutItemsForPayment] = useState([]);
    const [shippingRate, setShippingRate] = useState(0);
    const [voucherDiscount, setVoucherDiscount] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);


    // --- Core Server Communication Function ---

    // Function to fetch the cart from the server (used on mount and after mutations)
    const fetchCart = useCallback(async () => {
        const headers = getAuthHeaders();
        // If there is no token, we should probably stop the request, 
        // as the backend will return a 401 anyway.
        if (!headers.Authorization) {
            setLoading(false);
            setCartItems([]);
            setError("User not logged in or token missing.");
            return;
        }

        setLoading(true);
        setError(null);
        try {
            // Include authentication headers here
            const response = await fetch(API_URL, { headers }); 
            
            if (response.status === 401) {
                // If the token is rejected (401), clear cart and notify user (optional: redirect to login)
                console.error("Authentication failed or token expired. Clearing token...");
                localStorage.removeItem(JWT_STORAGE_KEY);
                setCartItems([]); 
                throw new Error('Authentication required.');
            }
            if (!response.ok) {
                throw new Error('Failed to fetch cart from server.');
            }

            const data = await response.json();
            
            // --- FIX APPLIED HERE ---
            // 1. 'data' already holds the JSON result.
            // 2. Since the server now returns price/discount as numbers (based on the server.js file),
            //    we use the data directly, assuming FormatProductData is no longer strictly needed for type conversion.
            //    If FormatProductData is still required for other complex client-side formatting, use it on the 'data' array.
            const cartData = Array.isArray(data)
                ? data.map(FormatCartData)
                : []; // Fallback if the server somehow returns non-array data
            
            setCartItems(cartData);
            console.log('Fetched cart data:', cartData); 
            // ------------------------

        } catch (err) {
            console.error("Error fetching cart:", err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    // Load cart on component mount
    useEffect(() => {
        fetchCart();
    }, [fetchCart]);


    // --- API-Driven Cart Mutation Functions (All now include JWT) ---

    // 2. Add an item (POST)
    const addToCart = async (product) => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                // Use getAuthHeaders() to include JWT AND Content-Type
                headers: getAuthHeaders(), 
                body: JSON.stringify({ product_id: product.id, quantity: 1 }),
            });

            if (!response.ok) {
                if (response.status === 401) throw new Error('Authentication required to add item.');
                throw new Error('Failed to add item to cart on server.');
            }

            // After success, re-fetch the entire cart to update local state
            await fetchCart();
            setNotificationProduct(product);

        } catch (err) {
            console.error('Error adding item to cart:', err);
        }
    };

    // Helper for quantity change (PUT request)
    const updateQuantityOnServer = async (itemId, newQuantity) => {
        if (newQuantity < 1) {
            return removeFromCart(itemId);
        }

        try {
            const response = await fetch(`${API_URL}/${itemId}`, {
                method: 'PUT',
                // Use getAuthHeaders() to include JWT AND Content-Type
                headers: getAuthHeaders(), 
                body: JSON.stringify({ quantity: newQuantity }),
            });

            if (!response.ok) {
                if (response.status === 401) throw new Error('Authentication required to update quantity.');
                throw new Error('Failed to update quantity on server.');
            }

            await fetchCart(); // Re-fetch cart to reflect new quantity
        } catch (err) {
            console.error('Error updating quantity:', err);
        }
    };
    
    // 3. Remove an item (DELETE)
    const removeFromCart = async (productId) => {
        try {
            const response = await fetch(`${API_URL}/${productId}`, {
                method: 'DELETE',
                // Use getAuthHeaders() just for Authorization
                headers: getAuthHeaders(), 
            });

            if (response.status === 204) {
                await fetchCart();
            } else if (!response.ok) {
                if (response.status === 401) throw new Error('Authentication required to remove item.');
                throw new Error('Failed to remove item from server.');
            }

        } catch (err) {
            console.error('Error removing item:', err);
        }
    };


    // --- All other functions (handleIncrement, handleDecrement, checkout logic) are unchanged ---
    
    // 4. Increment quantity
    const handleIncrement = (item) => {
        updateQuantityOnServer(item.id, item.quantity + 1);
    };

 const handleDecrement = (item) => {
  if (item.quantity > 1) {
    updateQuantityOnServer(item.id, item.quantity - 1);
  } else {
    setItemToRemove(item); // Store item for modal
    setShowConfirmModal(true); // Show confirmation modal
  }
};

const confirmRemoveItem = () => {
  if (itemToRemove) {
    removeFromCart(itemToRemove.id);
    setItemToRemove(null);
    setShowConfirmModal(false);
  }
};

    const handleCloseNotification = () => { setNotificationProduct(null); };

    // Placeholder for server-side clearing (Needs DELETE /api/cart/all endpoint)
    const clearEntireCart = async () => {
        // ... implementation using fetch with DELETE method and getAuthHeaders() ...
        setCartItems([]);
        setCheckoutItemsForPayment([]); 
    };
    
    // Placeholder for server-side clearing purchased items
    const clearPurchasedItems = async (purchasedItemIds) => {
        // ... implementation using fetch with DELETE method and getAuthHeaders() ...
        setCartItems((prevCartItems) =>
            prevCartItems.filter(item => !purchasedItemIds.includes(item.id))
        );
        setCheckoutItemsForPayment([]);
    };

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
    
    // Handle voucher application
    const applyVoucherDiscount = (percentage) => {
        setVoucherDiscount(totalItemsPrice * (percentage / 100));
    };

    // Calculate final grand total
    const grandTotalAmount = useMemo(() => {
        let total = totalItemsPrice + shippingRate - voucherDiscount;
        return Math.max(0, total);
    }, [totalItemsPrice, shippingRate, voucherDiscount]);

    // Formatted grand total
    const formattedGrandTotal = useMemo(() => {
        return new Intl.NumberFormat('fil-PH', { style: 'currency', currency: 'PHP' }).format(grandTotalAmount);
    }, [grandTotalAmount]);
    

    const value = {
        cartItems,
        cartCount: cartItems.length, // useMemo already handled, but keeping direct for clarity
        loading,
        error,
        fetchCart, 

        addToCart,
        removeFromCart,
        handleIncrement,
        handleDecrement,

        notificationProduct,
        setNotificationProduct,
        handleCloseNotification,
        setCartItems, // If still needed for `isSelected` management

        
        checkoutItemsForPayment,
        setCheckoutItemsForPayment,
        totalItemsPrice,
        shippingRate,
        isFreeShipping,
        voucherDiscount,
        applyVoucherDiscount,
        grandTotalAmount,
        formattedGrandTotal,
        clearPurchasedItems,
        clearEntireCart,
        confirmRemoveItem,
        showConfirmModal,
        itemToRemove,
        setShowConfirmModal,
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
