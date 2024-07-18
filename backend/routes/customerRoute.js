import express from 'express';
const router = express.Router();
import {createCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer } from '../controller/customerController.js';




router.post('/',createCustomer)
router.get('/',getCustomers);


router.get('/:id',getCustomerById)
router.put('/:id',updateCustomer)
router.delete('/:id',deleteCustomer);

export default router;

