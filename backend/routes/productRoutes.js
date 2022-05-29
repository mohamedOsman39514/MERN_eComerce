import express from "express";

import {
  getProductById,
  getProducts,
  deleteProduct,
  createProduct,
  updateProduct,
  createReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET All Product in HomeScreen
router.route("/").get(getProducts).post(protect, admin, createProduct);

// POST Review
router.route("/:id/review").post(protect, createReview);

// Top Products
router.route("/top").get(getTopProducts);

// GET Certain Product in ProductScreen
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

export default router;
