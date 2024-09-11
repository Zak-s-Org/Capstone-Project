import React from 'react';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Thanks a ton for Your Purchase!
      </Typography>
      <Typography variant="h6">
        Your order has been placed successfully.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/products')} 
        style={{ marginTop: '20px' }}
      >
        Continue Shopping
      </Button>
    </div>
  );
};

export default CheckoutSuccess;
