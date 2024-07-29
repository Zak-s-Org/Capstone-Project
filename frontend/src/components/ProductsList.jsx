import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import './ProductsList.css';

const ProductsList = ({ isLoggedIn, userId, cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products');
        console.log('Fetched products:', response.data);
        setProducts(response.data);
        setQuantities(response.data.reduce((acc, product) => {
          acc[product.id] = 1;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/carts/user/${userId}`);
        console.log('Fetched cart items:', response.data);
        setCartItems(response.data.reduce((acc, item) => {
          acc[item.product_id] = item;
          return acc;
        }, {}));
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchProducts();
    fetchCartItems();
  }, [userId]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const addToCart = async (productId) => {
    const product = products.find(p => p.id === productId);
    const quantity = quantities[productId];

    try {
      await axios.post('http://localhost:3000/api/carts', {
        user_id: userId,
        product_id: productId,
        quantity: quantity,
      });

      setCartItems(prevCartItems => {
        const updatedCartItems = { ...prevCartItems };
        if (updatedCartItems[productId]) {
          updatedCartItems[productId].quantity += quantity;
        } else {
          updatedCartItems[productId] = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
          };
        }
        return updatedCartItems;
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const renderProductRows = () => {
    const rows = [];
    for (let i = 0; i < products.length; i += 4) {
      rows.push(products.slice(i, i + 4));
    }
    return rows.map((row, rowIndex) => (
      <div key={rowIndex} className="product-row">
        {row.map(product => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-price">${product.price}</p>
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
    ));
  };

  return (
    <div className="product-grid">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        renderProductRows()
      )}
    </div>
  );
};

export default ProductsList;
