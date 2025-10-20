import React, { useState, useEffect,Suspense, useContext} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import ErrorBoundary from './pages/ErrorBoundary';
import {Spinner} from 'react-bootstrap';

import { useAuth} from './pages/loginContext';
import { ProductContext} from './pages/ProductContext'; // Import context
import { useCart } from './pages/CartContext'; // Correct path to your context
import useFeaturedProducts from './hooks/useFeaturedProducts';
import useBestSellingProducts from './hooks/useBestSellingProducts'
import useRecommendedProducts from './hooks/useRecommendedProducts';
import useSearchProducts from './hooks/useSearchProducts';
import useAllDealsProduct from './hooks/useAllDealsProduct';
import useYouMayLikeProducts from './hooks/useYouMayLikeProducts';

const Home = React.lazy(() => import('./pages/Home'));
const CheckoutForm = React.lazy(() => import('./components/CheckoutForm'));
const LoanForm = React.lazy(() => import('./pages/LoanForm'));
const FeaturedProduct = React.lazy(() => import('./pages/FeaturedProducts'));
const BestSellingProduct = React.lazy(() => import('./pages/BestSellingProducts'));
const RecommendedProduct = React.lazy(() => import('./pages/RecommendedProducts'));
const Cart = React.lazy(() => import('./pages/Cart'));
const Login = React.lazy(() => import('./pages/Login'));
const CheckoutPage = React.lazy(() => import('./pages/CheckoutPage'));
const CheckoutPageBuyAgain = React.lazy(() => import('./pages/BuyAgain'));
const ShoppingCart = React.lazy(() => import('./components/ShoppingCart'));
const SignUpForm  = React.lazy(() => import('./components/SignupForm'));
const AllDealsProduct  = React.lazy(() => import('./pages/AllDealsProduct'));
const MyAccountPage  = React.lazy(() => import('./pages/MyAccount'));
const NewArrival  = React.lazy(() => import('./pages/NewArrival'));
const ClickProductPage  = React.lazy(() => import('./pages/ClickProductPage'));
const Brochure  = React.lazy(() => import('./components/BrochureServices'));
const CombinedNavbar  = React.lazy(() => import('./components/CombinedNavbar'));
const ClickBestSelling  = React.lazy(() => import('./pages/ClickBestSelling'));
const ClickFeaturedProduct  = React.lazy(() => import('./pages/ClickFeaturedProduct'));
const ClickRecommendedProduct  = React.lazy(() => import('./pages/ClickRecommendedProduct'));
const ContactUs  = React.lazy(() => import('./components/ContactUs'));
const TermsAndConditionsPage  = React.lazy(() => import('./pages/TermsAndConditions'));
const PrivacyPolicyPage  = React.lazy(() => import('./pages/PrivacyPolicy'));
const ReturnPolicyPage  = React.lazy(() => import('./pages/ReturnPolicy'));
const ConfirmPage  = React.lazy(() => import('./pages/ConfirmPage'));
const ForgotPassword  = React.lazy(() => import('./pages/forgotPassword'));
const OTPConfirmation  = React.lazy(() => import('./pages/OtpConfirmation'));
const ChangePassword  = React.lazy(() => import('./pages/ChangePassword'));

