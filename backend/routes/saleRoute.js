import express from 'express';
import {
  createSale,
  getSales,
  getSaleById,
  updateSale,
  deleteSale,
  getSalesDataForChart
} from '../controller/saleController.js';

const router = express.Router();


router.post('/',createSale)
router.get('/',getSales);


router.get('/:id',getSaleById)
router.put('/:id',updateSale)
router.delete('/:id',deleteSale);
router.get('/chart',getSalesDataForChart)

export default router;
