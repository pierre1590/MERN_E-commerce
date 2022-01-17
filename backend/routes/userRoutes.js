import express from "express";
import {
 authUser,
 getUserProfile,
 registerUser,
 updateUserProfile,
 deleteUser
} from '../controllers/userController.js';
import {protect} from '../middleware/authMiddleware.js';


const router = express.Router();

router.route('/').post(registerUser).get(protect);
router.post('/login',authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile)
  .delete(protect, deleteUser);

export default router;
