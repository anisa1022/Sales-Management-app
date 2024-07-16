import React from 'react';
import { Outlet } from 'react-router-dom';
import {  Routes,Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import { useSelector } from 'react-redux';
import Dashboard from './Pages/Dashboard';
import RegisterUser from './Pages/admin/RegisterUser';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component
import './index.css';
import TopNavBar from './components/TopNavbar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <ToastContainer/>
      {/* <Dashboard/>
      <Outlet/> */}
          <TopNavBar/>
          <Routes>
            <Route path="/" element={<Navigate to={userInfo ? "/dashboard" : "/login"} replace />} />
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
    </>
  );
}

export default App;
