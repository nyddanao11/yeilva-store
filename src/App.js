import React, { useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Products from './pages/Products';
import PcProducts from './pages/PcProducts';
import AvonProducts from'./pages/AvonProducts';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Search from './pages/Search';
import CheckoutPage from './pages/CheckoutPage';
import SignUpForm  from './components/SignupForm';
import {wellnessProductData} from'./data/wellnessProductData';
import {pcproductsData} from './data/pcproductsData';
import {avonproductsData} from './data/AvonProductsData';
import CombinedNavbar from './components/CombinedNavbar';
import DealsPage from './pages/Deals';
import MyAccountPage from './pages/MyAccount';
import GroceryItemsPage from './pages/GroceryItems';
import NewArrival from'./pages/NewArrival';
import { useAuth} from './pages/loginContext';
import ClickProductPage from'./pages/ClickProductPage';
import ClickProductPagePc from'./pages/ClickProductPagePc';
import ClickProductPageAvon from'./pages/ClickProductPageAvon';
import Brochure from'./components/BrochureServices';
import ClickBestSelling from './pages/ClickBestSelling';
import ClickFeaturedProduct from'./pages/ClickFeaturedProduct';
import ClickRecommendedProduct from './pages/ClickRecommendedProduct';
import ContactUs from'./components/ContactUs';
import BeautyProducts from'./pages/BeautyProducts';
import ClickBeautyProducts from'./pages/ClickBeautyProducts';
import FashionApparel from './pages/FashionApparel';
import SchoolSupplies from'./pages/SchoolSupplies';



function App() {

   const { isLoggedIn, login, logout } = useAuth();
   const [cartItems, setCartItems] = useState([]);
   const navigate = useNavigate();


  const addToCart = (product, selectedSize, selectedColor) => {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    const updatedItem = {
      ...existingItem,
      selectedSize,
      selectedColor,
    };
    const updatedCart = cartItems.map((item) =>
      item.id === product.id ? updatedItem : item
    );
    setCartItems(updatedCart);
  } else {
    const newItem = { ...product, quantity: 1, selectedSize, selectedColor };
    setCartItems([...cartItems, newItem]);
  }

  // Debugging: Log the selectedSize and selectedColor values
  console.log('Selected Size:', selectedSize);
  console.log('Selected Color:', selectedColor);
};



  const removeFromCart = (productToRemove) => {
    const updatedCart = cartItems.filter((product) => product.id !== productToRemove.id);
    setCartItems(updatedCart);
  };

const handleIncrement = (incrementItem) => {
  // Clone the cartItems array to make changes
  const updatedCart = cartItems.map((item) => {
    if (item.id === incrementItem.id) {
      return { ...item, quantity: item.quantity + 1 };
    }
    return item;
  });
  // Update the state with the updated cart
  setCartItems(updatedCart);
};

const handleDecrement = (decrementItem) => {
  // Clone the cartItems array to make changes
  const updatedCart = cartItems.map((item) => {
    if (item.id === decrementItem.id && item.quantity > 1) {
      return { ...item, quantity: item.quantity - 1 };
    }
    return item;
  });
  // Update the state with the updated cart
  setCartItems(updatedCart);
};

const handleLogout = () => {
  logout(); // Set the login status to false
  // You can also perform additional cleanup tasks here, such as clearing user data from local storage
};


 // Function to handle login
  const handleLogin = (email) => {
    console.log('User logged in successfully');
    login(email); // Set the login status to true
    // Redirect to the home page after login
    navigate('/');
  };

 
    return (
    
    <div>
      {/* Render the CombinedNavbar outside of the Routes */}
      <CombinedNavbar cartItems={cartItems} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      <Container className="mb-4">
        {/* Conditionally render Routes based on login status */}
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/products" element={<Products addToCart={addToCart}  />} />
            <Route path="/pcproducts" element={<PcProducts addToCart={addToCart} />} />
            <Route path="/beautyproducts" element={<BeautyProducts addToCart={addToCart} />} />
             <Route path="/fashionapparel" element={<FashionApparel addToCart={addToCart} />} />
             <Route path="/schoolsupplies" element={<SchoolSupplies addToCart={addToCart} />} />
            <Route path="/clickproductpage/:id" element={<ClickProductPage addToCart={addToCart} />} />
             <Route path="/clickproductpagepc/:id" element={<ClickProductPagePc addToCart={addToCart} />} />
             <Route path="/clickproductpageavon/:id" element={<ClickProductPageAvon addToCart={addToCart} />} />
            <Route path="/avonproducts" element={<AvonProducts addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement}  addToCart={addToCart} />}/>
            <Route path="/search" element={<Search wellnessProductData={wellnessProductData} pcproductsData={pcproductsData} avonproductsData={avonproductsData} addToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart}/>} />
            <Route path="/deals" element={<DealsPage addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/newarrival" element={<DealsPage addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount" element={<MyAccountPage />} />
            <Route path="/groceryitemspage" element={<GroceryItemsPage addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling addToCart={addToCart} />} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct addToCart={addToCart} />} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct addToCart={addToCart} />} />
              <Route path="/clickproductpagebeauty/:id" element={<ClickBeautyProducts addToCart={addToCart} />} />
              <Route path="/contactus" element={<ContactUs />} />
          </Routes>
        ) : (
          <Routes>

            <Route path="/" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/signupform" element={<SignUpForm handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <Route path="/login" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
          </Routes>
        )}
      </Container>
      </div>
      
    
    
  );
}


export default App;











