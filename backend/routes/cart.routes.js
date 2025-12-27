import express from "express";
import {
  addToCart,
  getCartItems,
  removeCartItem,
  clearCart
} from "../controllers/cart.controller.js";

const router = express.Router();

// ➕ Add item to cart
router.post("/", addToCart);

// 🛒 Get all cart items for a user
router.get("/:userId", getCartItems);

// ❌ Remove a single cart item
router.delete("/:id", removeCartItem);

// 🧹 Clear all items for a user
router.delete("/clear/:userId", clearCart);

export default router;
