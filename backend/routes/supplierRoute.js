import express from 'express';
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  deleteSupplier,
} from '../controllers/supplierController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createSupplier)
  .get(protect, admin, getSuppliers);

router.route('/:id')
  .get(protect, admin, getSupplierById)
  .delete(protect, admin, deleteSupplier);

export default router;
