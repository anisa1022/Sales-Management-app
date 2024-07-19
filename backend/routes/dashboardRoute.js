import express from 'express';
import { getProductCount, getPurchaseCount, getSupplierCount, getUserCount , getCustomerCount, getSaleCount} from '../controller/dashboardController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/productCount',protect, getProductCount);
router.get('/purchaseCount',protect, getPurchaseCount);
router.get('/supplierCount',protect, getSupplierCount);
router.get('/userCount',protect, getUserCount);
router.get('/customerCount',protect, getCustomerCount);
router.get('/saleCount',protect, getSaleCount);

export default router;