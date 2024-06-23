import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv';


const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.use("/api/products",productRoute)
// app.use("/api/users" , u)

app.get('/',(req,res)=> res.send('server is ready'));
connectDB();
app.listen(process.env.PORT , ()=> console.log(`server started running on ${process.env.PORT}`));