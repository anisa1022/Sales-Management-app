import axios from 'axios';

// Base URL for sale-related API endpoints
const API_URL = 'http://localhost:8000/api/sales';

// Get all sales
const getSales = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Create a new sale
const createSale = async (sale) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, sale, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Update an existing sale
const updateSale = async (id, sale) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, sale, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Delete a sale
const deleteSale = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default {
  getSales,
  createSale,
  updateSale,
  deleteSale
};
