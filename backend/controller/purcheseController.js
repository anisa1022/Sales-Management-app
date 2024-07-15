import asyncHandler from 'express-async-handler';
import Purchase from '../models/purchaseModel.js';
import Product from '../models/productModel.js';
import Supplier from '../models/supplierModel.js';

// @desc Create a new purchase
// @route POST /api/purchases
// @access Private/Admin
const createPurchase = asyncHandler(async (req, res) => {
  const { product, supplier, quantity, totalPrice } = req.body;

  const productExists = await Product.findById(product);
  const supplierExists = await Supplier.findById(supplier);

  if (!productExists || !supplierExists) {
    res.status(400);
    throw new Error('Invalid product or supplier');
  }

  const purchase = new Purchase({
    product,
    supplier,
    quantity,
    totalPrice,
  });

  const createdPurchase = await purchase.save();
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

// @desc Delete purchase by ID
// @route DELETE /api/purchases/:id
// @access Private/Admin
const deletePurchase = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);

  if (purchase) {
    await purchase.remove();
    res.status(200).json({ message: 'Purchase removed' });
  } else {
    res.status(404);
    throw new Error('Purchase not found');
  }
});

export { createPurchase, getPurchases, getPurchaseById, deletePurchase };
