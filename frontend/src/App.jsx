import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import RegisterUser from './Pages/RegisterUser';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component
import './index.css';
import TopNavBar from './components/TopNavbar';

function App() {
  return (
    <Router>
      <div>
        <TopNavBar/>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/users" 
          element={
            <PrivateRoute>
              <RegisterUser />
            </PrivateRoute>
          } 
        />
        {/* Add other private routes here */}
      </Routes>
      </div>
    </Router>
  );
}

export default App;
