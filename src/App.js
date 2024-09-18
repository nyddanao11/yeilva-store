import React, { useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import Products from './pages/Products';
import PcProducts from './pages/PcProducts';
import AvonProducts from'./pages/AvonProducts';
import Home from './pages/Home';
import ConsumerElectronic from'./pages/ConsumerElectronic';
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
import {dealsElectronicData} from './data/DealsElectronicData';
import CombinedNavbar from './components/CombinedNavbar';
import DealsOfDay from'./pages/DealsOfDay';
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
import TermsAndConditionsPage from'./pages/TermsAndConditions';
import PrivacyPolicyPage from'./pages/PrivacyPolicy';
import ReturnPolicyPage from'./pages/ReturnPolicy';
import ClickBeverages from './components/Groceries/ClickBeverages';
import ClickFrozenFoods from'./components/Groceries/ClickFrozenFoods';
import ClickInstantNoodles from'./components/Groceries/ClickInstantNoodles';
import ClickCanGoods from'./components/Groceries/ClickCanGoods';
import ClickVitamins from'./components/Groceries/ClickVitamins';
import ClickRice from'./components/Groceries/ClickRice';
import ConfirmPage from'./pages/ConfirmPage';
import ForgotPassword from'./pages/forgotPassword';
import OTPConfirmation from'./pages/OtpConfirmation';
import ChangePassword from './pages/ChangePassword';
import ClickEarphone from'./components/Electronics/ClickEarphone';
import ClickSpeaker from'./components/Electronics/ClickSpeaker';
import ClickDeals from'./pages/ClickDeals';
import ClickDealsFashion from'./pages/ClickDealsFashion';
import ClickDealsElectronic from'./pages/ClickDealsElectronic';
import ClickWomens from './components/Fashion/ClickWomens';
import ClickMens from './components/Fashion/ClickMens';
import ClickMensShoes from './components/Fashion/ClickMensShoes';
import ClickWomensShoes from './components/Fashion/ClickWomensShoes';
import ClickYouMayLike from './pages/ClickYouMayLike';
import CheckoutHistoryPage from './components/CheckoutHistoryPage';
import LoanFormHistoryPage from './components/LoanFormHistoryPage';
import NotFoundPage from './components/NotFoundPage';
import LoginPage from './pages/AdminLoginPage';
import AdminPage from './components/AdminPage';
import RestrictedAccess from'./components/RestrictedAccess';
import GrocerySidebar from './pages/GrocerySideBar';
import PrivateRoute from './pages/PrivateRoute'; // Import your PrivateRoute component
import LockoutPage from './pages/LockoutPage';
import InstallmentHistoryPage from './components/InstallmentHistoryPage';
import Epayment from'./pages/Epayment';
import DeleteAccount from './components/DeleteAccount';
import ScrollToTop from './pages/ScrollToTop';
import LoanTerms from './pages/LoanTerms';
import NeedHelp from'./pages/NeedHelp';
import OfflineIndicator from'./pages/OfflineIndicator';
import ReviewComponent from'./components/ReviewComponent';
import Footer from './components/Footer';
import RegisterPage from'./pages/AdminRegisterPage';
import InstallmentTerms from'./pages/installmentTerms';
import Freebies from './components/Freebies';
import RaffleMechanics from './components/RaffleMechanics';
import BarleyGrassJuice from './components/SqueezePage/SqueezePageBarley';


function App() {

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
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
      <OfflineIndicator />
    <ScrollToTop />
      {/* Render the CombinedNavbar outside of the Routes */}
      <CombinedNavbar cartItems={cartItems} cartCount={cartCount} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
   {isLargeScreen?(
      <Container>
        {/* Conditionally render Routes based on login status */}
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn} />} />
            <Route path="/products" element={<Products addToCart={addToCart}  />} />
            <Route path="/pcproducts" element={<PcProducts addToCart={addToCart} />} />
            <Route path="/beautyproducts" element={<BeautyProducts addToCart={addToCart} />} />
             <Route path="/fashionapparel" element={<FashionApparel addToCart={addToCart} />} />
            <Route path="/homekitchen" element={<NotFoundPage/>}/>
            <Route path="/homeimprovement" element={<NotFoundPage/>}/>
            <Route path="/outdoorsports" element={<NotFoundPage/>}/>
             <Route path="/consumerelectronics" element={<ConsumerElectronic  addToCart={addToCart}/>}/>
            <Route path="/clickproductpage/:id" element={<ClickProductPage addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagepc/:id" element={<ClickProductPagePc addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpageavon/:id" element={<ClickProductPageAvon addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
            <Route path="/avonproducts" element={<AvonProducts addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement}  addToCart={addToCart} setCartItems={setCartItems}  setCartCount={setCartCount} cartCount={cartCount}  isLoggedIn={isLoggedIn}/>}/>
            <Route path="/search" element={<Search wellnessProductData={wellnessProductData} pcproductsData={pcproductsData} 
                                              avonproductsData={avonproductsData} beautyProductsData={beautyProductsData} dealsElectronicData={dealsElectronicData} addToCart={addToCart} />} />

            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />} />
           <Route path="/dealsofday" element={<DealsOfDay addToCart={addToCart} cartItems={cartItems}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/loanform" element={<LoanForm  addToCart={addToCart}/>} />
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount" element={<MyAccountPage addToCart={addToCart}/>} />
            <Route path="/groceryitemspage" element={<GroceryItemsPage addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickproductpagebeauty/:id" element={<ClickBeautyProducts addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/clickbeverages/:id" element={<ClickBeverages addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
               <Route path="/clickfrozenfoods/:id" element={<ClickFrozenFoods addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickinstantnoodles/:id" element={<ClickInstantNoodles addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
               <Route path="/clickcangoods/:id" element={<ClickCanGoods addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
          <Route path="/clickvitamins/:id" element={<ClickVitamins addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickrice/:id" element={<ClickRice addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
           
                <Route path="/clickearphone/:id" element={<ClickEarphone addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickspeaker/:id" element={<ClickSpeaker addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickwomens/:id" element={<ClickWomens addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                  <Route path="/clickmens/:id" element={<ClickMens addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                   <Route path="/clickmensshoes/:id" element={<ClickMensShoes addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                    <Route path="/clickwomensshoes/:id" element={<ClickWomensShoes addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickdeals/:id" element={<ClickDeals addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                  <Route path="/clickdealsfashion/:id" element={<ClickDealsFashion  addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                     <Route path="/clickdealselectronic/:id" element={<ClickDealsElectronic  addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                   <Route path="/clickyoumaylike/:id" element={<ClickYouMayLike  addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                 <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
                <Route path="/checkouthistory" element={<CheckoutHistoryPage />} />
                 <Route path="/loanformhistory" element={<LoanFormHistoryPage />} />
                 <Route path="/restrictedaccess" element={<RestrictedAccess/>} />
                  <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path="/grocerysidebar" element={<GrocerySidebar />} />
                    <Route path ="/adminloginpage" element={<LoginPage />}/>
                     <Route path ="/adminregisterpage" element={<RegisterPage />}/>
                      <Route path="/installmenthistorypage" element={<InstallmentHistoryPage />} />
                      <Route path="/installmentterms" element={<InstallmentTerms />} />
                     <Route path="/epayment" element={<Epayment />} />
                      <Route path="/adminpage" element={<PrivateRoute element={<AdminPage />} />} />
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                            <Route path="/freebies" element={<Freebies  addToCart={addToCart}/>} />
                            <Route path="/rafflemechanics" element={<RaffleMechanics/>}/>
                            <Route path="/barleygrassjuice" element={<BarleyGrassJuice />}/>
                   
                 <Route component={NotFoundPage} />
                        
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
           <Route path="/signupform" element={<SignUpForm handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <Route path="/confirm" element={<ConfirmPage  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
             <Route path="/forgotpassword" element={<ForgotPassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/otpconfirmation" element={<OTPConfirmation  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/changepassword" element={<ChangePassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/lockoutpage" element={ <LockoutPage />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
             <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/products" element={<Products addToCart={addToCart}  />} />
            <Route path="/pcproducts" element={<PcProducts addToCart={addToCart} />} />
            <Route path="/beautyproducts" element={<BeautyProducts addToCart={addToCart} />} />
             <Route path="/fashionapparel" element={<FashionApparel addToCart={addToCart} />} />
            <Route path="/consumerelectronics" element={<ConsumerElectronic  addToCart={addToCart}/>}/>
            <Route path="/homekitchen" element={<NotFoundPage/>}/>
            <Route path="/homeimprovement" element={<NotFoundPage/>}/>
            <Route path="/outdoorsports" element={<NotFoundPage/>}/>
            <Route path="/clickproductpage/:id" element={<ClickProductPage addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagepc/:id" element={<ClickProductPagePc addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpageavon/:id" element={<ClickProductPageAvon addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
            <Route path="/avonproducts" element={<AvonProducts addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement}  addToCart={addToCart} setCartItems={setCartItems}  setCartCount={setCartCount} cartCount={cartCount}  isLoggedIn={isLoggedIn}/>}/>
            <Route path="/search" element={<Search wellnessProductData={wellnessProductData} pcproductsData={pcproductsData} 
                                              avonproductsData={avonproductsData} beautyProductsData={beautyProductsData} dealsElectronicData={dealsElectronicData} addToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />} />
            <Route path="/dealsofday" element={<DealsOfDay addToCart={addToCart} cartItems={cartItems} isLoggedIn={isLoggedIn}/>} />
             <Route path="/loanform"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/groceryitemspage" element={<GroceryItemsPage addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickproductpagebeauty/:id" element={<ClickBeautyProducts addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/clickbeverages/:id" element={<ClickBeverages addToCart={addToCart}  isLoggedIn={isLoggedIn} />} />
               <Route path="/clickfrozenfoods/:id" element={<ClickFrozenFoods addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickinstantnoodles/:id" element={<ClickInstantNoodles addToCart={addToCart}  isLoggedIn={isLoggedIn} />} />
               <Route path="/clickcangoods/:id" element={<ClickCanGoods addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickvitamins/:id" element={<ClickVitamins addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickrice/:id" element={<ClickRice addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickearphone/:id" element={<ClickEarphone addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickspeaker/:id" element={<ClickSpeaker addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                 <Route path="/clickwomens/:id" element={<ClickWomens addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                  <Route path="/clickmens/:id" element={<ClickMens addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                   <Route path="/clickmensshoes/:id" element={<ClickMensShoes addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                    <Route path="/clickwomensshoes/:id" element={<ClickWomensShoes addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickdeals/:id" element={ <ClickDeals addToCart={addToCart} isLoggedIn={isLoggedIn} />} />
                  <Route path="/clickdealsfashion/:id" element={<ClickDealsFashion  addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
                  <Route path="/clickdealselectronic/:id" element={<ClickDealsElectronic  addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
                   <Route path="/clickyoumaylike/:id" element={<ClickYouMayLike  addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
                 <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
                <Route path="/checkouthistory"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                 <Route path="/loanformhistory"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                 <Route path="/restrictedaccess" element={<RestrictedAccess/>} />
                  <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path="/grocerysidebar" element={<GrocerySidebar />} />
                    <Route path ="/adminloginpage" element={<LoginPage />}/>
                     <Route path ="/adminregisterpage" element={<RegisterPage />}/>
                      <Route path="/installmenthistorypage"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                      <Route path="/installmentterms" element={<InstallmentTerms />} />
                     <Route path="/epayment" element={<Epayment />} />
                     
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                            <Route path="/freebies" element={<Freebies addToCart={addToCart}/>} />
                             <Route path="/rafflemechanics" element={<RaffleMechanics/>}/>
                            <Route path="/barleygrassjuice" element={<BarleyGrassJuice />}/>


                 <Route component={NotFoundPage} />
                        
          </Routes>
        )}
         <div className="mt-4 " >    
          <Footer isLoggedIn={isLoggedIn}/> 
          </div>
      </Container>

      ):(

     <div>
        {/* Conditionally render Routes based on login status */}
        {isLoggedIn ? (
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn} />} />
            <Route path="/products" element={<Products addToCart={addToCart}  />} />
            <Route path="/pcproducts" element={<PcProducts addToCart={addToCart} />} />
            <Route path="/beautyproducts" element={<BeautyProducts addToCart={addToCart} />} />
             <Route path="/fashionapparel" element={<FashionApparel addToCart={addToCart} />} />
            <Route path="/consumerelectronics" element={<ConsumerElectronic  addToCart={addToCart}/>}/>
            <Route path="/homekitchen" element={<NotFoundPage/>}/>
            <Route path="/homeimprovement" element={<NotFoundPage/>}/>
            <Route path="/outdoorsports" element={<NotFoundPage/>}/>
            <Route path="/clickproductpage/:id" element={<ClickProductPage addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagepc/:id" element={<ClickProductPagePc addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpageavon/:id" element={<ClickProductPageAvon addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
            <Route path="/avonproducts" element={<AvonProducts addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement}  addToCart={addToCart} setCartItems={setCartItems}  setCartCount={setCartCount} cartCount={cartCount}   isLoggedIn={isLoggedIn}/>}/>
            <Route path="/search" element={<Search wellnessProductData={wellnessProductData} pcproductsData={pcproductsData} 
                                              avonproductsData={avonproductsData} beautyProductsData={beautyProductsData} dealsElectronicData={dealsElectronicData} addToCart={addToCart} />} />

            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} />} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />} />
            <Route path="/dealsofday" element={<DealsOfDay addToCart={addToCart} cartItems={cartItems}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/loanform" element={<LoanForm  addToCart={addToCart}/>} />
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount" element={<MyAccountPage addToCart={addToCart}/>} />
            <Route path="/groceryitemspage" element={<GroceryItemsPage addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickproductpagebeauty/:id" element={<ClickBeautyProducts addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/clickbeverages/:id" element={<ClickBeverages addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
               <Route path="/clickfrozenfoods/:id" element={<ClickFrozenFoods addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickinstantnoodles/:id" element={<ClickInstantNoodles addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
               <Route path="/clickcangoods/:id" element={<ClickCanGoods addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickvitamins/:id" element={<ClickVitamins addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickrice/:id" element={<ClickRice addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickearphone/:id" element={<ClickEarphone addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickspeaker/:id" element={<ClickSpeaker addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                 <Route path="/clickwomens/:id" element={<ClickWomens addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                  <Route path="/clickmens/:id" element={<ClickMens addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                   <Route path="/clickmensshoes/:id" element={<ClickMensShoes addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                    <Route path="/clickwomensshoes/:id" element={<ClickWomensShoes addToCart={addToCart} />} />
                <Route path="/clickdeals/:id" element={<ClickDeals addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                  <Route path="/clickdealsfashion/:id" element={<ClickDealsFashion  addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                  <Route path="/clickdealselectronic/:id" element={<ClickDealsElectronic  addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                   <Route path="/clickyoumaylike/:id" element={<ClickYouMayLike  addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                 <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
                <Route path="/checkouthistory" element={<CheckoutHistoryPage />} />
                 <Route path="/loanformhistory" element={<LoanFormHistoryPage />} />
                 <Route path="/restrictedaccess" element={<RestrictedAccess/>} />
                  <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path="/grocerysidebar" element={<GrocerySidebar />} />
                    <Route path ="/adminloginpage" element={<LoginPage />}/>
                     <Route path ="/adminregisterpage" element={<RegisterPage />}/>
                      <Route path="/installmenthistorypage" element={<InstallmentHistoryPage />} />
                      <Route path="/installmentterms" element={<InstallmentTerms />} />
                     <Route path="/epayment" element={<Epayment />} />
                      <Route path="/adminpage" element={<PrivateRoute element={<AdminPage />} />} />
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                            <Route path="/freebies" element={<Freebies addToCart={addToCart}/>} />
                            <Route path="/rafflemechanics" element={<RaffleMechanics/>}/>
                            <Route path="/barleygrassjuice" element={<BarleyGrassJuice />}/>


                 <Route component={NotFoundPage} />
                        
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
           <Route path="/signupform" element={<SignUpForm handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <Route path="/confirm" element={<ConfirmPage  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
             <Route path="/forgotpassword" element={<ForgotPassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/otpconfirmation" element={<OTPConfirmation  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/changepassword" element={<ChangePassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/lockoutpage" element={ <LockoutPage />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/products" element={<Products addToCart={addToCart}  />} />
            <Route path="/pcproducts" element={<PcProducts addToCart={addToCart} />} />
            <Route path="/beautyproducts" element={<BeautyProducts addToCart={addToCart} />} />
             <Route path="/fashionapparel" element={<FashionApparel addToCart={addToCart} />} />
            <Route path="/consumerelectronics" element={<ConsumerElectronic  addToCart={addToCart}/>}/>
            <Route path="/homekitchen" element={<NotFoundPage/>}/>
            <Route path="/homeimprovement" element={<NotFoundPage/>}/>
            <Route path="/outdoorsports" element={<NotFoundPage/>}/>
            <Route path="/clickproductpage/:id" element={<ClickProductPage addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagepc/:id" element={<ClickProductPagePc addToCart={addToCart} isLoggedIn={isLoggedIn} />} />
             <Route path="/clickproductpageavon/:id" element={<ClickProductPageAvon addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
            <Route path="/avonproducts" element={<AvonProducts addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement}  addToCart={addToCart} setCartItems={setCartItems}  setCartCount={setCartCount} cartCount={cartCount}   isLoggedIn={isLoggedIn}/>}/>
            <Route path="/search" element={<Search wellnessProductData={wellnessProductData} pcproductsData={pcproductsData} 
                                              avonproductsData={avonproductsData} beautyProductsData={beautyProductsData} dealsElectronicData={dealsElectronicData} addToCart={addToCart} />} />
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} />} />
            <Route path="/dealsofday" element={<DealsOfDay addToCart={addToCart} cartItems={cartItems} isLoggedIn={isLoggedIn}/>} />
             <Route path="/loanform"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/groceryitemspage" element={<GroceryItemsPage addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickproductpagebeauty/:id" element={<ClickBeautyProducts addToCart={addToCart} isLoggedIn={isLoggedIn} />} />
              <Route path="/contactus" element={<ContactUs />} />
              <Route path="/clickbeverages/:id" element={<ClickBeverages addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
               <Route path="/clickfrozenfoods/:id" element={<ClickFrozenFoods addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
          <Route path="/clickinstantnoodles/:id" element={<ClickInstantNoodles addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
               <Route path="/clickcangoods/:id" element={<ClickCanGoods addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
               <Route path="/clickvitamins/:id" element={<ClickVitamins addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
              <Route path="/clickrice/:id" element={<ClickRice addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickearphone/:id" element={<ClickEarphone addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickspeaker/:id" element={<ClickSpeaker addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                 <Route path="/clickwomens/:id" element={<ClickWomens addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                  <Route path="/clickmens/:id" element={<ClickMens addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                   <Route path="/clickmensshoes/:id" element={<ClickMensShoes addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                    <Route path="/clickwomensshoes/:id" element={<ClickWomensShoes addToCart={addToCart}  isLoggedIn={isLoggedIn}/>} />
                <Route path="/clickdeals/:id" element={ <ClickDeals addToCart={addToCart} isLoggedIn={isLoggedIn} />} />
                  <Route path="/clickdealsfashion/:id" element={<ClickDealsFashion  addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
                  <Route path="/clickdealselectronic/:id" element={<ClickDealsElectronic  addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
                   <Route path="/clickyoumaylike/:id" element={<ClickYouMayLike  addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
                 <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
                <Route path="/checkouthistory"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                 <Route path="/loanformhistory"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                 <Route path="/restrictedaccess" element={<RestrictedAccess/>} />
                  <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path="/grocerysidebar" element={<GrocerySidebar />} />
                    <Route path ="/adminloginpage" element={<LoginPage />}/>
                     <Route path ="/adminregisterpage" element={<RegisterPage />}/>
                      <Route path="/installmenthistorypage"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                      <Route path="/installmentterms" element={<InstallmentTerms />} />
                     <Route path="/epayment" element={<Epayment />} />
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                          
                            <Route path="/freebies" element={<Freebies addToCart={addToCart}/>} />
                           <Route path="/rafflemechanics" element={<RaffleMechanics/>}/>
                            <Route path="/barleygrassjuice" element={<BarleyGrassJuice />}/>


                 <Route component={NotFoundPage} />
                        
          </Routes>
        )}
         <div className="mt-4 " >    
     <Footer isLoggedIn={isLoggedIn}/> 
          </div>
        </div>
        )}
  
      </div>
         
  );
};

export default App;











