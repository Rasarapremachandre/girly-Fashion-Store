import React, { useState } from "react";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    sizes: [],
    colors: [],
    mainImage: null,
    images: [],
  });

  const sizesOptions = ["S", "M", "L", "XL", "XXL"];
  const categories = ["Tops & Pants", "Frocks", "Party Dresses", "Casual Wears"];

  const handleChange = (e) =>
    setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSizeToggle = (size) => {
    setProduct({
      ...product,
      sizes: product.sizes.includes(size)
        ? product.sizes.filter((s) => s !== size)
        : [...product.sizes, size],
    });
  };

  const handleAddColor = (e) => {
    const newColor = e.target.value;
    if (!product.colors.includes(newColor)) {
      setProduct({
        ...product,
        colors: [...product.colors, newColor],
      });
    }
  };

  const removeColor = (color) => {
    setProduct({
      ...product,
      colors: product.colors.filter((c) => c !== color),
    });
  };

  const handleMainImageUpload = (e) =>
    setProduct({ ...product, mainImage: e.target.files[0] });

  const handleImagesUpload = (e) =>
    setProduct({ ...product, images: Array.from(e.target.files) });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("price", product.price);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("sizes", JSON.stringify(product.sizes));
    formData.append("colors", JSON.stringify(product.colors));

    if (product.mainImage) formData.append("mainImage", product.mainImage);
    product.images.forEach((img) => formData.append("images", img));

    try {
      const res = await fetch("http://localhost:3000/backend/addproducts", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add product");

      alert("✅ Product added successfully!");
      setProduct({
        name: "",
        price: "",
        description: "",
        category: "",
        sizes: [],
        colors: [],
        mainImage: null,
        images: [],
      });
    } catch (err) {
      alert("❌ Error: " + err.message);
    }
  };

  return (
    
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
         
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Product Info */}
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        {/* ✅ Price Input with LKR Label and No Spinner */}
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-gray-600 font-semibold">
            LKR
          </span>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            className="border p-2 rounded pl-14 w-full appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            required
          />
        </div>

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Sizes */}
        <div>
          <p className="font-semibold mb-2">Select Sizes:</p>
          <div className="flex gap-2 flex-wrap">
            {sizesOptions.map((size) => (
              <button
                type="button"
                key={size}
                className={`px-3 py-1 border rounded-full ${
                  product.sizes.includes(size)
                    ? "bg-pink-500 text-white"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => handleSizeToggle(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* ✅ Color Picker Section */}
        <div>
          <p className="font-semibold mb-2">Pick Colors:</p>
          <input
            type="color"
            onChange={handleAddColor}
            className="w-12 h-10 cursor-pointer border rounded"
          />
          <div className="flex gap-2 flex-wrap mt-3">
            {product.colors.map((color) => (
              <div
                key={color}
                className="relative w-8 h-8 rounded-full border shadow cursor-pointer"
                style={{ backgroundColor: color }}
              >
                <button
                  type="button"
                  className="absolute -top-1 -right-1 text-xs bg-white border rounded-full px-[2px]"
                  onClick={() => removeColor(color)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <p className="font-semibold mb-2">Upload Main Image:</p>
          <input
            type="file"
            accept="image/*"
            onChange={handleMainImageUpload}
            className="border p-1 rounded"
          />
        </div>

        <div>
          <p className="font-semibold mb-2">Upload Additional Images:</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesUpload}
            disabled={product.images.length >= 3}
            className="border p-1 rounded"
          />
          <p className="font-sans mb-4">Only add 3 Images</p>
        

        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-pink-600 text-white py-2 rounded hover:bg-pink-700 mt-4"
        >
          Add Product
        </button>
      </form>
    </div>
  );
}
