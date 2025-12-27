// Cart.jsx
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const navigate = useNavigate();

  // ✅ Logged-in user
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 📅 Date formatter
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ✅ Fetch cart items (LATEST FIRST)
  useEffect(() => {
    if (!userId) return;

    const fetchCart = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/backend/cart/${userId}`
        );
        const data = await res.json();

        // 🔥 Sort by latest added first
        const sortedData = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setCartItems(sortedData);
      } catch (err) {
        console.error("Cart fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId]);

  // ❌ Remove item
  const handleRemove = async (id) => {
    try {
      await fetch(`http://localhost:3000/backend/cart/${id}`, {
        method: "DELETE",
      });

      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Failed to remove item:", err);
    }
  };

  // 🔢 Update quantity (frontend only)
  const handleQuantityChange = (id, value) => {
    const quantity = Math.max(1, Number(value));

    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity } : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  // 🚫 Not logged in
  if (!currentUser) {
    return (
      <p className="text-center mt-20 text-lg">
        Please login to view your cart 🛒
      </p>
    );
  }

  // ⏳ Loading
  if (loading) {
    return <p className="text-center mt-20">Loading cart...</p>;
  }

  return (
    <div className="min-h-screen text-center  mb-12 p-6">
      <h1 className="text-4xl font-extrabold text-white mb-8 " style={{ letterSpacing: "1.5em" }}>
        MY CART
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">
          Your cart is empty 🛒
        </p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* 🛍 Cart Items */}
          <div className="flex-1 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between bg-white p-4 rounded-xl shadow"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <div>
                    <h3 className="font-bold">{item.name}</h3>

                    {/* 📅 Added Date */}
                    {item.createdAt && (
                      <p className="text-xs text-gray-400 mb-1">
                        Added on: {formatDate(item.createdAt)}
                      </p>
                    )}

                    <p>LKR {item.price}</p>
                    <p>Size: {item.size}</p>

                    <div className="flex items-center gap-2">
                      Color:
                      <span
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, e.target.value)
                    }
                    className="w-16 border rounded text-center"
                  />

                  <p className="font-semibold">
                    LKR {item.price * item.quantity}
                  </p>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="text-red-600"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 📦 Summary */}
          <div className="w-full lg:w-64 bg-white p-6 rounded-xl shadow">
            <h3 className="font-semibold mb-4">Summary</h3>

            <div className="flex justify-between mb-2">
              <span>Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>LKR {totalPrice}</span>
            </div>

            <button className="mt-4 w-full bg-pink-400 hover:bg-pink-500 py-2 rounded-xl">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
