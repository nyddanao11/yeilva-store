// ProductContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [clickedCategories, setClickedCategories] = useState([]);
  const [storedProducts, setStoredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Add state for allProducts

  const handleItemClickCategory = (categoryName) => {
    setClickedCategories([categoryName.toLowerCase()]);
  };

  async function fetchProducts(category) {
    try {
      const response = await axios.get(
        `http://https://yeilva-store-server.up.railway.app/api/productsdata?category=${encodeURIComponent(category)}`
      );

      const data = Array.isArray(response.data)
        ? response.data.map(formatProductData)
        : [];

      setStoredProducts(data);
      console.log('Fetched category products:', data);
    } catch (error) {
      console.error('Error fetching category products:', error);
    }
  }

  async function fetchAllProducts(name) { // Add fetchAllProducts function
    try {
      const response = await axios.get(
        `http://https://yeilva-store-server.up.railway.app/api/productsearch?name=${encodeURIComponent(name)}`
      );

      const data = Array.isArray(response.data)
        ? response.data.map(formatProductData)
        : [];

      setAllProducts(data);
      console.log('Fetched search products:', data);
    } catch (error) {
      console.error('Error fetching search products:', error);
    }
  }

  const value = {
    clickedCategories,
    setClickedCategories,
    storedProducts,
    setStoredProducts,
    handleItemClickCategory,
    fetchProducts,
    allProducts, // Include allProducts in the context value
    setAllProducts, //Include setAllProducts in the context value
    fetchAllProducts, // Include fetchAllProducts in the context value
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

function formatProductData(product) {
  // ... (Your formatProductData function remains the same)
  return {
    id: product.id || '',
    name: product.name || 'Unknown',
    category: product.category || 'Misc',
    price: parseFloat(product.price) || 0,
    weight: parseFloat(product.weight) || 0,
    stock: parseFloat(product.stock) || 0,
    url: product.url?.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL) || '',
    page: parseInt(product.page, 10) || 1,
    thumbnails: Array.isArray(product.thumbnails)
      ? product.thumbnails.map(thumbnail =>
          thumbnail.replace(/\$\{process\.env\.PUBLIC_URL\}/g, process.env.PUBLIC_URL)
        )
      : [],
    description: product.description || '',
    place: product.place || '',
    sizecolor: product.sizecolor || '',
    productDetails: product.product_details || '',
    shipping: product.shipping || '',
  };
}