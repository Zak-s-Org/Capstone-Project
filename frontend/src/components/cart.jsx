import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, TextField } from '@mui/material';

const Cart = ({ bearerToken }) => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
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
        console.log('Fetched cart items:', data); // Debugging log
        setCartItems(data);
        const productIds = data.map(item => item.product_id);
        fetchProductDetails(productIds);
      } catch (error) {
        console.error('Error fetching cart items:', error.message);
        setError('Error fetching cart items. Please try again later.');
      }
    };

    const fetchProductDetails = async (productIds) => {
      try {
        const response = await fetch('http://localhost:3000/api/products/byIds', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${bearerToken}`
          },
          body: JSON.stringify({ ids: productIds })
        });

        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const data = await response.json();
        const productsMap = data.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
        setProducts(productsMap);
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

  return (
    <div>
      <Typography variant="subtitle1" style={{ margin: '20px 0' }}>
        Bearer Token: {bearerToken}
      </Typography>
      {error && (
        <Typography variant="subtitle1" color="error" style={{ margin: '20px 0' }}>
          {error}
        </Typography>
      )}
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
                <TableCell>{products[item.product_id]?.name || 'Loading...'}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
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
      </div>
    </div>
  );
};

export default Cart;
