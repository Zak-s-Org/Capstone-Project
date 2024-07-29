import React, { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    fetchData();
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
    }
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    try {
      if (productEditMode) {
        await axios.put(`/api/products/${editProductId}`, productForm);
      } else {
        await axios.post("/api/products", productForm);
      }
      setProductForm({ name: "", description: "", price: "" });
      setProductEditMode(false);
      fetchData();
    } catch (error) {
      console.error("Error submitting product form:", error);
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
    }
  };

  const handleProductDelete = async (id) => {
    try {
      await axios.delete(`/api/products/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

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

