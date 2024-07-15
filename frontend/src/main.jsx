import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter ,createBrowserRouter,createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import RegisterUser from './components/admin/RegisterUser';
import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component


import { Provider } from 'react-redux';
import store from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path ='/' element ={<App/>}>
       {/* <Route index ={true} path="/" element={<Dashboard/>} /> */}
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
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router ={router} />
  </Provider> 
 
)
