// Profile.jsx
import React, { useState } from "react";
import h2Image from "../assets/h2.jpg";
import t1Img from "../assets/t1.png"; // 👉 add any profile image

export default function Profile() {
  // 🔹 Later you can replace this with Redux / backend data
  const user = {
    name: "Hiruni Premachandre",
    email: "ughirunirasara@gmail.com",
  };

  const [orders] = useState([
    {
      id: 1,
      items: [
        { name: "Casual Wear", price: 1900, quantity: 1, image: h2Image },
        { name: "Formal Shirt", price: 1500, quantity: 2, image: h2Image },
      ],
      status: "Completed",
    },
    {
      id: 2,
      items: [{ name: "Jeans", price: 2000, quantity: 1, image: h2Image }],
      status: "Pending",
    },
  ]);

  return (
    <div className="min-h-screen p-6 font-sans py-12 ">

      {/* 🔥 PROFILE HEADER */}
      <div className="flex flex-col items-center mb-12">
        <img
          src={t1Img}
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-pink-400"
        />
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          {user.name}
        </h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* PAGE TITLE */}
      <header className="text-center mb-12">
        <h1
          className="text-3xl font-extrabold text-pink-600"
          style={{ letterSpacing: "0.5em" }}
        >
          MY PROFILE
        </h1>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* INFORMATION */}
        <div className="flex-1 bg-white rounded-xl shadow p-6">
          <h2 className="font-bold text-lg mb-4">Information</h2>

          <div className="mb-6">
            <h3 className="font-semibold text-sm mb-2">Contact Info</h3>
            <input
              type="email"
              placeholder="Email"
              defaultValue={user.email}
              className="w-full border rounded p-2 mb-3"
            />
            <input
              type="text"
              placeholder="Phone"
              className="w-full border rounded p-2"
            />
          </div>

          <div>
            <h3 className="font-semibold text-sm mb-2">Address</h3>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <input
                type="text"
                placeholder="First Name"
                className="border rounded p-2"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border rounded p-2"
              />
            </div>

            <input
              type="text"
              placeholder="State / Region"
              className="w-full border rounded p-2 mb-3"
            />
            <input
              type="text"
              placeholder="Address"
              className="w-full border rounded p-2 mb-3"
            />
            <input
              type="text"
              placeholder="City"
              className="w-full border rounded p-2 mb-3"
            />
          </div>

          <button className="mt-4 bg-pink-400 hover:bg-pink-500 text-black font-semibold px-6 py-2 rounded-xl shadow">
            Update Information
          </button>
        </div>

        {/* MY ORDERS */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-lg">My Orders</h2>
            <span className="text-sm font-medium text-gray-600">
              {orders.length} Orders
            </span>
          </div>

          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow p-4 space-y-3"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Order #{order.id}</h3>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-yellow-200 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.quantity} × LKR {item.price}
                          </p>
                        </div>
                      </div>
                      <p className="font-semibold">
                        LKR {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
