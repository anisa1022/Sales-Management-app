import express from 'express';
const router = express.Router();
import { authUser, registerUser,
    logoutUser,
    getUserProfile,
    updateUser,
    deleteUser,
    getAllUsers,
    getUserById} from '../controller/userController.js'
import { protect } from '../middleware/authMiddleware.js';
router.post('/',  registerUser);
router.post('/auth', authUser);
router.post('/logout', logoutUser);
router.get('/profile',protect, getUserProfile);

router.route('/')
    .get(protect, getAllUsers); // Get all users 

router.route('/:id')
    .get(protect, getUserById) // Get user by ID 
    .put(protect,  updateUser) // Update user by ID 
    .delete(protect,  deleteUser); // Delete user by ID 

  


export default router;


