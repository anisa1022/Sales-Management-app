import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from '../models/userModel.js';

//@dec Auth user/set token
//route POST /api/users/auth
//@access Public

const authUser = asyncHandler(async(req , res)=>{
    const {email ,password} = req.body
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        generateToken(res,user._id);
        res.status(201).json({
            _id : user._id,
            name: user.name,
            email: user.email
        })
    }
    else{
        res.status(401);
        throw new Error('invalid email or password');
    } 
});

//@dec  Register a new  user
//route POST /api/users
//@access Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, role } = req.body;
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }
  
    const user = await User.create({
      name,
      email,
      password,
      role,
    });
  
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    } else {
      res.status(400);
      throw new Error('Invalid user data');
    }
  });

//@dec  Logout  user
//route POST /api/users/logout
//@access Public
const logoutUser = asyncHandler(async(req , res)=>{
    res.cookie('jwt', '', {
        httpOnly : true ,
        expires: new Date(0)
    })
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
    res.status(200).json(user)   
});

//@dec Update user 
//route PUT /api/users/:id
//@access Private/
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
  
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.role = req.body.role || user.role;
      if (req.body.password) {
        user.password = req.body.password;
      }
  
      const updatedUser = await user.save();
  
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  });
//@dec Delete user
//route DELETE /api/users/:id
//@access Private/
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await user.remove();
        res.json({ message: 'User removed' });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

//@dec Get all users (Admin only)
//route GET /api/users
//@access Private/Admin
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users);
});

//@dec Get user by ID (Admin only)
//route GET /api/users/:id
//@access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');

    if (user) {
        res.json(user);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

export { 
    authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById
};