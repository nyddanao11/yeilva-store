import React, { useState, useEffect } from 'react'; // <--- IMPORT useState
import Header from './Header';
import ShopeeNavbar from './ShoppeeNavbar';
import './CombinedNavbar.css'; // <--- IMPORT YOUR CSS FILE

export default function CombinedNavbar ({cartItems, isLoggedIn, userEmail, handleLogout, cartCount,  allProducts, fetchAllProducts, addToCart, storedProducts, handleItemClickCategory}) { 
                                            
  const [scrolled, setScrolled] = useState(false);
    const [headerShrink, setHeaderShrink] = useState(false); // New state

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            setScrolled(isScrolled);
            setHeaderShrink(window.scrollY > 100); // Shrink after a slightly larger scroll
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
            <div className={`sticky-navbar ${scrolled ? 'scrolled' : ''}`}>
        
            <Header
                cartItems={cartItems}
                cartCount={cartCount}
                isLoggedIn={isLoggedIn}
                handleLogout={handleLogout}
                allProducts={allProducts}
                fetchAllProducts={fetchAllProducts}
                addToCart={addToCart}
                 // headerShrink={headerShrink} 
            />

            {/* Render the ShopeeNavbar component */}
            <ShopeeNavbar
                cartItems={cartItems}
                cartCount={cartCount}
                isLoggedIn={isLoggedIn}
                userEmail={userEmail}
                handleLogout={handleLogout}
                handleItemClickCategory={handleItemClickCategory}
               
                
            />
        </div>
    );
}