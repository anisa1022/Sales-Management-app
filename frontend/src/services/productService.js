import axios from 'axios';

// Base URL for product-related API endpoints
const API_URL = 'http://localhost:8000/api/products';

// Get all products
const getProducts = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Create a new product
const createProduct = async (product) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Update an existing product
const updateProduct = async (id, product) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, product, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Delete a product
const deleteProduct = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
};

