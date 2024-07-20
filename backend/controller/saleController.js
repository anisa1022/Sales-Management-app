import asyncHandler from 'express-async-handler';
import Sale from '../models/saleModel.js';
import Product from '../models/productModel.js';
import Customer from '../models/customerModel.js';

// @desc Create a new sale
// @route POST /api/sales
// @access Private/Admin
const createSale = asyncHandler(async (req, res) => {
  const { productName, customerName, quantity, price, totalPrice } = req.body;

  console.log('Received sale data:', req.body);

  // Validate received data
  if (!productName || !customerName || !quantity || !price || !totalPrice) {
    res.status(400);
    throw new Error('All fields are required');
  }


  const product = await Product.findById(productName);
  const customer = await Customer.findById(customerName);

  

  if (!product || !customer) {
    res.status(400);
    throw new Error('Invalid product or customer');
  }

  if (product.stock < quantity) {
    res.status(400);
    throw new Error('Not enough stock available');
  }

  const sale = new Sale({
    product: product._id,
    customer: customer._id,
    quantity,
    price,
    totalPrice,
  });

  const createdSale = await sale.save();

  // Subtract the sold quantity from the product stock
  product.stock =Number(product.stock)- Number(quantity);
  await product.save();

  res.status(201).json(createdSale);
});



// @desc Get all sales
// @route GET /api/sales
// @access Private/Admin
const getSales = asyncHandler(async (req, res) => {
  const sales = await Sale.find({}).populate('product customer');
  res.status(200).json(sales);
});

// @desc Get sale by ID
// @route GET /api/sales/:id
// @access Private/Admin
const getSaleById = asyncHandler(async (req, res) => {
  const sale = await Sale.findById(req.params.id).populate('product customer');

  if (sale) {
    res.status(200).json(sale);
  } else {
    res.status(404);
    throw new Error('Sale not found');
  }
});

// @desc Update sale by ID
// @route PUT /api/sales/:id
// @access Private/Admin
const updateSale = asyncHandler(async (req, res) => {
  const { productName, customerName, quantity, totalPrice } = req.body;

  const sale = await Sale.findById(req.params.id);

  if (!sale) {
    res.status(404);
    throw new Error('Sale not found');
  }

  const product = await Product.findOne({ name: productName });
  const customer = await Customer.findOne({ name: customerName });

  if (!product || !customer) {
    res.status(400);
    throw new Error('Invalid product or customer');
  }

  if (product.stock + sale.quantity < quantity) {
    res.status(400);
    throw new Error('Not enough stock available');
  }

  // Adjust the product stock
  product.stock += sale.quantity; // Revert the original sale quantity
  product.stock -= quantity; // Subtract the new quantity

  sale.product = product._id;
  sale.customer = customer._id;
  sale.quantity = quantity;
  sale.totalPrice = totalPrice;

  const updatedSale = await sale.save();
  await product.save();

  res.status(200).json(updatedSale);
});

// @desc Delete sale by ID
// @route DELETE /api/sales/:id
// @access Private/Admin
const deleteSale = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const sale = await Sale.findByIdAndDelete(id);
    if (!sale) {
      return res.status(404).json({ message: "Sale not found" });
    }

    // Revert the product stock
    const product = await Product.findById(sale.product);
    if (product) {
      product.stock += sale.quantity;
      await product.save();
    }

    res.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc Get sales data for chart
// @route GET /api/sales/chart
// @access Private
const getSalesDataForChart = asyncHandler(async (req, res) => {
  try {
    const salesData = await Sale.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    res.json(salesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { createSale, getSales, getSaleById, updateSale, deleteSale , getSalesDataForChart };
