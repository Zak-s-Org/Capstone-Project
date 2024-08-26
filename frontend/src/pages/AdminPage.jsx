import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [userForm, setUserForm] = useState({ email: "", password: "" });
  const [productForm, setProductForm] = useState({ name: "", description: "", price: "" });
  const [userEditMode, setUserEditMode] = useState(false);
  const [productEditMode, setProductEditMode] = useState(false);
  const [editUserId, setEditUserId] = useState(null);
  const [editProductId, setEditProductId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isForbidden, setIsForbidden] = useState(false);
  const navigate = useNavigate();

  // Decode the token
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
    console.log("Token from localStorage:", token); // Debugging token retrieval

    if (token) {
      const decodedToken = decodeToken(token);
      console.log("Decoded Token:", decodedToken); // Debugging decoded token

      // Check if user ID is 1 or if the user has the 'admin' role
      if (decodedToken && (decodedToken.id === 1 || decodedToken.role === 'admin')) {
        fetchData();
      } else {
        console.warn("User does not have admin privileges or token is invalid");
        setIsForbidden(true);
      }
    } else {
      console.warn("No token found, redirecting to login");
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
      console.log("Users fetched:", usersResponse.data); // Debugging users data
      console.log("Products fetched:", productsResponse.data); // Debugging products data

      setUsers(Array.isArray(usersResponse.data) ? usersResponse.data : []);
      setProducts(Array.isArray(productsResponse.data) ? productsResponse.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleUserInputChange = (e) => {
    setUserForm({ ...userForm, [e.target.name]: e.target.value });
  };

  const handleProductInputChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value });
  };

  const handleUserSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userEditMode) {
        await axios.put(`/api/users/${editUserId}`, userForm);
      } else {
        await axios.post("/api/users", userForm);
      }
      setUserForm({ email: "", password: "" });
      setUserEditMode(false);
      fetchData();
    } catch (error) {
      console.error("Error submitting user form:", error);
      setError("Error submitting user form. Please try again.");
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ensure price is converted to a number
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
      console.error("Error submitting product form:", error);
      setError("Error submitting product form. Please try again.");
    }
  };

  const handleUserEdit = (user) => {
    setUserForm(user);
    setUserEditMode(true);
    setEditUserId(user.id);
  };

  const handleProductEdit = (product) => {
    setProductForm(product);
    setProductEditMode(true);
    setEditProductId(product.id);
  };

  const handleUserDelete = async (id) => {
    try {
      await axios.delete(`/api/users/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Error deleting user. Please try again.");
    }
  };

  const handleProductDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error deleting product. Please try again.");
    }
  };

  // If forbidden, provide feedback instead of redirecting immediately
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
          <button type="submit">{userEditMode ? "Update" : "Create"}</button>
        </form>
        <ul>
          {Array.isArray(users) && users.length > 0 ? (
            users.map((user) => (
              <li key={user.id}>
                {user.email}
                <button onClick={() => handleUserEdit(user)}>Edit</button>
                <button onClick={() => handleUserDelete(user.id)}>Delete</button>
              </li>
            ))
          ) : (
            <li>No users found</li>
          )}
        </ul>
      </div>

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
          <button type="submit">{productEditMode ? "Update" : "Create"}</button>
        </form>
        <ul>
          {Array.isArray(products) && products.length > 0 ? (
            products.map((product) => (
              <li key={product.id}>
                {product.name} - {product.description} - ${product.price}
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