const ClickDeals = React.lazy(() => import('./pages/ClickDeals'));
const ClickYouMayLike = React.lazy(() => import('./pages/ClickYouMayLike'));
const YouMayAlsoLikeProduct = React.lazy(() => import('./components/YouMayAlsoLikePage'));
const CheckoutHistoryPage = React.lazy(() => import('./components/CheckoutHistoryPage'));
const LoanFormHistoryPage = React.lazy(() => import('./components/LoanFormHistoryPage'));
const NotFoundPage = React.lazy(() => import('./components/NotFoundPage'));
const LoginPage = React.lazy(() => import('./pages/AdminLoginPage'));
const AdminPage = React.lazy(() => import('./components/AdminPage'));
const RegisterPage = React.lazy(() => import('./pages/AdminRegisterPage'));
const RestrictedAccess = React.lazy(() => import('./components/RestrictedAccess'));
const PrivateRoute = React.lazy(() => import('./pages/PrivateRoute'));
const LockoutPage = React.lazy(() => import('./pages/LockoutPage'));
const InstallmentHistoryPage = React.lazy(() => import('./components/InstallmentHistoryPage'));
const Epayment = React.lazy(() => import('./pages/Epayment'));
const GcashPaymentModal = React.lazy(() => import('./pages/GcashPayment'));
const CheckoutButton = React.lazy(() => import('./pages/PayMongoPayment'));
const SuccessPage = React.lazy(() => import('./pages/SuccessPage'));
const CancelPage = React.lazy(() => import('./pages/CancelPage'));
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
const  Orders = React.lazy(() => import('./pages/YourOrders'));
const  OrderTracking = React.lazy(() => import('./pages/OrderTracking'));
const  ProductsData = React.lazy(() => import('./pages/ProductPageUpdated'));
const  AddToCartNotification = React.lazy(() => import('./pages/AddToCartNotification'));
const  ClickCartItem = React.lazy(() => import('./pages/ClickCartItem'));
const  AddDeliveryAddress = React.lazy(() => import('./pages/AddDeliveryAddress'));



 function App() {

  const isLargeScreen = useMediaQuery({ query: '(min-width: 1200px)' });
  const [currentPage, setCurrentPage] = useState(1);
    const [showCheckoutModal, setShowCheckoutModal] = useState(false); //


 const { isLoggedIn, login, logout, userEmail } = useAuth();
const { handleItemClickCategory, storedProducts, fetchProducts, clickedCategories} = useContext(ProductContext); // Use context
const { featuredProducts, loading, error } = useFeaturedProducts(); 
const { bestSellingProducts, bestLoading, bestError } = useBestSellingProducts(); 
const { recommendedProducts, recommendedLoading, recommendedError } = useRecommendedProducts();
const { searchProducts, searchLoading, searchError, fetchSearchProducts} = useSearchProducts();
const { allDealsProduct, allDealsLoading, allDealsError } = useAllDealsProduct();
const { youMayLikeProducts, mayLikeLoading, mayLikeError } = useYouMayLikeProducts();
 const {
    cartItems,
    cartCount,
    addToCart,
    removeFromCart,
    handleIncrement,
    handleDecrement,
    setCheckoutItemsForPayment, // This is key for passing selected items to checkout
    setCartItems,
    setCartCount, // IMPORTANT: If you need to modify the cartItems array directly
    notificationProduct,
    handleCloseNotification, // Expose function to close notification
    checkoutItemsForPayment,
    formattedGrandTotal,             // (e.g., to add `isSelected`), you MUST expose this from context.
                  // As discussed, prefer specific actions if possible, but for `isSelected`,
                  // this might be a necessary, carefully managed exposure.
     confirmRemoveItem,
        showConfirmModal,
        itemToRemove,
  } = useCart();


// console.log('MayLikeProducts:', youMayLikeProducts);

useEffect(() => {
  if (clickedCategories.length === 0) {
    // No category selected, handle accordingly (e.g., fetch all products)
    fetchProducts();
  } else {
    const categoryQuery = clickedCategories[0]; // Get the first (and only) category
    fetchProducts(categoryQuery); // Pass the single category to fetchProducts
  }
}, [clickedCategories]);
 
   const navigate = useNavigate();
   

const handleLogout = () => {
  logout(); // Set the login status to false
    navigate('/');
  // You can also perform additional cleanup tasks here, such as clearing user data from local storage
};

 // Function to handle login
  const handleLogin = (userEmail) => {
    console.log('User logged in successfully');    
    login(userEmail); // Set the login status to true
    // Redirect to the home page after login
    navigate('/');
  };

   // console.log('notificationProduct', notificationProduct);

 return (
  <ErrorBoundary>
    
    <div>
     <Suspense fallback={ <div style={{ display: "flex", flexDirection:'column', justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <h5 style={{marginBottom:'15px', color:'#5D5D5D'}}>yeilvastore</h5>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>}>
        <div>
        {notificationProduct && (
        <Suspense fallback={<div>Loading notification...</div>}>
          <AddToCartNotification
           product={notificationProduct}
            onClose={handleCloseNotification}
          />
        </Suspense>

      )}
     </div>
      <OfflineIndicator />
    <ScrollToTop />
      {/* Render the CombinedNavbar outside of the Routes */}
      <CombinedNavbar cartItems={cartItems} cartCount={cartCount} isLoggedIn={isLoggedIn} userEmail={userEmail} handleLogout={handleLogout}  
      searchProducts={searchProducts} addToCart={addToCart} storedProducts={storedProducts} handleItemClickCategory={handleItemClickCategory} />
      
   {isLargeScreen?(
      <Container>
        {/* Conditionally render Routes based on login status */}
        {isLoggedIn ? (
            
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn} handleItemClickCategory={handleItemClickCategory} featuredProducts={featuredProducts}  loading={loading} error={error} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError}/>} />
          <Route path="/productsdata" element={<ProductsData addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} storedProducts={storedProducts} youMayLikeProducts={youMayLikeProducts }/>} />
            <Route path="/featuredproduct" element={<FeaturedProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} featuredProducts={featuredProducts}  loading={loading} error={error}/>} />
            <Route path="/bestsellingproduct" element={<BestSellingProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError}/>} />
             <Route path="/youmayalsolikeproduct" element={<YouMayAlsoLikeProduct addToCart={addToCart} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
            <Route path="/recommendedproduct" element={<RecommendedProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError}/>} />
            <Route path="/homekitchen" element={<NotFoundPage/>}/>
            <Route path="/homeimprovement" element={<NotFoundPage/>}/>
            <Route path="/outdoorsports" element={<NotFoundPage/>}/>
            <Route path="/clickproductpage/:id" element={<ClickProductPage isLoggedIn={isLoggedIn} storedProducts={storedProducts} searchProducts={searchProducts} youMayLikeProducts={youMayLikeProducts }/>} />
            <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn}  youMayLikeProducts={youMayLikeProducts}/>}/>                                    
            <Route path="/checkout" element={<CheckoutPage youMayLikeProducts = {youMayLikeProducts} showCheckoutModal={showCheckoutModal} setShowCheckoutModal={setShowCheckoutModal}/>} />
            <Route path="/checkoutbuyagain" element={<CheckoutPageBuyAgain youMayLikeProducts = {youMayLikeProducts}/>} />
 
            <Route path="/checkoutform" element={<CheckoutForm  cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} isLoggedIn={isLoggedIn}  formattedGrandTotal={formattedGrandTotal} showCheckoutModal={showCheckoutModal} setShowCheckoutModal={setShowCheckoutModal}/>} />
            <Route path="/shoppingcart" element={<ShoppingCart isLoggedIn={isLoggedIn} youMayLikeProducts = {youMayLikeProducts}/>} />
           <Route path="/alldealsproduct" element={<AllDealsProduct addToCart={addToCart} cartItems={cartItems}  isLoggedIn={isLoggedIn} currentPage={currentPage} setCurrentPage={setCurrentPage} allDealsProduct={allDealsProduct} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
             <Route path="/loanform" element={<LoanForm  addToCart={addToCart} youMayLikeProducts={youMayLikeProducts}/>} />
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount" element={<MyAccountPage addToCart={addToCart} youMayLikeProducts={youMayLikeProducts }/>} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling isLoggedIn={isLoggedIn} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError} youMayLikeProducts={youMayLikeProducts }/>} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct isLoggedIn={isLoggedIn} featuredProducts={featuredProducts}  loading={loading} error={error} youMayLikeProducts={youMayLikeProducts }/>} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct isLoggedIn={isLoggedIn} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError} youMayLikeProducts={youMayLikeProducts }/>} />
              <Route path="/contactus" element={<ContactUs />} />
           
                <Route path="/clickdeals/:id" element={ <ClickDeals isLoggedIn={isLoggedIn} allDealsProduct={allDealsProduct} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
                   <Route path="/clickyoumaylike/:id" element={<ClickYouMayLike  isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
                    <Route path="/clickcartitem/:id" element={<ClickCartItem isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError} cartItems={cartItems}/>} />

                 <Route path="/returnpolicy" element={<ReturnPolicyPage  />} />
                <Route path="/checkouthistory" element={<CheckoutHistoryPage addToCart={addToCart}  isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts }/>} />
                 <Route path="/loanformhistory" element={<LoanFormHistoryPage />} />
                 <Route path="/restrictedaccess" element={<RestrictedAccess/>} />
                  <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path ="/adminloginpage" element={<LoginPage />}/>
                     <Route path ="/adminregisterpage" element={<RegisterPage />}/>
                      <Route path="/installmenthistorypage" element={<InstallmentHistoryPage />} />
                      <Route path="/installmentterms" element={<InstallmentTerms />} />
                     <Route path="/epayment" element={<Epayment />} />
                      <Route path="/gcashpayment" element={<GcashPaymentModal addToCart={addToCart}  isLoggedIn={isLoggedIn} formattedGrandTotal={formattedGrandTotal} />} />
                      <Route path="/paymongopayment" element={<CheckoutButton addToCart={addToCart}  isLoggedIn={isLoggedIn} formattedGrandTotal={formattedGrandTotal} cartItems={cartItems}/>} /> 
                        <Route path="/successpage" element={<SuccessPage addToCart={addToCart}  isLoggedIn={isLoggedIn} />} /> 
                      <Route path="/cancelpage" element={<CancelPage addToCart={addToCart}  isLoggedIn={isLoggedIn} />} /> 
                      <Route path="/adminpage" element={<PrivateRoute element={<AdminPage />} />} />
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                            <Route path="/freebies" element={<Freebies  addToCart={addToCart} youMayLikeProducts={youMayLikeProducts }/>} />
                            <Route path="/rafflemechanics" element={<RaffleMechanics/>}/>
                            <Route path="/barleygrassjuice" element={<BarleyGrassJuice />}/>
                           <Route path="/newsletterform" element={<NewsletterForm />} />
                           <Route path="/airlinebookingform" element={<AirLineBookingForm />} />
                        <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
                    <Route path="/gcashtorecieved" element={<GcashToRecieved handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
                   <Route path="/orders" element={<Orders handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} cartItems={cartItems}/>} />
                  <Route path="/ordertracking" element={<OrderTracking handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} youMayLikeProducts={youMayLikeProducts }/>} />
                  <Route path="/adddeliveryaddress" element={<AddDeliveryAddress handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} youMayLikeProducts={youMayLikeProducts }/>} />

                           
                 <Route component={NotFoundPage} />
                       
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn} handleItemClickCategory={handleItemClickCategory} featuredProducts={featuredProducts}  loading={loading} error={error} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError}/>} />
           <Route path="/signupform" element={<SignUpForm handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <Route path="/confirm" element={<ConfirmPage  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
             <Route path="/forgotpassword" element={<ForgotPassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/otpconfirmation" element={<OTPConfirmation  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/changepassword" element={<ChangePassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/lockoutpage" element={ <LockoutPage />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
             <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
          <Route path="/productsdata" element={<ProductsData addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} storedProducts={storedProducts} youMayLikeProducts={youMayLikeProducts}/>} />
            <Route path="/featuredproduct" element={<FeaturedProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} featuredProducts={featuredProducts}  loading={loading} error={error}/>} />
            <Route path="/bestsellingproduct" element={<BestSellingProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError}/>} />
            <Route path="/recommendedproduct" element={<RecommendedProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError}/>} />           
             <Route path="/youmayalsolikeproduct" element={<YouMayAlsoLikeProduct addToCart={addToCart} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
            <Route path="/homekitchen" element={<NotFoundPage/>}/>
            <Route path="/homeimprovement" element={<NotFoundPage/>}/>
            <Route path="/outdoorsports" element={<NotFoundPage/>}/>
            <Route path="/clickproductpage/:id" element={<ClickProductPage isLoggedIn={isLoggedIn}  storedProducts={storedProducts} searchProducts={searchProducts} youMayLikeProducts={youMayLikeProducts } />} />
            <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn}  youMayLikeProducts={youMayLikeProducts}/>}/>                                    
            <Route path="/shoppingcart" element={<ShoppingCart isLoggedIn={isLoggedIn} youMayLikeProducts = {youMayLikeProducts}/>} />
          <Route path="/alldealsproduct" element={<AllDealsProduct addToCart={addToCart} cartItems={cartItems}  isLoggedIn={isLoggedIn} currentPage={currentPage} setCurrentPage={setCurrentPage} allDealsProduct={allDealsProduct} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
             <Route path="/loanform"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} youMayLikeProducts={youMayLikeProducts}/>}/>
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} youMayLikeProducts={youMayLikeProducts } />}/>
            <Route path="/brochure" element={<Brochure />} />
           <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling isLoggedIn={isLoggedIn} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError} youMayLikeProducts={youMayLikeProducts }/>} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct isLoggedIn={isLoggedIn} featuredProducts={featuredProducts}  loading={loading} error={error} youMayLikeProducts={youMayLikeProducts }/>} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct  isLoggedIn={isLoggedIn} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError} youMayLikeProducts={youMayLikeProducts }/>} />
              <Route path="/contactus" element={<ContactUs />} />    
                <Route path="/clickdeals/:id" element={ <ClickDeals isLoggedIn={isLoggedIn} allDealsProduct={allDealsProduct} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
                   <Route path="/clickyoumaylike/:id" element={<ClickYouMayLike  isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
                      <Route path="/clickcartitem/:id" element={<ClickCartItem isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError} cartItems={cartItems}/>} />

                 <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
                <Route path="/checkouthistory"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                 <Route path="/loanformhistory"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                 <Route path="/restrictedaccess" element={<RestrictedAccess/>} />
                  <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path ="/adminloginpage" element={<LoginPage />}/>
                     <Route path ="/adminregisterpage" element={<RegisterPage />}/>
                      <Route path="/installmenthistorypage"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                      <Route path="/installmentterms" element={<InstallmentTerms />} />
                     <Route path="/epayment" element={<Epayment />} />
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                            <Route path="/freebies" element={<Freebies addToCart={addToCart} youMayLikeProducts={youMayLikeProducts }/>} />
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
            <Route path="/" element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn} handleItemClickCategory={handleItemClickCategory} featuredProducts={featuredProducts}  loading={loading} error={error} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError}/>} />
          <Route path="/productsdata" element={<ProductsData addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} storedProducts={storedProducts} youMayLikeProducts={youMayLikeProducts}/>} />
            <Route path="/featuredproduct" element={<FeaturedProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} featuredProducts={featuredProducts}  loading={loading} error={error}/>} />
            <Route path="/bestsellingproduct" element={<BestSellingProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError}/>} />            
            <Route path="/recommendedproduct" element={<RecommendedProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError}/>} />           
             <Route path="/youmayalsolikeproduct" element={<YouMayAlsoLikeProduct addToCart={addToCart} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
            <Route path="/homekitchen" element={<NotFoundPage/>}/>
            <Route path="/homeimprovement" element={<NotFoundPage/>}/>
            <Route path="/outdoorsports" element={<NotFoundPage/>}/>
            <Route path="/clickproductpage/:id" element={<ClickProductPage isLoggedIn={isLoggedIn} storedProducts={storedProducts} searchProducts={searchProducts} youMayLikeProducts={youMayLikeProducts } />} />
            <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn}  youMayLikeProducts={youMayLikeProducts}/>}/>                                    

            <Route path="/checkout" element={<CheckoutPage youMayLikeProducts = {youMayLikeProducts} showCheckoutModal={showCheckoutModal} setShowCheckoutModal={setShowCheckoutModal}/>} />
            <Route path="/checkoutbuyagain" element={<CheckoutPageBuyAgain  youMayLikeProducts = {youMayLikeProducts}/>} />

            <Route path="/checkoutform" element={<CheckoutForm  cartItems={cartItems} removeFromCart={removeFromCart} addToCart={addToCart} isLoggedIn={isLoggedIn}  formattedGrandTotal={formattedGrandTotal} showCheckoutModal={showCheckoutModal} setShowCheckoutModal={setShowCheckoutModal}/>} />
               <Route path="/shoppingcart" element={<ShoppingCart isLoggedIn={isLoggedIn} youMayLikeProducts = {youMayLikeProducts}/>} />
            <Route path="/alldealsproduct" element={<AllDealsProduct addToCart={addToCart} cartItems={cartItems}  isLoggedIn={isLoggedIn} currentPage={currentPage} setCurrentPage={setCurrentPage} allDealsProduct={allDealsProduct} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
             <Route path="/loanform" element={<LoanForm  addToCart={addToCart} youMayLikeProducts={youMayLikeProducts}/>} />
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} />
            <Route path="/myaccount" element={<MyAccountPage addToCart={addToCart} youMayLikeProducts={youMayLikeProducts }/>} />
            <Route path="/brochure" element={<Brochure />} />
               <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling isLoggedIn={isLoggedIn} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError} youMayLikeProducts={youMayLikeProducts }/>} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct isLoggedIn={isLoggedIn} featuredProducts={featuredProducts}  loading={loading} error={error} youMayLikeProducts={youMayLikeProducts }/>} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct isLoggedIn={isLoggedIn} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError} youMayLikeProducts={youMayLikeProducts }/>} />
                <Route path="/contactus" element={<ContactUs />} />
             
                <Route path="/clickdeals/:id" element={ <ClickDeals isLoggedIn={isLoggedIn} allDealsProduct={allDealsProduct} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
                   <Route path="/clickyoumaylike/:id" element={<ClickYouMayLike  isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
                     <Route path="/clickcartitem/:id" element={<ClickCartItem  isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError} cartItems={cartItems}/>} />

                 <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
                <Route path="/checkouthistory" element={<CheckoutHistoryPage addToCart={addToCart}  isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts }/>} />
                 <Route path="/loanformhistory" element={<LoanFormHistoryPage />} />
                 <Route path="/restrictedaccess" element={<RestrictedAccess/>} />
                  <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path ="/adminloginpage" element={<LoginPage />}/>
                     <Route path ="/adminregisterpage" element={<RegisterPage />}/>
                      <Route path="/installmenthistorypage" element={<InstallmentHistoryPage />} />
                      <Route path="/installmentterms" element={<InstallmentTerms />} />
                     <Route path="/epayment" element={<Epayment />} />
                      <Route path="/gcashpayment" element={<GcashPaymentModal addToCart={addToCart}  isLoggedIn={isLoggedIn} formattedGrandTotal={formattedGrandTotal} />} />
                      <Route path="/paymongopayment" element={<CheckoutButton addToCart={addToCart}  isLoggedIn={isLoggedIn} formattedGrandTotal={formattedGrandTotal} cartItems={cartItems}/>} />  
                        <Route path="/successpage" element={<SuccessPage addToCart={addToCart}  isLoggedIn={isLoggedIn} />} /> 
                      <Route path="/cancelpage" element={<CancelPage addToCart={addToCart}  isLoggedIn={isLoggedIn} />} />  
                      <Route path="/adminpage" element={<PrivateRoute element={<AdminPage />} />} />
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                            <Route path="/freebies" element={<Freebies addToCart={addToCart} youMayLikeProducts={youMayLikeProducts }/>} />
                            <Route path="/rafflemechanics" element={<RaffleMechanics/>}/>
                            <Route path="/barleygrassjuice" element={<BarleyGrassJuice />}/>
                           <Route path="/newsletterform" element={<NewsletterForm />} />
                             <Route path="/airlinebookingform" element={<AirLineBookingForm />} />
                          <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
                    <Route path="/gcashtorecieved" element={<GcashToRecieved handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
                   <Route path="/orders" element={<Orders handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} cartItems={cartItems}/>} />
                  <Route path="/ordertracking" element={<OrderTracking handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} youMayLikeProducts={youMayLikeProducts }/>} />
                  <Route path="/adddeliveryaddress" element={<AddDeliveryAddress handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} youMayLikeProducts={youMayLikeProducts }/>} />

                 <Route component={NotFoundPage} />
                        
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} isLoggedIn={isLoggedIn} handleItemClickCategory={handleItemClickCategory} featuredProducts={featuredProducts}  loading={loading} error={error} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError}/>} />
           <Route path="/signupform" element={<SignUpForm handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <Route path="/confirm" element={<ConfirmPage  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
             <Route path="/forgotpassword" element={<ForgotPassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/otpconfirmation" element={<OTPConfirmation  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/changepassword" element={<ChangePassword  handleLogin={handleLogin}/>} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
            <Route path="/lockoutpage" element={ <LockoutPage />} />
            <Route path="/login" element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
            <Route path="/termsandconditions" element={<TermsAndConditionsPage handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>} />
           <Route path="/productsdata" element={<ProductsData addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} storedProducts={storedProducts} youMayLikeProducts={youMayLikeProducts}/>} />
            <Route path="/featuredproduct" element={<FeaturedProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} featuredProducts={featuredProducts}  loading={loading} error={error}/>} />
             <Route path="/bestsellingproduct" element={<BestSellingProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError}/>} />           
            <Route path="/recommendedproduct" element={<RecommendedProduct addToCart={addToCart}  currentPage={currentPage} setCurrentPage={setCurrentPage} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError}/>} />           
             <Route path="/youmayalsolikeproduct" element={<YouMayAlsoLikeProduct addToCart={addToCart} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
            <Route path="/homekitchen" element={<NotFoundPage/>}/>
            <Route path="/homeimprovement" element={<NotFoundPage/>}/>
            <Route path="/outdoorsports" element={<NotFoundPage/>}/>
            <Route path="/clickproductpage/:id" element={<ClickProductPage  isLoggedIn={isLoggedIn} storedProducts={storedProducts} searchProducts={searchProducts} youMayLikeProducts={youMayLikeProducts }/>} />
            <Route path="/cart" element={<Cart isLoggedIn={isLoggedIn}  youMayLikeProducts={youMayLikeProducts}/>}/>                                    

            <Route path="/shoppingcart" element={<ShoppingCart isLoggedIn={isLoggedIn} youMayLikeProducts = {youMayLikeProducts}/>} />
           <Route path="/alldealsproduct" element={<AllDealsProduct addToCart={addToCart} cartItems={cartItems}  isLoggedIn={isLoggedIn} currentPage={currentPage} setCurrentPage={setCurrentPage} allDealsProduct={allDealsProduct} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
             <Route path="/loanform"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} youMayLikeProducts={youMayLikeProducts}/>}/>
            <Route path="/newarrival" element={<NewArrival addToCart={addToCart} cartItems={cartItems} />} /> 
            <Route path="/myaccount"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} youMayLikeProducts={youMayLikeProducts } />}/>
            <Route path="/brochure" element={<Brochure />} />
          <Route path="/clickproductpagebestselling/:id" element={<ClickBestSelling isLoggedIn={isLoggedIn} bestSellingProducts={bestSellingProducts}  bestLoading={bestLoading} bestError={bestError} youMayLikeProducts={youMayLikeProducts }/>} />
             <Route path="/clickproductpagefeaturedproduct/:id" element={<ClickFeaturedProduct  isLoggedIn={isLoggedIn} featuredProducts={featuredProducts}  loading={loading} error={error} youMayLikeProducts={youMayLikeProducts }/>} />
             <Route path="/clickproductpagerecommended/:id" element={<ClickRecommendedProduct  isLoggedIn={isLoggedIn} recommendedProducts={recommendedProducts} recommendedLoading={recommendedLoading} recommendedError={recommendedError} youMayLikeProducts={youMayLikeProducts }/>} />
              <Route path="/contactus" element={<ContactUs />} />
             
                <Route path="/clickdeals/:id" element={ <ClickDeals isLoggedIn={isLoggedIn} allDealsProduct={allDealsProduct} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
                   <Route path="/clickyoumaylike/:id" element={<ClickYouMayLike isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError}/>} />
                     <Route path="/clickcartitem/:id" element={<ClickCartItem isLoggedIn={isLoggedIn} youMayLikeProducts={youMayLikeProducts } mayLikeLoading={mayLikeLoading} mayLikeError={mayLikeError} cartItems={cartItems}/>} />

                 <Route path="/returnpolicy" element={<ReturnPolicyPage />} />
                <Route path="/checkouthistory"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                 <Route path="/loanformhistory"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                 <Route path="/restrictedaccess" element={<RestrictedAccess/>} />
                  <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
                    <Route path ="/adminloginpage" element={<LoginPage />}/>
                     <Route path ="/adminregisterpage" element={<RegisterPage />}/>
                      <Route path="/installmenthistorypage"  element={<Login handleLogin={handleLogin} isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}/>
                      <Route path="/installmentterms" element={<InstallmentTerms />} />
                     <Route path="/epayment" element={<Epayment />} />
                        <Route path="/deleteaccount" element={<DeleteAccount />} />
                         <Route path="/loanterms" element={<LoanTerms />} />
                           <Route path="/needhelp" element={<NeedHelp />} />
                             <Route path="/reviewcomponent/:selectedProd" element={<ReviewComponent />} />
                          
                            <Route path="/freebies" element={<Freebies addToCart={addToCart} youMayLikeProducts={youMayLikeProducts }/>} />
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









