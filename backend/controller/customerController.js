import asyncHandler from 'express-async-handler';
import Customer from '../models/customerModel.js';

// @desc Create a new customer
// @route POST /api/customers
// @access Private/Admin
const createCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone, address } = req.body;

  const customer = new Customer({
    name,
    email,
    phone,
    address,
  });

  const createdCustomer = await customer.save();
  res.status(201).json(createdCustomer);
});

// @desc Get all customers
// @route GET /api/customers
// @access Private/Admin
const getCustomers = asyncHandler(async (req, res) => {
  const customers = await Customer.find({});
  res.status(200).json(customers);
});

// @desc Get customer by ID
// @route GET /api/customers/:id
// @access Private/Admin
const getCustomerById = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (customer) {
    res.status(200).json(customer);
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc Update customer by ID
// @route PUT /api/customers/:id
// @access Private/Admin
const updateCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone, address } = req.body;

  const customer = await Customer.findById(req.params.id);

  if (customer) {
    customer.name = name;
    customer.email = email;
    customer.phone = phone;
    customer.address = address;

    const updatedCustomer = await customer.save();
    res.status(200).json(updatedCustomer);
  } else {
    res.status(404);
    throw new Error('Customer not found');
  }
});

// @desc Delete customer by ID
// @route DELETE /api/customers/:id
// @access Private/Admin
const deleteCustomer = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }
    res.status(200).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { createCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer };
