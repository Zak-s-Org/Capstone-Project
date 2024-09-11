import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Cart from './components/cart';
import AdminPage from './pages/AdminPage';
import CheckoutConfirm from './components/CheckoutConfirm'; // Corrected name
import CheckoutSuccess from './components/CheckoutSuccess';
import SearchResultsPage from './pages/SearchResultsPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('bearerToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        {/* Redirects based on login status */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        
        {/* Login route */}
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        
        {/* Cart route - protected by login */}
        <Route 
          path="/cart" 
          element={isLoggedIn ? <Cart cartItems={cartItems} setCartItems={setCartItems} /> : <Navigate to="/login" />} 
        />
        
        {/* Home route - protected by login */}
        <Route 
          path="/home" 
          element={<HomePage isLoggedIn={isLoggedIn} cartItems={cartItems} setCartItems={setCartItems} />} 
        />
        
        {/* Admin route - protected by login */}
        <Route 
          path="/admin" 
          element={isLoggedIn ? <AdminPage isLoggedIn={isLoggedIn} /> : <Navigate to="/login" />} 
        />

        {/* search route */}
        <Route 
        path="/search" 
        element={<SearchResultsPage />} />  
        
        {/* CheckoutConfirm route - protected by login */}
        <Route 
          path="/checkout" 
          element={isLoggedIn ? <CheckoutConfirm cartItems={cartItems} /> : <Navigate to="/login" />} 
        />
        
        {/* Checkout Success route */}
        <Route path="/checkout-success" element={<CheckoutSuccess />} />
      </Routes>
    </div>
  );
}

export default App;
