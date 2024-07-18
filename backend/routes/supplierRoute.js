import express from 'express';
import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  deleteSupplier,
} from '../controller/supplierController.js';
import { protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect,  createSupplier)
  .get(protect,  getSuppliers);

router.route('/:id')
  .get(protect, getSupplierById)
  .delete(protect, deleteSupplier);

export default router;
