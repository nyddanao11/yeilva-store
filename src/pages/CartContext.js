// CartProvider.js

import React, { useContext } from 'react';
import { useAuth } from './loginContext'; // ⬅️ Import your Auth context
import { CartProviderGuest } from './CartContextGuest'; // LocalStorage logic
import { CartProviderAuthenticated } from './CartContextAuthenticated'; // Socket.IO logic

export const CartContext = React.createContext(null);


export const MasterCartProvider = ({ children }) => {
    // 1. Get Authentication State
    const { isLoggedIn } = useAuth(); // Assume this hook provides the boolean status

    // 2. Conditionally Render the Internal Provider
    if (isLoggedIn) {
        // Logged-in: Use the server-backed, persistent cart (Socket.IO)
        return (
            <CartProviderAuthenticated>
                {children}
            </CartProviderAuthenticated>
        );
    } else {
        // Guest: Use the client-side, temporary cart (LocalStorage)
        return (
            <CartProviderGuest>
                {children}
            </CartProviderGuest>
        );
    }
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (context === null || context === undefined) {
        // This should not happen if providers are set up correctly, 
        // but it guards against the initial null value.
        
        // Throwing the error is best practice to catch missing providers:
        throw new Error('useCart must be used within a MasterCartProvider');
    }
    
    // The key fix for the "null" issue is usually ensuring the default value is an object,
    // but since the error comes from destructuring, we need to look at the consumer.

    return context;
};