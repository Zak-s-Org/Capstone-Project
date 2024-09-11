import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [userForm, setUserForm] = useState({ email: "", password: "", address: "", phone: "", billingInfo: "" });
  const [productForm, setProductForm] = useState({ name: "", description: "", price: "" });
  const [userEditMode, setUserEditMode] = useState(false);
  const [productEditMode, setProductEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isForbidden, setIsForbidden] = useState(false);
  const navigate = useNavigate();

  // Decode the token to check admin privileges
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('bearerToken');

    if (token) {
      const decodedToken = decodeToken(token);
      if (decodedToken && (decodedToken.id === 1 || decodedToken.role === 'admin')) {
        fetchData();
      } else {
        setIsForbidden(true);
      }
    } else {
      setIsForbidden(true);
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [usersResponse, productsResponse] = await Promise.all([
        axios.get("/api/users"),
        axios.get("/api/products"),
      ]);
      setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);
      setProducts(Array.isArray(productsResponse.data) ? productsResponse.data : []);
    } catch (error) {
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle changes in the user form input
  const handleUserInputChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  // Handle changes in the product form input
  const handleProductInputChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  // Submit the user form to add or update a user
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userEditMode) {
        await axios.put(`/api/users/${editUserId}`, userForm);
      } else {
        await axios.post("/api/users", userForm);
      }
      setUserForm({ email: "", password: "", address: "", phone: "", billingInfo: "" });
      setUserEditMode(false);
      fetchData();
    } catch (error) {
      setError("Error submitting user form. Please try again.");
    }
  };

  // Submit the product form to add or update a product
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = { ...productForm, price: parseFloat(productForm.price) };
      if (productEditMode) {
        await axios.put(`/api/products/${editProductId}`, productData);
      } else {
        await axios.post("/api/products", productData);
      }
      setProductForm({ name: "", description: "", price: "" });
      setProductEditMode(false);
      fetchData();
    } catch (error) {
      setError("Error submitting product form. Please try again.");
    }
  };

  // Edit a user's information
  const handleUserEdit = (user) => {
    setUserForm(user);
    setUserEditMode(true);
    setEditUserId(user.id);
  };

  // Edit a product's information
  const handleProductEdit = (product) => {
    setProductForm(product);
    setProductEditMode(true);
    setEditProductId(product.id);
  };

  // Delete a user by ID
  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchData();
    } catch (error) {
      setError("Error deleting user. Please try again.");
    }
  };

  // Delete a product by ID
  const handleProductDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchData();
    } catch (error) {
      setError("Error deleting product. Please try again.");
    }
  };

  // If the user is forbidden, show an error message
  if (isForbidden) {
    return <div>Forbidden: You do not have access to this page.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>

      {/* Manage Users */}
      <div>
        <h2>Manage Users</h2>
        <form onSubmit={handleUserSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userForm.email}
            onChange={handleUserInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={userForm.password}
            onChange={handleUserInputChange}
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={userForm.address}
            onChange={handleUserInputChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={userForm.phone}
            onChange={handleUserInputChange}
            required
          />
          <input
            type="text"
            name="billingInfo"
            placeholder="Billing Information"
            value={userForm.billingInfo}
            onChange={handleUserInputChange}
            required
          />
          <button type="submit">{userEditMode ? "Update User" : "Create User"}</button>
        </form>
        <ul>
          {users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                {user.email}, {user.address}, {user.phone}, {user.billingInfo}
                <button onClick={() => handleUserEdit(user)}>Edit</button>
                <button onClick={() => handleUserDelete(user.id)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No users found</li>
          )}
        </ul>
      </div>

      {/* Manage Products */}
      <div>
        <h2>Manage Products</h2>
        <form onSubmit={handleProductSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={productForm.name}
            onChange={handleProductInputChange}
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={productForm.description}
            onChange={handleProductInputChange}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productForm.price}
            onChange={handleProductInputChange}
            required
          />
          <button type="submit">{productEditMode ? "Update Product" : "Create Product"}</button>
        </form>
        <ul>
          {products.length > 0 ? (
            products.map((product) => (
              <li key={product.id}>
                {product.name} - {product.description} - ${product.price.toFixed(2)}
                <button onClick={() => handleProductEdit(product)}>Edit</button>
                <button onClick={() => handleProductDelete(product.id)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No products found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Admin;
