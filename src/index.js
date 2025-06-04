import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from client
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './pages/loginContext';
import ScrollToTop from './pages/ScrollToTop';
import { ProductProvider } from './pages/ProductContext';
import {FeaturedProductsProvider} from './pages/FeaturedProductsContext';
import {BestSellingProvider} from './pages/BestSellingContext';
import {RecommendedProvider} from './pages/RecommendedProductsContext';
import {SearchProductsProvider} from './pages/SearchProductContext';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

root.render( // Use root.render instead of ReactDOM.render
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
       <FeaturedProductsProvider>
        <BestSellingProvider>
         <RecommendedProvider>
         <SearchProductsProvider>
          <Router>
            <ScrollToTop />
            <App />
          </Router>
        </SearchProductsProvider>
          </RecommendedProvider>
         </BestSellingProvider>
        </FeaturedProductsProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();