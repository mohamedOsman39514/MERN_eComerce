import express from "express";
import {
  authUser,
  getUserProfile,
  Register,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Register, Get All users by admin

router.route("/").post(Register).get(protect, admin, getUsers);

// login
router.route("/login").post(authUser);

// profile of user
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
