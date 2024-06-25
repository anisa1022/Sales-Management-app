import Sale from '../models/saleModel.js';
import Product from '../models/productModel.js';
import Customer from '../models/customerModel.js';

// @desc    Create a new sale
// @route   POST /api/sales
// @access  Public
export const createSale = async (req, res) => {
  const { productName, customerName, quantity, totalPrice } = req.body;

  try {
    // Find the product by name
    const product = await Product.findOne({ name: productName });
    // Find the customer by name
    const customer = await Customer.findOne({ name: customerName });

    // If either the product or customer does not exist, return a 404 error
    if (!product || !customer) {
      return res.status(404).json({ message: 'Product or Customer not found' });
    }

    // Create a new Sale document with the found product and customer IDs
    const newSale = new Sale({
      product: product._id, // Reference to the product ID
      customer: customer._id, // Reference to the customer ID
      quantity,
      totalPrice
    });

    // Save the Sale document to the database
    const savedSale = await newSale.save();

    // Return the newly created sale with a 201 status code
    res.status(201).json(savedSale);
  } catch (error) {
    // If any error occurs, return a 500 error with a message
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Get all sales
// @route   GET /api/sales
// @access  Public
export const getSales = async (req, res) => {
  try {
    const sales = await Sale.find().populate('product').populate('customer');
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Get a single sale by ID
// @route   GET /api/sales/:id
// @access  Public
export const getSaleById = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate('product').populate('customer');

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    res.status(200).json(sale);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Update a sale
// @route   PUT /api/sales/:id
// @access  Public
export const updateSale = async (req, res) => {
  const { productName, customerName, quantity, totalPrice } = req.body;

  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    if (productName) {
      const product = await Product.findOne({ name: productName });
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      sale.product = product._id;
    }

    if (customerName) {
      const customer = await Customer.findOne({ name: customerName });
      if (!customer) {
        return res.status(404).json({ message: 'Customer not found' });
      }
      sale.customer = customer._id;
    }

    if (quantity) sale.quantity = quantity;
    if (totalPrice) sale.totalPrice = totalPrice;

    const updatedSale = await sale.save();
    res.status(200).json(updatedSale);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// @desc    Delete a sale
// @route   DELETE /api/sales/:id
// @access  Public
export const deleteSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);

    if (!sale) {
      return res.status(404).json({ message: 'Sale not found' });
    }

    await sale.remove();
    res.status(200).json({ message: 'Sale removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
