import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);

  // 🔹 Edit modal states
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // 🔹 Filter state
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Frocks",
    "Party Dresses",
    "Casual Wears",
    "Tops & Pants",
  ];

  // ✅ Fetch products
  useEffect(() => {
    fetch("http://localhost:3000/backend/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(() => console.log("Products fetch failed"));
  }, []);

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(
        `http://localhost:3000/backend/products/${id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Delete failed");

      setProducts((prev) => prev.filter((item) => item._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  // ✅ Edit open
  const handleEditClick = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  // ✅ Update
  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/backend/products/${editProduct._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editProduct),
        }
      );

      const updated = await res.json();

      setProducts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );

      setShowModal(false);
      setEditProduct(null);
    } catch {
      alert("Update failed");
    }
  };

  // ✅ FILTERED PRODUCTS
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (p) =>
            p.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="p-10 relative">
      {/* Header */}
      <h2 className="text-4xl uppercase font-extrabold bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent mb-6">
        All Products
      </h2>

      {/* ✅ CATEGORY FILTER */}
      <div className="flex gap-3 mb-10 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition
              ${
                selectedCategory === cat
                  ? "bg-pink-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-pink-200"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden border hover:shadow-2xl transition"
            >
              <img
                src={`http://localhost:3000/uploads/${product.mainImage}`}
                alt={product.name}
                className="w-full h-72 object-cover"
              />

              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>

                <p className="text-sm text-gray-500">{product.category}</p>

                <p className="text-pink-600 font-bold text-lg mt-2">
                  LKR {product.price}
                </p>

                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => handleEditClick(product)}
                    className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No products found
          </p>
        )}
      </div>

      {/* ✅ EDIT MODAL */}
      {showModal && editProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white w-[420px] rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-bold mb-4 text-pink-600">
              Edit Product
            </h2>

            <input
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Name"
            />

            <input
              value={editProduct.price}
              type="number"
              onChange={(e) =>
                setEditProduct({ ...editProduct, price: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Price"
            />

            <input
              value={editProduct.category}
              onChange={(e) =>
                setEditProduct({ ...editProduct, category: e.target.value })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Category"
            />

            <textarea
              value={editProduct.description}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  description: e.target.value,
                })
              }
              className="w-full border p-2 rounded mb-3"
              placeholder="Description"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-pink-500 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
