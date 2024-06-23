import express from 'express';
const UserRouter = express.Router();
import { authUser, registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile} from '../controllers/userController.js'
// import { protect } from '../middleware/authMiddleware.js';
UserRouter.post('/', registerUser);
UserRouter.post('/auth', authUser);
UserRouter.post('/logout', logoutUser);
UserRouter.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
 
export default UserRouter;


