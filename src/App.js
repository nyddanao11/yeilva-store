import React, { useState, useEffect,Suspense} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import ErrorBoundary from './pages/ErrorBoundary';

import {wellnessProductData} from'./data/wellnessProductData';
import {pcproductsData} from './data/pcproductsData';
import {avonproductsData} from './data/AvonProductsData';
import {beautyProductsData} from './data/BeautyProductsData';
import {dealsElectronicData} from './data/DealsElectronicData';
import {rice}from'./components/Groceries/RiceData';
import {mensshoes} from'./components/Fashion/MensShoesData';
import {Frozen} from './components/Groceries/FrozenFoodsData';
import { useAuth} from './pages/loginContext';

const Home = React.lazy(() => import('./pages/Home'));
const CheckoutForm = React.lazy(() => import('./components/CheckoutForm'));
const LoanForm = React.lazy(() => import('./pages/LoanForm'));
const Products = React.lazy(() => import('./pages/Products'));
const PcProducts = React.lazy(() => import('./pages/PcProducts'));
const AvonProducts = React.lazy(() => import('./pages/AvonProducts'));
const ConsumerElectronic  = React.lazy(() => import('./pages/ConsumerElectronic'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const Search = React.lazy(() => import('./pages/Search'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const ShoppingCart = React.lazy(() => import('./components/ShoppingCart'));
const SignUpForm  = React.lazy(() => import('./components/SignupForm'));
const DealsOfDay  = React.lazy(() => import('./pages/DealsOfDay'));
const MyAccountPage  = React.lazy(() => import('./pages/MyAccount'));
const NewArrival  = React.lazy(() => import('./pages/NewArrival'));
const ClickProductPage  = React.lazy(() => import('./pages/ClickProductPage'));
const ClickProductPagePc  = React.lazy(() => import('./pages/ClickProductPagePc'));
const ClickProductPageAvon  = React.lazy(() => import('./pages/ClickProductPageAvon'));
const Brochure  = React.lazy(() => import('./components/BrochureServices'));
const CombinedNavbar  = React.lazy(() => import('./components/CombinedNavbar'));
const ClickBestSelling  = React.lazy(() => import('./pages/ClickBestSelling'));
const ClickFeaturedProduct  = React.lazy(() => import('./pages/ClickFeaturedProduct'));
const ClickRecommendedProduct  = React.lazy(() => import('./pages/ClickRecommendedProduct'));
const ContactUs  = React.lazy(() => import('./components/ContactUs'));
const BeautyProducts  = React.lazy(() => import('./pages/BeautyProducts'));
const ClickBeautyProducts  = React.lazy(() => import('./pages/ClickBeautyProducts'));
const FashionApparel  = React.lazy(() => import('./pages/FashionApparel'));
const TermsAndConditionsPage  = React.lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicyPage  = React.lazy(() => import('./pages/PrivacyPolicy'));
const ReturnPolicyPage  = React.lazy(() => import('./pages/ReturnPolicy'));
const ClickBeverages  = React.lazy(() => import('./components/Groceries/ClickBeverages'));
const ClickFrozenFoods  = React.lazy(() => import('./components/Groceries/ClickFrozenFoods'));
const ClickInstantNoodles  = React.lazy(() => import('./components/Groceries/ClickInstantNoodles'));
const ClickCanGoods  = React.lazy(() => import('./components/Groceries/ClickCanGoods'));
const ClickVitamins  = React.lazy(() => import('./components/Groceries/ClickVitamins'));
const ClickRice  = React.lazy(() => import('./components/Groceries/ClickRice'));
const ConfirmPage  = React.lazy(() => import('./pages/ConfirmPage'));
const ForgotPassword  = React.lazy(() => import('./pages/forgotPassword'));
const OTPConfirmation  = React.lazy(() => import('./pages/OtpConfirmation'));
const ChangePassword  = React.lazy(() => import('./pages/ChangePassword'));
const ClickEarphone  = React.lazy(() => import('./components/Electronics/ClickEarphone'));
const ClickSpeaker = React.lazy(() => import('./components/Electronics/ClickSpeaker'));
const ClickDeals = React.lazy(() => import('./pages/ClickDeals'));
const ClickDealsFashion = React.lazy(() => import('./pages/ClickDealsFashion'));
const ClickDealsElectronic = React.lazy(() => import('./pages/ClickDealsElectronic'));
const ClickWomens = React.lazy(() => import('./components/Fashion/ClickWomens'));
const ClickMens = React.lazy(() => import('./components/Fashion/ClickMens'));
const ClickMensShoes = React.lazy(() => import('./components/Fashion/ClickMensShoes'));
const ClickWomensShoes = React.lazy(() => import('./components/Fashion/ClickWomensShoes'));
const ClickYouMayLike = React.lazy(() => import('./pages/ClickYouMayLike'));
const YouMayLike = React.lazy(() => import('./components/YouMayLike'));
const YouMayLikeProduct = React.lazy(() => import('./components/YouMayLikeProduct'));
const GroceryItems = React.lazy(() => import('./pages/GroceryItems'));

const CheckoutHistoryPage = React.lazy(() => import('./components/CheckoutHistoryPage'));
const LoanFormHistoryPage = React.lazy(() => import('./components/LoanFormHistoryPage'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));
const LoginPage = React.lazy(() => import('./pages/AdminLoginPage'));
const AdminPage = React.lazy(() => import('./components/AdminPage'));
const RegisterPage = React.lazy(() => import('./pages/AdminRegisterPage'));
const RestrictedAccess = React.lazy(() => import('./components/RestrictedAccess'));
const GrocerySidebar = React.lazy(() => import('./pages/GrocerySideBar'));
const PrivateRoute = React.lazy(() => import('./pages/PrivateRoute'));
const LockoutPage = React.lazy(() => import('./pages/LockoutPage'));
const InstallmentHistoryPage = React.lazy(() => import('./components/InstallmentHistoryPage'));
const Epayment = React.lazy(() => import('./pages/Epayment'));
const GcashPaymentModal = React.lazy(() => import('./pages/GcashPayment'));
const DeleteAccount = React.lazy(() => import('./components/DeleteAccount'));
const ScrollToTop = React.lazy(() => import('./pages/ScrollToTop'));
const LoanTerms = React.lazy(() => import('./pages/LoanTerms'));
const NeedHelp = React.lazy(() => import('./pages/NeedHelp'));
const OfflineIndicator = React.lazy(() => import('./pages/OfflineIndicator'));
const ReviewComponent = React.lazy(() => import('./components/ReviewComponent'));
const Footer = React.lazy(() => import('./components/Footer'));
const InstallmentTerms = React.lazy(() => import('./pages/installmentTerms'));
const Freebies = React.lazy(() => import('./components/Freebies'));
const RaffleMechanics = React.lazy(() => import('./components/RaffleMechanics'));
const BarleyGrassJuice = React.lazy(() => import('./components/SqueezePage/SqueezePageBarley'));
const NewsletterForm = React.lazy(() => import('./components/Newsletter'));
const  AirLineBookingForm  = React.lazy(() => import('./components/AirLineBookingForm'));
const  GcashToRecieved  = React.lazy(() => import('./pages/GcashToRecieved'));


 function App() {

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
   const { isLoggedIn, login, logout } = useAuth();
  const [cartCount, setCartCount] = useState(0);
    const [formattedGrandTotal, setFormattedGrandTotal] = useState('₱0.00');

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
    // If the item already exists, update the quantity
    setCartItems((prevCartItems) => {
      const updatedItems = prevCartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      // Schedule the localStorage update after state has been updated
      setTimeout(() => {
        localStorage.setItem('cartItems', JSON.stringify(updatedItems));
      }, 0);

      // Show success alert
      alert(`Added another ${product.name} to the cart!`);
      
      return updatedItems;
    });
  } else {
    // If the item is new, add it to the cart
    setCartItems((prevCartItems) => {
      const newCartItems = [...prevCartItems, { ...product, quantity: 1 }];
      localStorage.setItem('cartItems', JSON.stringify(newCartItems));

      // Show success alert
      alert(`Added ${product.name} to the cart!`);

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

  // Combine products into a single array
  const allProducts = [...wellnessProductData, ...pcproductsData, ...avonproductsData, ...beautyProductsData, ...dealsElectronicData,...rice, ...mensshoes, ...Frozen];


 return (
  <ErrorBoundary>
    
    <div>
     <Suspense fallback={<div>Loading...</div>}>
      <OfflineIndicator />
    <ScrollToTop />
      {/* Render the CombinedNavbar outside of the Routes */}
      <CombinedNavbar cartItems={cartItems} cartCount={cartCount} isLoggedIn={isLoggedIn} handleLogout={handleLogout} 
      allProducts={allProducts}  addToCart={addToCart}/>
      
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
                                              avonproductsData={avonproductsData} beautyProductsData={beautyProductsData} dealsElectronicData={dealsElectronicData} addToCart={addToCart} rice={rice} mensshoes={mensshoes} Frozen={Frozen}/>} />

            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} setFormattedGrandTotal={setFormattedGrandTotal}/>} />
            <Route path="/checkoutform" element={<CheckoutForm cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} isLoggedIn={isLoggedIn}  formattedGrandTotal={formattedGrandTotal} />} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} isLoggedIn={isLoggedIn}/>} />
           <Route path="/dealsofday" element={<DealsOfDay addToCart={addToCart} cartItems={cartItems}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/loanform" element={<LoanForm  addToCart={addToCart}/>} />
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount" element={<MyAccountPage addToCart={addToCart}/>} />
            <Route path="/groceryitems" element={<GroceryItems addToCart={addToCart} cartItems={cartItems} />} />
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
                      <Route path="/gcashpayment" element={<GcashPaymentModal addToCart={addToCart}  isLoggedIn={isLoggedIn} formattedGrandTotal={formattedGrandTotal}/>} />
                      <Route path="/adminpage" element={<PrivateRoute element={<AdminPage />} />} />
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                            <Route path="/freebies" element={<Freebies  addToCart={addToCart}/>} />
                            <Route path="/rafflemechanics" element={<RaffleMechanics/>}/>
                            <Route path="/barleygrassjuice" element={<BarleyGrassJuice />}/>
                           <Route path="/newsletterform" element={<NewsletterForm />} />
                           <Route path="/airlinebookingform" element={<AirLineBookingForm />} />
                        <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
                    <Route path="/gcashtorecieved" element={<GcashToRecieved handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />

                           
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
                                              avonproductsData={avonproductsData} beautyProductsData={beautyProductsData} dealsElectronicData={dealsElectronicData} addToCart={addToCart} rice={rice} mensshoes={mensshoes} Frozen={Frozen}/>} />
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} isLoggedIn={isLoggedIn}/>} />
            <Route path="/dealsofday" element={<DealsOfDay addToCart={addToCart} cartItems={cartItems} isLoggedIn={isLoggedIn}/>} />
             <Route path="/loanform"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/groceryitems" element={<GroceryItems addToCart={addToCart} cartItems={cartItems} />} />
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
                           <Route path="/newsletterform" element={<NewsletterForm />} />
                    <Route path="/gcashtorecieved" element={<GcashToRecieved handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />


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
                                              avonproductsData={avonproductsData} beautyProductsData={beautyProductsData} dealsElectronicData={dealsElectronicData} addToCart={addToCart} rice={rice} mensshoes={mensshoes} Frozen={Frozen}/>} />

            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} setFormattedGrandTotal={setFormattedGrandTotal}/>} />
            <Route path="/checkoutform" element={<CheckoutForm cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} isLoggedIn={isLoggedIn}  formattedGrandTotal={formattedGrandTotal} />} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} isLoggedIn={isLoggedIn}/>} />
            <Route path="/dealsofday" element={<DealsOfDay addToCart={addToCart} cartItems={cartItems}  isLoggedIn={isLoggedIn}/>} />
             <Route path="/loanform" element={<LoanForm  addToCart={addToCart}/>} />
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount" element={<MyAccountPage addToCart={addToCart}/>} />
            <Route path="/groceryitems" element={<GroceryItems addToCart={addToCart} cartItems={cartItems} />} />
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
                     <Route path="/gcashpayment" element={<GcashPaymentModal addToCart={addToCart}  isLoggedIn={isLoggedIn} formattedGrandTotal={formattedGrandTotal}/>} />
                      <Route path="/adminpage" element={<PrivateRoute element={<AdminPage />} />} />
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                            <Route path="/freebies" element={<Freebies addToCart={addToCart}/>} />
                            <Route path="/rafflemechanics" element={<RaffleMechanics/>}/>
                            <Route path="/barleygrassjuice" element={<BarleyGrassJuice />}/>
                           <Route path="/newsletterform" element={<NewsletterForm />} />
                             <Route path="/airlinebookingform" element={<AirLineBookingForm />} />
                          <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
                    <Route path="/gcashtorecieved" element={<GcashToRecieved handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />



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
                                              avonproductsData={avonproductsData} beautyProductsData={beautyProductsData} dealsElectronicData={dealsElectronicData} addToCart={addToCart} rice={rice} mensshoes={mensshoes} Frozen={Frozen}/>} />
            <Route path="/checkout" element={<CheckoutPage cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} isLoggedIn={isLoggedIn}/>} />
            <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} handleIncrement={handleIncrement} handleDecrement={handleDecrement} isLoggedIn={isLoggedIn}/>} />
            <Route path="/dealsofday" element={<DealsOfDay addToCart={addToCart} cartItems={cartItems} isLoggedIn={isLoggedIn}/>} />
             <Route path="/loanform"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/groceryitems" element={<GroceryItems addToCart={addToCart} cartItems={cartItems} />} />
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
                           <Route path="/newsletterform" element={<NewsletterForm />} />
                    <Route path="/gcashtorecieved" element={<GcashToRecieved handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />


                 <Route component={NotFoundPage} />
                        
          </Routes>
        )}
         
         <div className="mt-4 " >    
     <Footer isLoggedIn={isLoggedIn}/> 
          </div>
        </div>
        )}
       </Suspense>
      </div>
     
  </ErrorBoundary>       
  );
};


export default App;









