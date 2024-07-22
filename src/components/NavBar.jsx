import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import bz from '../assets/bz.webp';
import { useNavigate } from 'react-router-dom';

export default function NavBar({ isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();
  const pages = isLoggedIn ? ['Home', 'Cart', 'Logout'] : ['Login'];

  const handleMenuItemClick = (page) => {
    if (page === 'Logout') {
      setIsLoggedIn(false);
      navigate('/home'); // Redirect to home instead of login on logout
    } else if (page === 'Login') {
      setIsLoggedIn(true);
      navigate('/');
    } else {
      navigate(`/${page.toLowerCase()}`);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ top: 0, zIndex: 1, backgroundColor: '#a3b6bd' }}>
        <Toolbar>
          <img src={bz} alt="BZ Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', sm: 'block' }, color: '#000' }}>
            My App
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
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
