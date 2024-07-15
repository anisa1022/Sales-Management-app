import axios from 'axios';

// Base URL for customer-related API endpoints
const API_URL = 'http://localhost:8000/api/customers';

// Get all customers
const getCustomers = async () => {
  const token = localStorage.getItem('token');
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Create a new customer
const createCustomer = async (customer) => {
  const token = localStorage.getItem('token');
  const response = await axios.post(API_URL, customer, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Update an existing customer
const updateCustomer = async (id, customer) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(`${API_URL}/${id}`, customer, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Delete a customer
const deleteCustomer = async (id) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
};
