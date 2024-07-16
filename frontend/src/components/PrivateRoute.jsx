// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const PrivateRoute = ({ children }) => {
//   const isAuthenticated = !!localStorage.getItem("token"); // Check if the user is authenticated
//   return isAuthenticated ? children : <Navigate to="/login" />;
// };

// export default PrivateRoute;
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.auth.userInfo); // Access the userInfo from the Redux store
  return userInfo ? children : <Navigate to="/login" />; // If userInfo exists, allow access, otherwise redirect to login
};

export default PrivateRoute;
