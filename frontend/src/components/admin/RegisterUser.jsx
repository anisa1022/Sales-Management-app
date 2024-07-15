import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import NavigationBar from '../NavigationBar'; 

function RegisterUser() {
  const [name ,setName] = useState('');
  const [email ,setEmail] = useState('');
  const [password ,setPassword] = useState('');

  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        setError("User is not authenticated");
        navigate('/login');
        return;
      }
      const url = "http://localhost:8000/api/users";
      const { data: res } = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Fetched users:", res); // Log the response to check if users are being fetched
      setUsers(res);
    } catch (error) {
      console.error("Error fetching users:", error);
      if (error.response && error.response.status === 401) {
        setError("Unauthorized. Please log in again.");
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    console.log("Users state updated:", users); // Log the users state to ensure it's being set
  }, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        setError("User is not authenticated");
        navigate('/login');
        return;
      }
      const url = editing ? `http://localhost:8000/api/users/${editingId}` : "http://localhost:8000/api/users";
      const method = editing ? 'put' : 'post';
      const { data: res } = await axios[method](url, data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
      setEditing(false);
      setEditingId(null);
      setData({ name: "", email: "", password: "" });
      setError(""); // Clear any previous error
      setSuccess(true); // Set success state
      console.log("Response from submit:", res);
    } catch (error) {
      setSuccess(false); // Reset success state
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  const handleEdit = (user) => {
    setEditing(true);
    setEditingId(user._id);
    setData({ name: user.name, email: user.email, password: "" });
    setError(""); // Clear any previous error
    setSuccess(false); // Reset success state
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      if (!token) {
        setError("User is not authenticated");
        navigate('/login');
        return;
      }
      const url = `http://localhost:8000/api/users/${id}`;
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="flex">
      <NavigationBar />
      <div className="flex-1 p-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold mb-4">Manage Users</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e)=> setName(e.target.value)}
              value={name}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error && <div className="text-red-500">{error}</div>}
            {success && <div className="text-green-500">Operation successful!</div>}
            <button type="submit" className="w-full bg-[#404040] text-white p-2 rounded hover:bg-gray-500 transition duration-200">
              {editing ? "Update User" : "Save User"}
            </button>
          </form>
        </div>

        <div className="max-w-lg mx-auto mt-8">
          <h2 className="text-xl font-bold mb-4">Users List</h2>
          <ul className="space-y-2">
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user._id} className="flex justify-between items-center p-2 border border-gray-300 rounded">
                  <span>{user.name} ({user.email})</span>
                  <div className="space-x-2">
                    <button onClick={() => handleEdit(user)} className="bg-yellow-500 text-white px-2 py-1 rounded">
                      Edit
                    </button>
                    <button onClick={() => handleDelete(user._id)} className="bg-red-500 text-white px-2 py-1 rounded">
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-2 border border-gray-300 rounded">No users found</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
