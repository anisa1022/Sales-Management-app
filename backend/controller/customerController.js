import Customer from '../models/customerModel.js';

// @desc    Create a new customer
// @route   POST /api/customers
// @access  Public
const createCustomer = async (req , res)=>{
    
    try {
        const newCustomer = await Customer.create(req.body);
        res.status(201).json(newCustomer);
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public

const getCustomer = async (req , res) =>{
    try {
        const customers = await Customer.find();
        res.status(200).json(customers);
        
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
        
    }
};

// @desc    Get a single customer by ID
// @route   GET /api/customers/:id
// @access  Public

const getCustomerById = async(req, res)=>{
    try {
        const { id } = req.params
        const customer = await Customer.findById(id)
        if(!customer){
            return res.status(404).json({message:" Customer not found"})
        }
        res.status(200).json(customer);
        
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
        
    }
};

const updateCustomer = async (req, res)=>{
    const {name , email, phone ,address}=req.body ;
    try {
        const customer = await Customer.findById(req.params.id);
        if(!customer){
            return res.status(404).json({message:'customer not found'});

        }
        customer.name = name || customer.name;
        customer.email  = email || customer.email;
        customer.phone = phone || customer.phone;
        customer.address = address ||customer.address
        const updatedCustomer = await customer.save();
        res.status(200).json(updateCustomer);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Public

const deleteCustomer = async (req ,res )=>{
    try {
        const customer = await Customer.findById(res.params.id);
        if(!customer){
            return res.status(404).json({message:"customer not found"});
        }
        
        await customer.remove();
        res.status(200).json({message:"Customer removed"})
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

export {
    createCustomer,
    getCustomer,
    getCustomerById,
    updateCustomer,
    deleteCustomer
}