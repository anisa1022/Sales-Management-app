import Product from "../models/productModel.js";

const getProduct = async(req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

/// get single product 
const getSingleProduct = async(req, res)=>{
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


/// post product
const postProduct =async(req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
/// update product
const updateProduct =async(req,res)=>{
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        const UpdateProduct = await Product.findById(IDBTransaction);
        res.status(200).json(UpdateProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// delete product
const DeleteProduct =async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404).json({message:"Product not Found"});
        }
        res.status(200).json({message: " Product Deleted Successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
       
    };
};

export {
    getProduct ,
    getSingleProduct ,
    postProduct ,
    updateProduct,
    DeleteProduct
}