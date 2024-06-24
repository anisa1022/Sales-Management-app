import express from 'express';
const router = express.Router();
import {createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer } from '../controller/customerController.js';




router.post('/',createCustomer)
router.get('/',getCustomer);


router.get('/:id',getCustomerById)
router.put('/:id',updateCustomer)
router.delete('/:id',deleteCustomer);

export default router;

