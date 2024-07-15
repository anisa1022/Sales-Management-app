import asyncHandler from 'express-async-handler';
import Supplier from '../models/supplierModel.js';

// @desc Create a new supplier
// @route POST /api/suppliers
// @access Private/Admin
const createSupplier = asyncHandler(async (req, res) => {
  const { name, contact, email, address } = req.body;

  const supplierExists = await Supplier.findOne({ email });

  if (supplierExists) {
    res.status(400);
    throw new Error('Supplier already exists');
  }

  const supplier = new Supplier({
    name,
    contact,
    email,
    address,
  });

  const createdSupplier = await supplier.save();
  res.status(201).json(createdSupplier);
});

// @desc Get all suppliers
// @route GET /api/suppliers
// @access Private/Admin
const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find({});
  res.status(200).json(suppliers);
});

// @desc Get supplier by ID
// @route GET /api/suppliers/:id
// @access Private/Admin
const getSupplierById = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    res.status(200).json(supplier);
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
});

// @desc Delete supplier by ID
// @route DELETE /api/suppliers/:id
// @access Private/Admin
const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (supplier) {
    await supplier.remove();
    res.status(200).json({ message: 'Supplier removed' });
  } else {
    res.status(404);
    throw new Error('Supplier not found');
  }
});

export { createSupplier, getSuppliers, getSupplierById, deleteSupplier };
