import React, { useEffect, useState } from "react";
import shoptheImage from "../assets/shopthe.png";
import landingImage from "../assets/landing image.png";
import banner1Image from "../assets/banner1.png";
import banner2Image from "../assets/banner2.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/backend/products");

      const now = new Date();
      const twelveHoursAgo = new Date(
        now.getTime() - 5 * 24 * 60 * 60 * 1000
      );

      // ✅ Only products added within last 12 hours
      const filteredProducts = res.data.filter(
        (product) => new Date(product.createdAt) >= twelveHoursAgo
      );

      // newest first
      const sortedProducts = filteredProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setProducts(sortedProducts);
    } catch (error) {
      console.error("Failed to load products", error);
    }
  };

  fetchProducts();
}, []);


  return (
    <div className="w-full py-6">

      {/* 🌸 Hero Section */}
      <div className="relative w-full max-w-7xl mx-auto h-[680px] overflow-hidden rounded-xl">
        <img
          src={landingImage}
          alt="Landing"
          className="w-full h-full object-cover"
        />
      </div>

      <br /><br /><br />

      {/* 🌟 DOUBLE BANNER */}
      <div className="max-w-7xl mx-auto px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <div
            onClick={() => navigate("/catagories")}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
          >
            <img
              src={banner2Image}
              alt="Everyday Glam"
              className="w-full h-72 object-cover transform transition group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

          <div
            onClick={() => navigate("/catagories")}
            className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-lg"
          >
            <img
              src={banner1Image}
              alt="Trendy Looks"
              className="w-full h-72 object-cover transform transition group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>

        </div>
      </div>

      {/* 🆕 New Arrivals */}
      <div className="max-w-7xl mx-auto p-8">
        <h4 className="font-bold text-3xl mb-10 text-center">
          New Arrivals...
        </h4>

        {products.length === 0 ? (
          <p className="text-center text-gray-500">
            No products available
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {products.slice(0, visibleCount).map((item) => (
                <div
                  key={item._id}
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="relative rounded-xl overflow-hidden cursor-pointer
                             transform transition duration-300 hover:scale-105
                             shadow-lg group"
                >
                  <img
                    src={`http://localhost:3000/uploads/${item.mainImage}`}
                    alt={item.name}
                    className="w-full h-72 object-cover"
                  />

                  <div className="absolute bottom-0 w-full bg-black/40
                                  py-2 flex justify-center items-center">
                    <h3 className="text-white text-lg font-bold text-center px-2">
                      {item.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ SEE MORE */}
            {visibleCount < products.length && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount(visibleCount + 6)}
                  className="px-10 py-3 rounded-full bg-black text-white
                             font-semibold hover:bg-gray-900 transition"
                >
                  See More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      <br /><br /><br />

      {/* 🛍️ Shop the Collection */}
      <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full
                      items-center md:items-start px-8 md:px-16 py-16 gap-8">

        <div className="relative w-full md:w-1/2 rounded-2xl overflow-hidden">
          <img
            src={shoptheImage}
            alt="Shop the Collection"
            className="w-full h-full object-fill"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start">
          <h2 className="text-4xl md:text-6xl font-extrabold">
            Shop the
          </h2>
          <h2 className="text-4xl mt-4 md:text-6xl font-extrabold">
            Collection
          </h2>

          <p className="mt-7 text-sm md:text-base max-w-md font-medium text-justify">
            Fresh finds, trendsetting pieces & girly vibes.
          </p>

          <button
            onClick={() => {
              navigate("/catagories");
              window.scrollTo(0, 0);
            }}
            className="mt-4 bg-black text-white px-6 py-3 rounded-full
                       font-semibold hover:bg-gray-900 transition"
          >
            Go To →
          </button>
        </div>
      </div>
    </div>
  );
}
