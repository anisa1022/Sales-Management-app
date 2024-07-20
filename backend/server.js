import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv';
dotenv.config();
import {notFound , errorHandler } from './middleware/errorMiddleware.js'
import path from 'path'
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRouter.js';
import CustomerRoute  from './routes/customerRoute.js';
import SaleRoute from './routes/saleRoute.js'
import SupplierRoute from './routes/supplierRoute.js';
import PurchaseRoute from './routes/purcheseRoutes.js'
import dashboardRoutes from './routes/dashboardRoute.js'
import cors from 'cors'

import cookieParser from 'cookie-parser';
connectDB();
const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

if(process.env.NODE_ENV === 'production'){
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    app.get('*',(req, res) => res.sendFile(path.resolve(__dirname, 'frontend','dist', 'index.html')))
}else {
    app.get('/',(req,res)=> res.send('server is ready '));
}



app.use('/api/products',productRoute);
app.use('/api/users' , userRoute);
app.use('/api/customers', CustomerRoute);
app.use('/api/sales', SaleRoute);
app.use('/api/suppliers', SupplierRoute);
app.use('/api/purchases', PurchaseRoute);
app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 8000

app.use(errorHandler);
app.use(notFound);
app.listen( PORT, ()=> console.log(`server started running on ${PORT}`));