import React from 'react';
import Header from './Header'; // Import your Header component
import ShopeeNavbar from './ShoppeeNavbar'; // Import your ShopeeNavbar component

export default function CombinedNavbar ({ cartItems, isLoggedIn, handleLogout, cartCount,  allProducts, addToCart})  {
  const combinedNavbarStyle = {
    position: 'sticky',
    top: 0, // Stick to the top of the viewport
    zIndex: 100, // Adjust the z-index as needed to control stacking order
    // Add any other styles you want here
  };

  return (
    <div style={combinedNavbarStyle}>
      {/* Render the Header component */}
      <Header cartItems={cartItems}  cartCount={cartCount} isLoggedIn={isLoggedIn} handleLogout={handleLogout}   allProducts={allProducts} addToCart={addToCart}/>

      {/* Render the ShopeeNavbar component */}
      <ShopeeNavbar cartItems={cartItems} cartCount={cartCount} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
    </div>
  );
};

