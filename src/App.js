import React, { useState, useEffect} from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
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
import {beautyProductsData} from './data/BeautyProductsData';
import CombinedNavbar from './components/CombinedNavbar';
import DealsPage from './pages/Deals';
import LoanForm from './pages/LoanForm';
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
import ReturnPolicyPage from'./pages/ReturnPolicy';
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
import ForgotPassword from'./pages/forgotPassword';
import OTPConfirmation from'./pages/OtpConfirmation';
import ChangePassword from './pages/ChangePassword';
import ClickMarker from'./components/SchoolSupplies/ClickBallpenMarker';
import ClickPaper from'./components/SchoolSupplies/ClickBondPaper';
import ClickNote from'./components/SchoolSupplies/ClickNotebook';
import ClickDeals from'./pages/ClickDeals';
import ClickWomens from './components/Fashion/ClickWomens';
import ClickMens from './components/Fashion/ClickMens';
import ClickMensShoes from './components/Fashion/ClickMensShoes';
import ClickWomensShoes from './components/Fashion/ClickWomensShoes';
import CheckoutHistoryPage from './components/CheckoutHistoryPage';
import LoanFormHistoryPage from './components/LoanFormHistoryPage';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './pages/AdminLoginPage';
import AdminPage from './components/AdminPage';
import RestrictedAccess from'./components/RestrictedAccess';
import GrocerySidebar from './pages/GrocerySideBar';
import PrivateRoute from './pages/PrivateRoute'; // Import your PrivateRoute component
import LockoutPage from './pages/LockoutPage';
import InstallmentHistorypage from './components/InstallmentHistoryPage';
import InstallmentUser from'./pages/InstallmentUsers';
import Epayment from'./pages/Epayment';




function App() {


   const { isLoggedIn, login, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);



const [cartItems, setCartItems] = useState(() => {
  // Use a function to get the initial value from localStorage
  const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  setCartCount(storedItems.length); // Update the cart count
  return storedItems;
});
 
   const navigate = useNavigate();
   
 useEffect(() => {
   
    // Save cartItems to localStorage whenever it changes
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    // Update the cart count whenever cartItems change
    setCartCount(cartItems.length);
  }, [cartItems,  setCartCount]);


  useEffect(() => {
  
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedItems);
    // Update the cart count on component mount
    setCartCount(storedItems.length);
  }, []);


const addToCart = (product) => {
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    // If the item already exists, update the quantity using the functional form
    setCartItems((prevCartItems) => {
      return prevCartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    });

    // Schedule the localStorage update after the state has been updated
    setTimeout(() => {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, 0);
  } else {
    // If the item is not in the cart, add a new item with a quantity of 1
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems, { ...product, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));
      return newCartItems;
    });
  }
};




const removeFromCart = (itemId) => {
  console.log('Removing item with ID:', itemId);
  setCartItems((prevCartItems) => {
    const updatedCart = prevCartItems.filter((item) => String(item.id) !== String(itemId));
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    return updatedCart;
  });
};


const handleIncrement = (item) => {
  console.log('Incrementing quantity for item with ID:', item.id);
  setCartItems((prevCartItems) => {
    const updatedCart = prevCartItems.map((cartItem) =>
      cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    return updatedCart;
  });
};

const handleDecrement = (item) => {
  console.log('Decrementing quantity for item with ID:', item.id);
  setCartItems((prevCartItems) => {
    const updatedCart = prevCartItems.map((cartItem) =>
      cartItem.id === item.id && cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : cartItem
    );
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    return updatedCart;
  });
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
      <CombinedNavbar cartItems={cartItems} cartCount={cartCount} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

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
            <Route path="/homekitchen" element={<NotFoundPage/>}/>
            <Route path="/homeimprovement" element={<NotFoundPage/>}/>
            <Route path="/outdoorsports" element={<NotFoundPage/>}/>
            <Route path="/clickproductpage/:id" element={<ClickProductPage addToCart={addToCart} />} />
             <Route path="/clickproductpagepc/:id" element={<ClickProductPagePc addToCart={addToCart} />} />
             <Route path="/clickproductpageavon/:id" element={<ClickProductPageAvon addToCart={addToCart} />} />
            <Route path="/avonproducts" element={<AvonProducts addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement}  addToCart={addToCart} />}/>
            <Route path="/search" element={<Search wellnessProductData={wellnessProductData} pcproductsData={pcproductsData} avonproductsData={avonproductsData} addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement}  addToCart={addToCart} setCartItems={setCartItems}  setCartCount={setCartCount} cartCount={cartCount}/>}/>
            <Route path="/search" element={<Search wellnessProductData={wellnessProductData} pcproductsData={pcproductsData} 
                                              avonproductsData={avonproductsData} beautyProductsData={beautyProductsData} addToCart={addToCart} />} />

            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} />} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />} />
            <Route path="/deals" element={<DealsPage addToCart={addToCart} cartItems={cartItems} />} />
             <Route path="/loanform" element={<LoanForm  addToCart={addToCart}/>} />
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount" element={<MyAccountPage addToCart={addToCart}/>} />
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
                <Route path="/clickwomens/:id" element={<ClickWomens addToCart={addToCart} />} />
                  <Route path="/clickmens/:id" element={<ClickMens addToCart={addToCart} />} />
                   <Route path="/clickmensshoes/:id" element={<ClickMensShoes addToCart={addToCart} />} />
                    <Route path="/clickwomensshoes/:id" element={<ClickWomensShoes addToCart={addToCart} />} />
                <Route path="/clickdeals/:id" element={<ClickDeals addToCart={addToCart} />} />
                 <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
                <Route path="/checkouthistory" element={<CheckoutHistoryPage />} />
                 <Route path="/loanformhistory" element={<LoanFormHistoryPage />} />
                 <Route path="/restrictedaccess" element={<RestrictedAccess/>} />
                  <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path="/grocerysidebar" element={<GrocerySidebar />} />
                    <Route path ="/adminloginpage" element={<LoginPage />}/>
                      <Route path="/installmenthistorypage" element={<InstallmentHistoryPage />} />
                     <Route path="/installmentuser" element={<InstallmentUser />} />
                      <Route path="/epayment" element={<Epayment />} />
                      <Route path="/adminpage" element={<PrivateRoute element={<AdminPage />} />} />
                   

                 <Route component={NotFoundPage} />
                        
          </Routes>
        ) : (
          <Routes>

            <Route path="/" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/signupform" element={<SignUpForm handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <Route path="/confirm" element={<ConfirmPage  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
             <Route path="/forgotpassword" element={<ForgotPassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/otpconfirmation" element={<OTPConfirmation  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/changepassword" element={<ChangePassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
               <Route path="/lockoutpage" element={ <LockoutPage />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/privacypolicy" element={<PrivacyPolicyPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
             <Route path="/deals" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
              <Route path="/loanform"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
              <Route path="/myaccount" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
               <Route path="/groceryitemspage" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                <Route path="/products" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/pcproducts" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/beautyproducts" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
             <Route path="/fashionapparel" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
             <Route path="/schoolsupplies" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
              <Route path="/avonproducts" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
               <Route path="/homekitchen" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                <Route path="/homeimprovement" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                 <Route path="/outdoorsports" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                  <Route path="/cart" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                   <Route path="/search" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
             
          
            <Route component={NotFoundPage} />

            

          </Routes>
        )}
      </Container>
      </div>
         
  );
}



export default App;











