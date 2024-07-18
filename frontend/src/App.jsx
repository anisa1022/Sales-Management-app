import React from 'react';
import { Outlet } from 'react-router-dom';
import {  Routes,Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/PrivateRoute';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import ManageUser from './Pages/ManageUser';
import ManageSuppliers from './Pages/ManageSuppliers'
import ManagePurchases from './Pages/ManagePurchases';
import ManageProducts from './Pages/ManageProducts';
import ManageCustomer from './Pages/ManageCustomer';
import ManageSales from './Pages/ManageSales';

import './index.css';
import Header from './components/Header';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <>
      <ToastContainer/>
          <Header/>
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
                  <ManageUser />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/product" 
              element={
                <PrivateRoute>
                  <ManageProducts />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/supplier" 
              element={
                <PrivateRoute>
                  <ManageSuppliers />
                </PrivateRoute>
              } 
            />
             <Route 
              path="/purchase" 
              element={
                <PrivateRoute>
                  <ManagePurchases />
                </PrivateRoute>
              } 
            />
             <Route 
              path="/sale" 
              element={
                <PrivateRoute>
                  <ManageSales />
                </PrivateRoute>
              } 
            />
             <Route 
              path="/customer" 
              element={
                <PrivateRoute>
                  <ManageCustomer />
                </PrivateRoute>
              } 
            />
            {/* Add other private routes here */}
          </Routes>
    </>
  );
}

export default App;
