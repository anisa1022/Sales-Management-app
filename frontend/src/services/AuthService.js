import axios from 'axios';

// Base URL for user-related API endpoints
const API_URL = 'http://localhost:8000/api/users';

// Login user and store the token in localStorage
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth`, { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

// Logout user by removing the token from localStorage
const logout = () => {
  localStorage.removeItem('token');
};

// Register a new user
const register = async (name, email, password) => {
  const response = await axios.post(API_URL, { name, email, password });
  return response.data;
};

// Get the currently logged-in user
const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data.user;
};

export default {
  login,
  logout,
  register,
  getCurrentUser
};

