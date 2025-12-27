// HCategories.jsx
import React from "react";
import CAW1Image from "../assets/CAW1.jpg";

const hcategories = [
  {
    id: 1,
    title: "Casual Wears",
    description:
      "Step into comfort and style with our casual wears collection! Perfect for everyday outings, relaxed gatherings, or simply lounging at home.",
    image: CAW1Image,
  },
  {
    id: 2,
    title: "Tops & Pants",
    description:
      "Discover the perfect pairing with our stylish tops and pants collection! Mix and match for work, play, or anything in between.",
    image: CAW1Image,
  },
  {
    id: 3,
    title: "Formal Wears",
    description:
      "Dress to impress with our formal wear collection! From elegant suits and crisp shirts to classy dresses for special occasions.",
    image: CAW1Image,
  },
  {
    id: 4,
    title: "Accessories",
    description:
      "Complete your look with our stylish accessories! From belts and bags to chic jewelry and trendy hats.",
    image: CAW1Image,
  },
];

export default function HCategories() {
  return (
    <div className="py-12 px-6">
      {/* Heading Section */}
      <div className="text-center mb-10">
        <h1
          className="text-2xl font-bold text-black"
          style={{ letterSpacing: "0.5em" }}
        >
          CATEGORIES
        </h1>
        <p className="text-lg text-gray-700 mt-4">
          Step into Style, Discover the Pieces that Define You...
        </p>
      </div>

      {/* Grid Layout Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6  justify-items-center">
        {hcategories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-[250px]"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="w-full  object-fill rounded-t-lg"
            />
            <div className="p-4 flex flex-col">
              <h2 className="text-lg font-semibold text-black">{cat.title}</h2>
              <p className="text-gray-600 mt-1 text-sm line-clamp-3">
                {cat.description}
              </p>
              <button className="mt-3 bg-pink-600 text-white py-1.5 px-4 rounded-full hover:bg-pink-700 transition-colors duration-300 text-sm">
                Go To →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
