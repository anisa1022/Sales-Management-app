import Product from "../models/productModel.js";

const getProduct = async(req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// /// get single product 
// const getSingleProduct = async(req, res)=>{
//     try {
//         const { id } = req.params
//         const product = await Product.findById(id)
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// }


/// post product
const postProduct =async(req,res)=>{
    const { name, description, price, category, stock } = req.body;
    try {
        const product = new Product({
            name,
            description,
            price: Number(price),
            category,
            stock: Number(stock),
          });
        
          const createdProduct = await product.save();
          res.status(201).json(createdProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
/// update product
const updateProduct =async(req,res)=>{
    const { id } = req.params;
  const { name, description, price, category, stock } = req.body;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    product.name = name;
    product.description = description;
    product.price = price;
    product.category = category;
    product.stock = stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
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
    // getSingleProduct ,
    postProduct ,
    updateProduct,
    DeleteProduct
}