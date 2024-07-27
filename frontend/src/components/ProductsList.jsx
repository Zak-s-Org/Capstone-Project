import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import './ProductsList.css';
import bob from "../assets/bob.jpg";
import roblox from "../assets/shopping.webp";
import shirt from "../assets/shirt.jpg";
import shirt2 from "../assets/shirt2.jpg";
import Product from '../classes/Product';

const products = [
  new Product(1, 'Shirt 2', 'Kaboom!', '$300', shirt2),
  new Product(2, 'Shirt', 'Silly couple shirt', '$250', shirt),
  new Product(3, 'Bob', 'Hot summer fashion!', '$300', bob),
  new Product(4, 'Roblox', 'Roblox...', '$200', roblox),
  new Product(5, 'Another Shirt 2', 'Another Kaboom!', '$300', shirt2)
];

const ProductsList = ({ isLoggedIn, cartItems, setCartItems }) => {
  const [quantities, setQuantities] = useState(
    products.reduce((acc, product) => {
      acc[product.id] = 1; // default quantity is 1
      return acc;
    }, {})
  );

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    setCartItems(prevCartItems => {
      const updatedCartItems = { ...prevCartItems };
      const quantity = quantities[productId];
      if (updatedCartItems[productId]) {
        updatedCartItems[productId].quantity += quantity;
      } else {
        updatedCartItems[productId] = {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: quantity
        };
      }
      return updatedCartItems;
    });
  };

  return (
    <div className="product-grid">
      {products.map(product => (
        <div key={product.id} className="product-item">
          <img src={product.img} alt={product.name} className="product-img" />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="product-price">{product.price}</p>
          {isLoggedIn && (
            <div className="product-actions">
              <TextField
                type="number"
                label="Quantity"
                value={quantities[product.id]}
                onChange={(e) => handleQuantityChange(product.id, parseInt(e.target.value, 10))}
                InputProps={{ inputProps: { min: 1 } }}
                variant="outlined"
                size="small"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => addToCart(product.id)}
              >
                Add to Cart
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
