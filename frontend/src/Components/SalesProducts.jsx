import React from "react";

const sales = [
  { id: 1, Categories: "Casual Wears", totalQuantity: 5, soldQuantity: 2, price: 9500 },
  { id: 2, Categories: "Party Dresses", totalQuantity: 2, soldQuantity: 2, price: 9500 },
  { id: 3, Categories: "Tops & Pants", totalQuantity: 10, soldQuantity: 5, price: 9500 },
  { id: 4, Categories: "Frocks", totalQuantity: 10, soldQuantity: 5, price: 9500 },
];

export default function SalesProducts() {
  return (
    <div className="p-6">
      <h2 className="text-4xl uppercase font-extrabold bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent mb-6">Sales Products</h2>
      <table className="w-full bg-white rounded shadow-md text-left">
        <thead>
          <tr className="bg-pink-500 text-white">
            <th className="p-2 text-center">ID</th>
            <th className="p-2">Categories</th>
            <th className="p-2 text-center">Sold Qty</th>
            <th className="p-2 text-center">Total Qty</th>
            <th className="p-2 text-center">Remaining</th>
            <th className="p-2 text-right">Total Price</th>
            <th className="p-2 text-center">Stock Status</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((item) => {
            const remaining = item.totalQuantity - item.soldQuantity;
            const totalPrice = item.soldQuantity * item.price;
            return (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-2 text-center">{item.id}</td>
                <td className="p-2">{item.Categories}</td>
                <td className="p-2 text-center">{item.soldQuantity}</td>
                <td className="p-2 text-center">{item.totalQuantity}</td>
                <td className="p-2 text-center">{remaining}</td>
                <td className="p-2 text-right">LKR {totalPrice}</td>
                <td className="p-2 text-center">
                  {remaining > 0 ? (
                    <span className="text-green-600 font-semibold">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-semibold">Out of Stock</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
