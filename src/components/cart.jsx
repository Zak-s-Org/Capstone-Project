import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';

const Cart = ({ cartItems }) => {
  const cartProducts = Object.values(cartItems);

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
            </TableRow>
          </TableHead>
          <TableBody>
            {cartProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>{product.id}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <Typography variant="h6">Total Count: {totalCount}</Typography>
        <Typography variant="h6">Total Cost: ${totalCost.toFixed(2)}</Typography>
      </div>
    </div>
  );
}

export default Cart;
