import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProductDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const product = state?.product;

  const [selectedImage, setSelectedImage] = useState(
    product
      ? `http://localhost:3000/uploads/${product.mainImage}`
      : ""
  );

  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (!product) navigate("/");
    window.scrollTo(0, 0);
  }, [product, navigate]);

  if (!product) return null;

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = [
    "bg-green-700",
    "bg-red-500",
    "bg-purple-600",
    "bg-gray-800",
    "bg-blue-700",
    "bg-pink-500",
  ];

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert("Please select size & color");
      return;
    }

    if (!currentUser) {
      alert("Please login first");
      return;
    }

    const cartItem = {
      productId: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      color: selectedColor, // HEX color
      image: `http://localhost:3000/uploads/${product.mainImage}`,
      quantity: 1,
      userId: currentUser._id, // ✅ REAL USER ID
    };

    try {
      const res = await fetch("http://localhost:3000/backend/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cartItem),
      });

      if (!res.ok) throw new Error("Failed");
      alert("Added to cart 🛒");
    } catch (err) {
      alert("Error adding to cart");
    }
  };


  return (
    <div className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        {/* ================= LEFT : IMAGES ================= */}
        <div className="flex gap-4">

          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {[product.mainImage, ...(product.images || [])].map((img, i) => (
              <div
                key={i}
                onClick={() =>
                  setSelectedImage(`http://localhost:3000/uploads/${img}`)
                }
                className={`w-24 aspect-[3/4] rounded-lg overflow-hidden cursor-pointer border-2
                  ${
                    selectedImage === `http://localhost:3000/uploads/${img}`
                      ? "border-pink-500"
                      : "border-transparent"
                  }`}
              >
                <img
                  src={`http://localhost:3000/uploads/${img}`}
                  alt="thumb"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover transition duration-300 hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* ================= RIGHT : DETAILS ================= */}
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-2xl text-pink-500 font-semibold mt-3">
            LKR {product.price}
          </p>

          <p className="text-gray-600 mt-6 text-justify">
            {product.description}
          </p>

          {/* Size */}
          <div className="mt-8">
            <p className="font-semibold mb-3">Select Size</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-1 rounded-full border
                    ${
                      selectedSize === size
                        ? "bg-pink-500 text-white"
                        : "hover:bg-pink-500 hover:text-white"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color */}
          <div className="mt-8">
            <p className="font-semibold mb-3">Select Color</p>
            <div className="flex gap-3">
              {colors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${color}
                    ${
                      selectedColor === color
                        ? "scale-110 border-pink-500"
                        : "border-gray-300 hover:scale-110"
                    }`}
                />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-10 flex-wrap">
            <button
              onClick={handleAddToCart}
              className="bg-pink-500 text-white px-8 py-3 rounded-full hover:bg-pink-600 transition"
            >
              Add to Cart
            </button>

            <button className="bg-orange-500 text-white px-8 py-3 rounded-full hover:bg-orange-600 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
