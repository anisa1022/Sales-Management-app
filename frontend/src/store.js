import { configureStore } from '@reduxjs/toolkit';
import authReducer from './services/authSlice';
import { apiSlice } from './services/apiSlice';
import { customerApiSlice } from './services/customerSlice';
import { saleApiSlice } from './services/saleSlice';
import { suppliersApiSlice } from './services/supplierSlice';
import { purchasesApiSlice } from './services/purcheseSlice';
import { chartApiSlice } from './services/chartSlice';
import { productApiSlice } from './services/productSlice'; // Import the product slice
import { dashboardSlice } from './services/dashboardSlice';

// Configure the Redux store
const store = configureStore({
    // Reducers are functions that handle actions and update the state
    reducer: {
      // The `auth` slice manages authentication state (e.g., user login status)
      auth: authReducer,
  
      // Include the base API slice's reducer to manage API state
      [apiSlice.reducerPath]: apiSlice.reducer,
  
      // Include the customer API slice's reducer to manage customer-related API state
      [customerApiSlice.reducerPath]: customerApiSlice.reducer,
  
      // Include the sale API slice's reducer to manage sale-related API state
      [saleApiSlice.reducerPath]: saleApiSlice.reducer,
  
      // Include the supplier API slice's reducer to manage supplier-related API state
      [suppliersApiSlice.reducerPath]: suppliersApiSlice.reducer,
  
      // Include the purchase API slice's reducer to manage purchase-related API state
      [purchasesApiSlice.reducerPath]: purchasesApiSlice.reducer,
  
      // Include the chart API slice's reducer to manage chart-related API state
      [chartApiSlice.reducerPath]: chartApiSlice.reducer,
  
      // Include the product API slice's reducer to manage product-related API state
      [productApiSlice.reducerPath]: productApiSlice.reducer,

      [dashboardSlice.reducerPath]: dashboardSlice.reducer,
    },
    // Middleware enhances Redux with additional capabilities, such as handling asynchronous actions
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        // Include middleware for handling API calls for the base API slice
        apiSlice.middleware,
        // Include middleware for handling API calls for the customer API slice
        customerApiSlice.middleware,
        // Include middleware for handling API calls for the sale API slice
        saleApiSlice.middleware,
        // Include middleware for handling API calls for the supplier API slice
        suppliersApiSlice.middleware,
        // Include middleware for handling API calls for the purchase API slice
        purchasesApiSlice.middleware,
        // Include middleware for handling API calls for the chart API slice
        chartApiSlice.middleware,
        // Include middleware for handling API calls for the product API slice
        productApiSlice.middleware,

        dashboardSlice.middleware
      ),
    // Enable Redux DevTools for easier debugging in development mode
    devTools: true,
  });
  
  export default store;