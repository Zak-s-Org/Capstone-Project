import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate to handle navigation

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const bearerToken = localStorage.getItem('bearerToken');
  const navigate = useNavigate();  

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!bearerToken) return;

      try {
        const response = await fetch('http://localhost:3000/api/carts/user/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
          }
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        setCartItems(data);

        const productIds = data.map(item => item.productId); // Extract product IDs
        fetchProductDetails(productIds);
      } catch (error) {
        console.error('Error fetching cart items:', error.message);
        setError('Error fetching cart items. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    const fetchProductDetails = async (productIds) => {
      if (productIds.length === 0) return;
    
      try {
        const response = await fetch('http://localhost:3000/api/products/byIds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`  // Ensure the token is included if needed
          },
          body: JSON.stringify({ ids: productIds })  // Sending product IDs in the body
        });
    
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
    
        const data = await response.json();
        const productsMap = data.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
    
        setProducts(productsMap);  // Storing the products in the state
      } catch (error) {
        console.error('Error fetching product details:', error.message);
        setError('Error fetching product details. Please try again later.');
      }
    };
    
    fetchCartItems();
  }, [bearerToken]);

  const handleDelete = async (itemId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/carts/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
        }
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      setCartItems(cartItems.filter(item => item.id !== itemId));
    } catch (error) {
      console.error('Error deleting cart item:', error.message);
      setError('Error deleting cart item. Please try again later.');
    }
  };

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      const response = await fetch(`http://localhost:3000/api/carts/${itemId}/quantity`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
        },
        body: JSON.stringify({ quantity })
      });

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const updatedItem = await response.json();
      setCartItems(cartItems.map(item => item.id === itemId ? updatedItem : item));
    } catch (error) {
      console.error('Error updating cart item quantity:', error.message);
      setError('Error updating cart item quantity. Please try again later.');
    }
  };

  if (loading) {
    return <Typography variant="h6">Loading cart items...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  const totalCost = cartItems.reduce((total, item) => {
    const product = products[item.productId];
    return total + (product ? product.price * item.quantity : 0);
  }, 0);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{products[item.productId]?.name || 'Loading...'}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value, 10))}
                    inputProps={{ min: 1 }}
                  />
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Typography variant="h6">Total Count: {cartItems.reduce((count, item) => count + item.quantity, 0)}</Typography>
        <Typography variant="h6">Total Cost: ${totalCost.toFixed(2)}</Typography>
        {/* Proceed to Checkout Button */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/checkout')}  // Navigate to the updated checkout route
          style={{ marginTop: '20px' }}
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
