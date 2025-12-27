import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BNArrow from "../Components/BNArrow";

export default function PartyDreseses() {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const navigate = useNavigate();

  const categories = [
    { name: "Casual Wears", path: "/casualwears" },
    { name: "Tops & Pants", path: "/topspants" },
    { name: "Party Dresses", path: "/partydreseses" },
    { name: "Frocks", path: "/frocks" },
  ];

  // ✅ Fetch Party Dresses from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/backend/addproducts/Party%20Dresses"
        );
        const data = await res.json();

        // newest first
        setProducts(data.reverse());
      } catch (error) {
        console.error("Failed to fetch party dresses:", error);
      }
    };

    fetchProducts();
  }, []);

  const currentIndex = categories.findIndex(
    (cat) => cat.path === "/partydreseses"
  );

  const goNext = () => {
    navigate(categories[(currentIndex + 1) % categories.length].path);
    window.scrollTo(0, 0);
  };

  const goBack = () => {
    navigate(
      categories[
        (currentIndex - 1 + categories.length) % categories.length
      ].path
    );
    window.scrollTo(0, 0);
  };

  const handleProductClick = (product) => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <div className="p-12 relative">
      <BNArrow onBack={goBack} onNext={goNext} title="PARTY DRESSES" />

      <p className="text-center text-lg text-white mb-12">
        Make every moment a celebration of you — your style, your confidence,
        and the beauty that radiates from within.
      </p>

      {/* Products Grid */}
      <div className="grid gap-16 pb-10 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product._id}
            onClick={() => handleProductClick(product)}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={`http://localhost:3000/uploads/${product.mainImage}`}
              alt={product.name}
              className="w-full h-[600px] object-cover"
            />

            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 mt-2 clamp-2">
                {product.description}
              </p>
              <p className="text-pink-500 font-bold mt-3">
                LKR {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ See More */}
      {visibleCount < products.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount(visibleCount + 6)}
            className="px-8 py-3 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
          >
            See More
          </button>
        </div>
      )}
    </div>
  );
}
