import express from 'express';
import {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
} from '../controllers/purchaseController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, admin, createPurchase)
  .get(protect, admin, getPurchases);

router.route('/:id')
  .get(protect, admin, getPurchaseById)
  .delete(protect, admin, deletePurchase);

export default router;
