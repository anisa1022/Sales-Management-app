import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/authSlice";
import { apiSlice } from "./services/apiSlice";
const store = configureStore({
    reducer: {
        auth: authReducer, 
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=> 
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true

})
export  default store;