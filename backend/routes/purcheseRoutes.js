import express from 'express';
import {
  createPurchase,
  getPurchases,
  getPurchaseById,
  deletePurchase,
  updatePurchase
} from '../controller/purcheseController.js';
import { protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(protect, createPurchase)
  .get(protect,  getPurchases);

router.route('/:id')
  .get(protect,  getPurchaseById)
  .delete(protect,  deletePurchase)
  .put(protect, updatePurchase);

export default router;
