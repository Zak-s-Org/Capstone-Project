import React, { useState, useEffect } from 'react';
import { Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CheckoutConfirm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [totalCost, setTotalCost] = useState(0); // State for total cost
  const [error, setError] = useState('');
  const bearerToken = localStorage.getItem('bearerToken');
  const navigate = useNavigate();

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
          throw new Error('Network response was not ok.');
        }

        const data = await response.json();
        setCartItems(data);

        const productIds = data.map(item => item.productId);
        fetchProductDetails(productIds, data); // Pass cart items to calculate total cost later
      } catch (error) {
        setError('Error fetching cart items. Please try again later.');
      }
    };

    const fetchProductDetails = async (productIds, cartItems) => {
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
          throw new Error('Network response was not ok.');
        }

        const productsData = await response.json();
        const productsMap = productsData.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});
        setProducts(productsMap);

        calculateTotal(productsMap, cartItems); // Calculate the total cost once product details are available
      } catch (error) {
        setError('Error fetching product details.');
      }
    };

    const calculateTotal = (productsMap, cartItems) => {
      const total = cartItems.reduce((sum, item) => {
        const product = productsMap[item.productId];
        return sum + (product ? product.price * item.quantity : 0);
      }, 0);
      setTotalCost(total); // Set the total cost in the state
    };

    fetchCartItems();
  }, [bearerToken]);

  const handleCheckout = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/checkout-confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${bearerToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Checkout failed.');
      }

      navigate('/checkout-success');
    } catch (error) {
      setError('Checkout failed. Please try again.');
    }
  };

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map(item => (
              <TableRow key={item.id}>
                <TableCell>{products[item.productId]?.name || 'Loading...'}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${(products[item.productId]?.price * item.quantity).toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h5" style={{ marginTop: '20px' }}>
        Total Cost: ${totalCost.toFixed(2)} {/* Display the calculated total cost */}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleCheckout}
        style={{ marginTop: '20px' }}
      >
        Confirm Purchase
      </Button>
    </div>
  );
};

export default CheckoutConfirm;
