import asyncHandler from 'express-async-handler';
import Purchase from '../models/purchaseModel.js';
import Product from '../models/productModel.js';
import Supplier from '../models/supplierModel.js';

// @desc Create a new purchase
// @route POST /api/purchases
// @access Private/Admin
const createPurchase = asyncHandler(async (req, res) => {
  const { productName, supplierName, quantity, price, totalPrice } = req.body;

  console.log('Received purchase data:', req.body);

  // Validate received data
  if (!productName || !supplierName || !quantity || !price || !totalPrice) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const product = await Product.findById(productName);
  const supplier = await Supplier.findById(supplierName);

  if (!product || !supplier) {
    res.status(400);
    throw new Error('Invalid product or supplier');
  }

  const purchase = new Purchase({
    product: product._id,
    supplier: supplier._id,
    quantity,
    price,
    totalPrice,
  });

  const createdPurchase = await purchase.save();

  // Add the purchased quantity to the product stock
  product.stock = Number(product.stock) + Number(quantity);
  await product.save();

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
  productExists.stock += productExists.stock + quantity;
  await productExists.save();

  res.status(200).json(updatedPurchase);
});


// @desc Delete purchase by ID
// @route DELETE /api/purchases/:id
// @access Private/Admin
const deletePurchase = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const purchase = await Purchase.findById(id);

  if (purchase) {
    // Subtract the purchased quantity from the product stock
    const product = await Product.findById(purchase.product);
    if (product) {
      product.stock = Number(product.stock) - Number(purchase.quantity);
      await product.save();
    }
    await purchase.remove();
    res.status(200).json({ message: 'Purchase removed' });
  } else {
    res.status(404);
    throw new Error('Purchase not found');
  }
});

// @desc Get purchases data for chart
// @route GET /api/purchases/chart
// @access Private
const getPurchasesDataForChart = asyncHandler(async (req, res) => {
  try {
    const purchasesData = await Purchase.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalPurchases: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.json(purchasesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


export { createPurchase, getPurchases, getPurchaseById, updatePurchase, deletePurchase , getPurchasesDataForChart };
