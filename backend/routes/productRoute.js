import express from 'express';
import Product from './models/product.model.js'; 
const productRouter = express.Router();
import {getProduct, 
    getSingleProduct ,
    updateProduct,
    DeleteProduct} from "../controller/product.controller.js"

productRouter.get("/", getProduct);

productRouter.get("/:id", getProduct);

productRouter.post("/" ,postProduct );

productRouter.updateProduct("/:id", updateProduct);

productRouter.DeleteProduct("/:id" ,DeleteProduct);


export default productRouter;