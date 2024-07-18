import asyncHandler from 'express-async-handler';
import Purchase from '../models/purchaseModel.js';
import Product from '../models/productModel.js';
import Supplier from '../models/supplierModel.js';

// @desc Create a new purchase
// @route POST /api/purchases
// @access Private/Admin
const createPurchase = asyncHandler(async (req, res) => {
  const { product, supplier, quantity, price } = req.body;

  const productExists = await Product.findById(product);
  const supplierExists = await Supplier.findById(supplier);

  if (!productExists || !supplierExists) {
    res.status(400);
    throw new Error('Invalid product or supplier');
  }

  const totalPrice = quantity * price;

  const purchase = new Purchase({
    product,
    supplier,
    quantity,
    price,
    totalPrice,
  });

  const createdPurchase = await purchase.save();

  // Update the product stock
  productExists.stock += quantity;
  await productExists.save();

  res.status(201).json(createdPurchase);
});

// @desc Get all purchases
// @route GET /api/purchases
// @access Private/Admin
const getPurchases = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find({}).populate('product supplier');
  res.status(200).json(purchases);
});

// @desc Get purchase by ID
// @route GET /api/purchases/:id
// @access Private/Admin
const getPurchaseById = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id).populate('product supplier');

  if (purchase) {
    res.status(200).json(purchase);
  } else {
    res.status(404);
    throw new Error('Purchase not found');
  }
});

// @desc Update purchase by ID
// @route PUT /api/purchases/:id
// @access Private/Admin
const updatePurchase = asyncHandler(async (req, res) => {
  const { product, supplier, quantity, price } = req.body;

  const purchase = await Purchase.findById(req.params.id);

  if (!purchase) {
    res.status(404);
    throw new Error('Purchase not found');
  }

  const productExists = await Product.findById(product);
  const supplierExists = await Supplier.findById(supplier);

  if (!productExists || !supplierExists) {
    res.status(400);
    throw new Error('Invalid product or supplier');
  }

  // Revert the old quantity from the product stock
  const oldQuantity = purchase.quantity;
  productExists.stock -= oldQuantity;

  // Update the purchase details
  purchase.product = product;
  purchase.supplier = supplier;
  purchase.quantity = quantity;
  purchase.price = price;
  purchase.totalPrice = quantity * price;

  const updatedPurchase = await purchase.save();

  // Update the product stock with the new quantity
  productExists.stock += quantity;
  await productExists.save();

  res.status(200).json(updatedPurchase);
});



// @desc Delete purchase by ID
// @route DELETE /api/purchases/:id
// @access Private/Admin
const deletePurchase = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await Purchase.findByIdAndDelete(id);
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }

    // Revert the quantity from the product stock
    const productExists = await Product.findById(purchase.product);
    if (productExists) {
      productExists.stock -= purchase.quantity;
      await productExists.save();
    }

    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { createPurchase, getPurchases, getPurchaseById, updatePurchase, deletePurchase };
