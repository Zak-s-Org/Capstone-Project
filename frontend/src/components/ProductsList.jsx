import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Button, TextField } from '@mui/material';
import './ProductsList.css';

const ProductsList = ({ searchQuery }) => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [cartItems, setCartItems] = useState({});
  const [userId, setUserId] = useState(null);

  const bearerToken = localStorage.getItem('bearerToken');
  const isLoggedIn = !!bearerToken;

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    if (bearerToken) {
      try {
        const decodeToken = (token) => {
          const base64Url = token.split('.')[1];
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
          const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          }).join(''));
          return JSON.parse(jsonPayload);
        };

        const decodedToken = decodeToken(bearerToken);
        setUserId(decodedToken.id); // Assuming `id` is the field for user ID in the token
      } catch (error) {
        console.error('Failed to decode token:', error);
      }
    }
  }, [bearerToken]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/products', {
          params: { query: searchQuery },
        });
        console.log('Fetched products:', response.data);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId && isLoggedIn) {  // Ensure userId is set before fetching cart items
        try {
          const response = await axios.get(`http://localhost:3000/api/carts/${userId}`, {
            headers: {
              Authorization: `Bearer ${bearerToken}`
            }
          });
          const cartData = response.data.reduce((acc, item) => {
            acc[item.productId] = item; // Corrected to use productId
            return acc;
          }, {});
          setCartItems(cartData);
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      }
    };

    fetchCartItems();
  }, [isLoggedIn, userId, bearerToken]);

  useEffect(() => {
    const initialQuantities = products.reduce((acc, product) => {
      acc[product.id] = cartItems[product.id]?.quantity || 1;
      return acc;
    }, {});
    setQuantities(initialQuantities);
  }, [products, cartItems]);

  const handleQuantityChange = (productId, quantity) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const addToCart = async (productId) => {
    if (!userId) {
      alert('User not identified');
      return;
    }

    const product = products.find(p => p.id === productId);
    const quantity = quantities[productId];

    try {
      await axios.post('http://localhost:3000/api/carts', {
        userId, // Corrected to use camelCase
        productId, // Corrected to use camelCase
        quantity: quantity,
      }, {
        headers: {
          Authorization: `Bearer ${bearerToken}`
        }
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

      alert('Item added to cart successfully!');
    } catch (error) {
      if (error.response) {
        console.error('Error adding to cart:', error.response.data);
        alert(`Failed to add item to cart: ${error.response.data.error}`);
      } else {
        console.error('Error adding to cart:', error);
        alert('Failed to add item to cart.');
      }
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
            <img 
              src={product.image} 
              alt={product.name} 
              className="product-image" 
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p className="product-price">${product.price}</p>
            {isLoggedIn && (
              <div className="product-actions">
                {cartItems[product.id] ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate('/cart')} // Use navigate to redirect to the cart page
                  >
                    View Cart
                  </Button>
                ) : (
                  <>
                    <TextField
                      type="number"
                      label="Quantity"
                      value={quantities[product.id] || 1}
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
                  </>
                )}
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
