import React, { useState } from 'react';
import { styled } from '@mui/system';
import { Grid, Paper, Typography, TextField, Checkbox, Button, Box, Divider, Avatar, Snackbar, IconButton } from '@mui/material';
import { FaGoogle } from 'react-icons/fa';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/dancing-script';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  color: "#BDBDBD"
};

const testimonials = [
  { name: 'John Doe', message: 'Great platform! Really helped me improve my productivity.', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'Jane Smith', message: 'I love the user experience, easy to navigate and very intuitive.', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
  { name: 'Emily Johnson', message: 'Fantastic service and support!', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }
];

const StyledContainer = styled('div')({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#889B9E',
  color: '#FFFFFF',
});

const StyledPaper = styled(Paper)({
  padding: '2rem',
  backgroundColor: '#152128',
  borderRadius: '10px'
});

const theme = createTheme({
  typography: {
    fontFamily: 'Dancing Script, cursive',
  },
});

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('bearerToken', token);
      setIsLoggedIn(true); // Set logged in state to true
      navigate('/home');
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || 'Login failed. Please check your email and password.');
      } else if (error.request) {
        setError('No response from server. Please try again later.');
      } else {
        setError('An error occurred. Please try again.');
      }
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledContainer>
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} md={7} lg={6}>
          <StyledPaper>
            <Typography variant="h3" gutterBottom>Welcome!</Typography>
            <Typography style={style} variant="h4" gutterBottom>Sign In</Typography>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Box display="flex" alignItems="center">
                <Checkbox style={{ color: '#BDBDBD' }} />
                <Typography variant="body2">Remember me</Typography>
              </Box>
              <Button color="secondary">Forgot password?</Button>
            </Box>
            <Button variant="contained" color="primary" fullWidth style={{ margin: '1rem 0' }} onClick={handleLogin}>Sign In</Button>
            <Divider style={{ backgroundColor: '#BDBDBD', margin: '1rem 0' }}>Or</Divider>
            <Button variant="outlined" color="secondary" fullWidth startIcon={<FaGoogle />}>Sign in with Google</Button>
          </StyledPaper>
        </Grid>
        <Grid item xs={12} md={5} lg={6}>
          <Grid container spacing={2}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} key={index}>
                <ThemeProvider theme={theme}>
                  <Paper style={{ backgroundColor: '#152128', padding: '1rem', borderRadius: '10px', display: 'flex', alignItems: 'center', color: '#BDBDBD' }}>
                    <Avatar src={testimonial.avatar} style={{ border: '2px solid #BDBDBD', margin: '0 1rem 0 0' }} />
                    <Box>
                      <Typography variant="h6">{testimonial.name}</Typography>
                      <Typography variant="body2">{testimonial.message}</Typography>
                    </Box>
                  </Paper>
                </ThemeProvider>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={error}
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </StyledContainer>
  );
};

export default LoginPage;
