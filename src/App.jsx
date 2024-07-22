import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Cart from './components/cart';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState({});

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/cart" element={isLoggedIn ? <Cart cartItems={cartItems} /> : <Navigate to="/login" />} />
        <Route path="/home" element={<HomePage isLoggedIn={isLoggedIn} cartItems={cartItems} setCartItems={setCartItems}/>} />
      </Routes>
    </div>
  );
}

export default App;
