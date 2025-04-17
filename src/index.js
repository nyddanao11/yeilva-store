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

const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root

root.render( // Use root.render instead of ReactDOM.render
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <Router>
          <ScrollToTop />
          <App />
        </Router>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();