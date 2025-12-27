import React from "react";
import cawearsImage from "../assets/cawears.png";
import CAW1Image from "../assets/CAW1.jpg";
import tpImage from "../assets/tp.png";
import pdreImage from "../assets/pdre.png";
import frocksImage from "../assets/frocks.png";
import { useNavigate } from "react-router-dom";

export default function Categories() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Casual Wears",
      description:
        "Step into comfort and style with our casual wears collection! Perfect for everyday outings, relaxed gatherings, or simply lounging at home.",
      image: cawearsImage,
      path: "/casualwears"
    },
    {
      title: "Tops & Pants",
      description:
        "Discover the perfect pairing with our stylish tops and pants collection! Versatile essentials for any wardrobe.",
      image: tpImage,
      path: "/TopsPants"
    },
    {
      title: "Party Wear",
      description:
        "Make every occasion unforgettable with our glamorous party wear collection!",
      image: pdreImage,
      path: "/partydreseses"
    },
    {
      title: "Frocks",
      description:
        "Complete your look with our stunning accessories that add the perfect finishing touch.",
      image: frocksImage,
      path: "/frocks"
    }
  ];

  return (
    <div className="py-20">
      {/* Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-8 " style={{ letterSpacing: "1.5em" }}>
          CATEGORIES
        </h1>
        <p className="text-white mt-3">
          Step into Style, Discover the Pieces that Define You...
        </p>
      </div>

{/* Cards Grid */}
<div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 px-8">
  {categories.map((cat, index) => (
    <div
      key={index}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col"
    >
      {/* CARD IMAGE */}
      <img
        src={cat.image}
        alt={cat.title}
        className="w-full object-cover h-56"
      />

      {/* Card Content */}
      <div className="p-6 flex flex-col justify-between flex-1">
        <div>
          <h2 className="text-xl font-semibold text-black">{cat.title}</h2>
          <p className="text-gray-600 mt-2 text-sm">
            {cat.description}
          </p>
        </div>

        <button
          onClick={() => {
            navigate(cat.path.toLowerCase());
            window.scrollTo(0, 0);
          }}
          className="mt-6 group relative overflow-hidden rounded-full bg-gradient-to-r from-pink-500 to-pink-700 px-6 py-2 text-white font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            View More
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </span>
        </button>

      </div>
    </div>
  ))}
</div>



    </div>
  );
}
