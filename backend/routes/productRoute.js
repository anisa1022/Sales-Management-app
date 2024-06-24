import express from 'express';

const router = express.Router();
import {getProduct, 
    getSingleProduct ,
    postProduct,
    updateProduct,
    DeleteProduct} from "../controller/productController.js"

router.get("/", getProduct);

router.get("/:id", getProduct);

router.post("/" , postProduct );

router.put("/:id", updateProduct);

router.delete("/:id" ,DeleteProduct);


export default router;