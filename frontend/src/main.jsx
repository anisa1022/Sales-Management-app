import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import App from './App.jsx'
import './index.css'

// const router = createBrowserRouter (
//   createRoutesFromElements(
//     <Route path ='/' element= {<App/>}>
//       <Route path="/" exact component={Dashboard} />
//           <Route path="/sales" exact component={SalesList} />
//           {/* <Route path="/sales/:id" component={SalesDetail} />
//           <Route path="/add-sale" component={AddSale} />
//           <Route path="/edit-sale/:id" component={EditSale} /> */}
//           <Route path="/customers" exact component={CustomerList} />
//           {/* <Route path="/customers/:id" component={CustomerDetail} />
//           <Route path="/add-customer" component={AddCustomer} />
//           <Route path="/edit-customer/:id" component={EditCustomer} /> */}
//           <Route path="/products" exact component={ProductList} />
//           {/* <Route path="/products/:id" component={ProductDetail} />
//           <Route path="/add-product" component={AddProduct} />
//           <Route path="/edit-product/:id" component={EditProduct} /> */}
//           {/* <Route path="/profile" component={UserProfile} />
//           <Route path="/profile" component={UserProfile} />
//           <Route path="/login" component={Login} /> */}
//     </Route>
//   )
// )

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
