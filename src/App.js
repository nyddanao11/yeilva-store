import React, { useState} from 'react';
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
import ShoppingCart from'./components/ShoppingCart';
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
import TermsAndConditionsPage from'./pages/TermsAndConditions';
import PrivacyPolicyPage from'./pages/PrivacyPolicy';
import ClickBeverages from './components/Groceries/ClickBeverages';
import ClickFrozenFoods from'./components/Groceries/ClickFrozenFoods';
import ClickSnacks from'./components/Groceries/ClickSnacks';
import ClickAlcoholic from'./components/Groceries/ClickAlcoholic';
import ClickInstantNoodles from'./components/Groceries/ClickInstantNoodles';
import ClickCanGoods from'./components/Groceries/ClickCanGoods';
import ClickLaundry from'./components/Groceries/ClickLaundry';
import ClickCooking from'./components/Groceries/ClickCooking';
import ClickVitamins from'./components/Groceries/ClickVitamins';
import ClickRice from'./components/Groceries/ClickRice';
import ConfirmPage from'./pages/ConfirmPage';
import ClickMarker from'./components/SchoolSupplies/ClickBallpenMarker';
import ClickPaper from'./components/SchoolSupplies/ClickBondPaper';
import ClickNote from'./components/SchoolSupplies/ClickNotebook';


function App() {

   const { isLoggedIn, login, logout } = useAuth();
   const [cartItems, setCartItems] = useState([]);
   const navigate = useNavigate();
   

const addToCart = (product) => {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    const updatedItem = {
      ...existingItem,
    };
    const updatedCart = cartItems.map((item) =>
      item.id === product.id ? updatedItem : item
    );
    setCartItems(updatedCart);
  } else {
    const newItem = { ...product, quantity: 1 };
    setCartItems([...cartItems, newItem]);
  }
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
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart}  />} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />} />
            <Route path="/deals" element={<DealsPage addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount" element={<MyAccountPage />} />
            <Route path="/groceryitemspage" element={<GroceryItemsPage addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling addToCart={addToCart} />} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct addToCart={addToCart} />} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct addToCart={addToCart} />} />
              <Route path="/clickproductpagebeauty/:id" element={<ClickBeautyProducts addToCart={addToCart} />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/clickbeverages/:id" element={<ClickBeverages addToCart={addToCart} />} />
               <Route path="/clickfrozenfoods/:id" element={<ClickFrozenFoods addToCart={addToCart} />} />
               <Route path="/clicksnacks/:id" element={<ClickSnacks addToCart={addToCart} />} />
               <Route path="/clickalcoholic/:id" element={<ClickAlcoholic addToCart={addToCart} />} />
              <Route path="/clickinstantnoodles/:id" element={<ClickInstantNoodles addToCart={addToCart} />} />
               <Route path="/clickcangoods/:id" element={<ClickCanGoods addToCart={addToCart} />} />
               <Route path="/clicklaundry/:id" element={<ClickLaundry addToCart={addToCart} />} />
               <Route path="/clickcooking/:id" element={<ClickCooking addToCart={addToCart} />} />
               <Route path="/clickvitamins/:id" element={<ClickVitamins addToCart={addToCart} />} />
              <Route path="/clickrice/:id" element={<ClickRice addToCart={addToCart} />} />
              <Route path="/clickballpen/:id" element={<ClickMarker addToCart={addToCart} />} />
              <Route path="/clickbondpaper/:id" element={<ClickPaper addToCart={addToCart} />} />
               <Route path="/clicknotebook/:id" element={<ClickNote addToCart={addToCart} />} />
              
          </Routes>
        ) : (
          <Routes>

            <Route path="/" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/signupform" element={<SignUpForm handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <Route path="/confirm" element={<ConfirmPage  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/login" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/privacypolicy" element={<PrivacyPolicyPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
          </Routes>
        )}
      </Container>
      </div>
         
  );
}


export default App;












