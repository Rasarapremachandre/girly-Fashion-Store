import React, { useState } from "react";
import AllUsers from "../Components/AllUsers";
import AddProduct from "../Components/AddProducts";
import Product from "../Components/product";
import SalesProducts from "../Components/SalesProducts";
import DashboardGraphs from "../Components/DashboardGraphs";
import Admin from "../Components/Admin";
import Products from "../Components/product";


export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("admin");

  const tabs = [
    { key: "admin", label: "Admin" },
    { key: "users", label: "All Users" },
    { key: "add", label: "Add Product" },
    { key: "product", label: "All Products" },
    { key: "sales", label: "Sales Products" },

  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Heading */}
        <div className="text-center py-6">
          <h1
            className="text-4xl font-extrabold text-white mb-4"
            style={{ letterSpacing: "1.5em" }}
          >
            ADMIN DASHBOARD
          </h1>

        </div>

        {/* Header Tabs (Horizontal Nav) */}
<nav
  className="bg-gradient-to-r from-[#b169e6] via-[#d94ea2] to-[#db377e] shadow-lg flex justify-center space-x-6 py-4"
  style={{
    borderRadius: "35px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
  }}
>
  {tabs.map((tab) => (
    <button
      key={tab.key}
      className={`px-6 py-2 rounded-full font-semibold backdrop-blur-md transition-all duration-300 ${
        activeTab === tab.key
          ? "bg-white text-[#db377e] shadow-md scale-105 border border-[#db377e]"
          : "text-white hover:bg-white hover:text-[#db377e] hover:shadow-md"
      }`}
      onClick={() => setActiveTab(tab.key)}
    >
      {tab.label}
    </button>
  ))}
</nav>


        {/* Tab Content */}
        <div className="mt-6">
         {activeTab === "admin" && <Admin />}
          {activeTab === "users" && <AllUsers />}
          {activeTab === "add" && <AddProduct />}
          {activeTab === "product" && <Products />}
          {activeTab === "sales" && <SalesProducts />}

        </div>
      </main>
    </div>
  );
}
