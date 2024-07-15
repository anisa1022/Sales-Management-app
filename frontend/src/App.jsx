import React from 'react';
import { Outlet } from 'react-router-dom';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import RegisterUser from './components/admin/RegisterUser';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component
import './index.css';
import TopNavBar from './components/TopNavbar';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <>
      <TopNavBar/>
      <ToastContainer/>
      <Outlet/>
    </>
    // <Router>
    //   <div>
    //     <TopNavBar/>
    //     <Routes>
    //     <Route path="/" element={<Dashboard/>} />
    //     <Route path="/login" element={<Login />} />
    //     <Route 
    //       path="/dashboard" 
    //       element={
    //         <PrivateRoute>
    //           <Dashboard />
    //         </PrivateRoute>
    //       } 
    //     />
    //     <Route 
    //       path="/users" 
    //       element={
    //         <PrivateRoute>
    //           <RegisterUser />
    //         </PrivateRoute>
    //       } 
    //     />
    //     {/* Add other private routes here */}
    //   </Routes>
    //   </div>
    // </Router>
  );
}

export default App;
