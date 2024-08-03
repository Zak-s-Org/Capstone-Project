import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import bz from '../assets/bz.webp';
import { useNavigate } from 'react-router-dom';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [userId, setUserId] = useState(null);

  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      const token = localStorage.getItem('bearerToken');
      if (token) {
        const decodedToken = decodeToken(token);
        if (decodedToken && decodedToken.id) {
          setUserId(decodedToken.id);
        }
      }
    }
  }, [isLoggedIn]);

  const pages = isLoggedIn ? ['Home', 'Cart', 'Logout'] : ['Home', 'Login'];
  if (isLoggedIn && userId === 1) {
    pages.push('Admin');
  }

  const handleMenuItemClick = (page) => {
    if (page === 'Logout') {
      setIsLoggedIn(false);
      localStorage.removeItem('bearerToken'); // Clear the token on logout
      navigate('/login');
    } else if (page === 'Login') {
      navigate('/login');
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Set search query logic here
    navigate('/products');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0, zIndex: 1, backgroundColor: '#a3b6bd' }}>
        <Toolbar>
          <img src={bz} alt="BZ Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, color: '#000' }}>
            BZ Corp
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <form onSubmit={handleSearch} style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </form>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <MenuItem key={page} onClick={() => handleMenuItemClick(page)}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
            <IconButton size="large" edge="end" aria-label="account of current user" aria-haspopup="true" color="inherit">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
