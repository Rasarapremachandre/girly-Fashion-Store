import CartItem from "../models/cart.model.js";

// ➕ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, name, price, size, color, image, quantity, userId } = req.body;

    if (!productId || !name || !price || !size || !color || !userId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if the item already exists in cart for this user (same product, size, and color)
    const existingItem = await CartItem.findOne({ productId, size, color, userId });

    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }

    // Otherwise, create new cart item
    const newItem = new CartItem({ productId, name, price, size, color, image, quantity, userId });
    await newItem.save();

    res.status(201).json(newItem);
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ message: err.message });
  }
};

// 🛒 Get all cart items for a user
export const getCartItems = async (req, res) => {
  try {
    const { userId } = req.params;
    const items = await CartItem.find({ userId });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Remove a single cart item
export const removeCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await CartItem.findByIdAndDelete(id);
    res.status(200).json({ message: "Item removed from cart" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🧹 Clear all items for a user (optional)
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.params;
    await CartItem.deleteMany({ userId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
