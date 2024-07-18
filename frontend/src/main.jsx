import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router ,createBrowserRouter,createRoutesFromElements, RouterProvider } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import Login from './Pages/Login';

import PrivateRoute from './components/PrivateRoute'; // Import PrivateRoute component
import { Provider } from 'react-redux';
import store from './store';

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path ='/' element ={<Login/>}>
//       <Route  path="/dashboard" element={<Dashboard/>} />  
//        {/* <Route 
//           path="/dashboard" 
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           } 
//         /> */}
//         {/* <Route  
//           path="/users" 
//           element={
//             <PrivateRoute>
//               <RegisterUser />
//             </PrivateRoute>
//           } 
//         /> */}
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
 
)
