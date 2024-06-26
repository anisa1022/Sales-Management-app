import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import productRoute from './routes/productRoute.js';
import userRoute from './routes/userRouter.js';
import CustomerRoute  from './routes/customerRoute.js';
import SaleRoute from './routes/saleRoute.js'
dotenv.config();
import cookieParser from 'cookie-parser';
connectDB();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser());


app.use('/api/products',productRoute);
app.use('/api/users' ,userRoute);
app.use('/api/customers', CustomerRoute);
app.use('/api/sales', SaleRoute);
app.get('/',(req,res)=> res.send('server is ready '));

const PORT = process.env.PORT || 8000
app.listen( PORT, ()=> console.log(`server started running on ${PORT}`));