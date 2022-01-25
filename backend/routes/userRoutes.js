import express from "express";
import {
 authUser,
 getUserProfile,
 registerUser,
 updateUserProfile,
 deleteUser,
 getUsers,
 userDelete,
 getUserById,
 updateUser
} from '../controllers/userController.js';
import {protect,admin} from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/login',authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUser);

router
    .route('/:id')
    .delete(protect,admin,userDelete)
    .get(protect,admin,getUserById)
    .put(protect,admin,updateUser);


export default router;
