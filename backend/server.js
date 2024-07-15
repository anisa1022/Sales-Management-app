import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv';
dotenv.config();
import {notFound , errorHandler } from './middleware/errorMiddleware.js'

import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRouter.js';
import CustomerRoute  from './routes/customerRoute.js';
import SaleRoute from './routes/saleRoute.js'
 
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


app.get('/',(req,res)=> res.send('server is ready '));
app.use(errorHandler);
app.use(notFound);

app.use('/api/products',productRoute);
app.use('/api/users' ,userRoute);
app.use('/api/customers', CustomerRoute);
app.use('/api/sales', SaleRoute);


const PORT = process.env.PORT || 8000
app.listen( PORT, ()=> console.log(`server started running on ${PORT}`));