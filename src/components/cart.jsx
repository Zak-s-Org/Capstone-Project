import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, IconButton, TextField, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Delete } from '@mui/icons-material';

const Cart = ({ cartItems, setCartItems }) => {
  const [cartProducts, setCartProducts] = useState(Object.values(cartItems));
  const [open, setOpen] = useState(false);

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cartProducts.map((product) =>
      product.id === id ? { ...product, quantity: parseInt(quantity) } : product
    );
    setCartProducts(updatedCart);
    setCartItems(updatedCart.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {}));
  };

  const handleRemoveProduct = (id) => {
    const updatedCart = cartProducts.filter((product) => product.id !== id);
    setCartProducts(updatedCart);
    setCartItems(updatedCart.reduce((acc, product) => {
      acc[product.id] = product;
      return acc;
    }, {}));
  };

  const handleCheckout = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Calculate total cost and total count
  const totalCost = cartProducts.reduce((total, product) => total + (parseFloat(product.price.replace('$', '')) * product.quantity), 0);
  const totalCount = cartProducts.reduce((count, product) => count + product.quantity, 0);

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>
                  <TextField
                    type="number"
                    value={product.quantity}
                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                    inputProps={{ min: 1 }}
                    variant="outlined"
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveProduct(product.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Typography variant="h6">Total Count: {totalCount}</Typography>
        <Typography variant="h6">Total Cost: ${totalCost.toFixed(2)}</Typography>
        <Button variant="contained" color="primary" onClick={handleCheckout} style={{ marginTop: '20px' }}>
          Checkout
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Checkout Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are about to purchase {totalCount} item(s) for a total cost of ${totalCost.toFixed(2)}.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
