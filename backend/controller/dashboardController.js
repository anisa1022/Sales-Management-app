// controllers/dashboardController.js
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
import Purchase from '../models/purchaseModel.js';
import Supplier from '../models/supplierModel.js';
import User from '../models/userModel.js';
import Sale from '../models/saleModel.js';
import Customer from '../models/customerModel.js'
const getProductCount = asyncHandler(async (req, res) => {
  const count = await Product.countDocuments();
  res.json(count);
});

const getPurchaseCount = asyncHandler(async (req, res) => {
  const count = await Purchase.countDocuments();
  res.json(count);
});

const getSupplierCount = asyncHandler(async (req, res) => {
  const count = await Supplier.countDocuments();
  res.json(count);
});

const getUserCount = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.json(count);
});

const getSaleCount = asyncHandler(async (req, res) => {
  const count = await Sale.countDocuments();
  res.json(count);
});
const getCustomerCount = asyncHandler(async (req, res) => {
  const count = await Customer.countDocuments();
  res.json(count);
});

export { getProductCount, getPurchaseCount, getSupplierCount, getUserCount ,getSaleCount , getCustomerCount};
