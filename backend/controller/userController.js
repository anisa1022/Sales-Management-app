import asyncHandler from "express-async-handler";
import generateToken from "../middleware/generateToken.js";
import  {User, validate } from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import Joi from "joi";
//@dec Auth user/set token
//route POST /api/users/auth
//@access Public

const LogValidate = (data)=>{
    const schema = Joi.object({
        email:Joi.string().required().label("Email"),
        password:Joi.string().required().label("Password")
    })
    return schema.validate(data);
}

const authUser = asyncHandler(async (req, res) => {
    try {
        const { error } = LogValidate(req.body);
        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        
        const user = await User.findOne({ email: req.body.email });
        console.log("User found:", user); // Logging the found user
        if (!user) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(401).send({ message: "Invalid Email or Password" });
        }
        
        const token = user.generateAuthToken();
        res.status(200).send({ data: token, message: "Logged in successfully" });
    } catch (error) {
        console.error("Error during authentication:", error); // Logging any caught errors
        res.status(500).send({ message: "Internal Server Error" });
    }
});


//@dec  Register a new  user
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async(req , res)=>{
    try {
        const {error} =validate(req.body);
        if(error)
            return res.status(400).send({message:error.details[0].message});

        const existingUser = await User.findOne({email:req.body.email});
        if(existingUser)
            return res.status(409).send({message:"User with givin email already exists"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password , salt);

        await new User({...req.body, password:hashPassword}).save();
        res.status(201).send({message:"User created successfully"})
    } catch (error) {
        res.status(500).send({message:"internal Server Error"});
    }
    
       
});

//@dec  Logout  user
//route POST /api/users/logout
//@access Public
const logoutUser = asyncHandler(async(req , res)=>{
    res.cookie('jwt', '', { httpOnly : true ,expires: new Date(0)})
    res.status(200).json({message: 'User logged out'});
});

//@dec  Get user profile
//route GET /api/users/profile
//@access private
const getUserProfile = asyncHandler(async(req , res)=>{
    const user ={
        _id : req.user._id,
        name: req.user.name,
        email: req.user.email
    }
    res.status(200).json({user})   
});

//@dec  update user profile
//route PUT /api/users/profile
//@access private
const updateUserProfile = asyncHandler(async(req , res)=>{
    const user = await User.findById(req.user._id);

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            name : updatedUser.name,
            email: updatedUser.email
        });
    }else{
        res.status(404).send({ message: 'User not Found' });
    }

});

// @desc Get all users
// @route GET /api/users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        res.status(200).json(user);
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

// @desc Delete user by ID
// @route DELETE /api/users/:id
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.status(200).json({ message: "User removed" });
    } else {
        res.status(404).send({ message: "User not found" });
    }
});

export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getAllUsers,
    getUserById,
    deleteUser
};