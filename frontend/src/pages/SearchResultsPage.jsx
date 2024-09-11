import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Grid, CircularProgress } from '@mui/material';

const SearchResultsPage = () => {
  const [searchParams] = useSearchParams();  // Get the search query from the URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const query = searchParams.get('q');  // Extract the search term from the URL

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;  // If there is no search query, do nothing

      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/api/products?q=${query}`);
        setProducts(response.data);  // Set the fetched products
      } catch (error) {
        setError('Error fetching search results.');
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);  // Re-run this effect if the query changes

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6" color="error">{error}</Typography>;
  }

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Search Results for "{query}"
      </Typography>
      <Grid container spacing={2}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', height: 'auto' }}
                />
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body1">${product.price.toFixed(2)}</Typography>
              </div>
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No products found for "{query}"</Typography>
        )}
      </Grid>
    </div>
  );
};

export default SearchResultsPage;
