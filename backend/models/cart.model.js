import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  userId: { type: String, required: true }, // You can replace this with JWT user ID later
},
  {
    timestamps: true, // ✅ THIS LINE
  }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
