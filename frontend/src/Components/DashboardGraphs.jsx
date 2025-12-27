import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardGraphs() {
  const barData = {
    labels: ["Casual", "Office", "Party"],
    datasets: [
      { label: "Products Sold", data: [12, 19, 7], backgroundColor: "#ec4899" }
    ]
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      { label: "Sales Growth", data: [5, 10, 7, 15], borderColor: "#f43f5e", fill: false }
    ]
  };

  const pieData = {
    labels: ["Casual", "Office", "Party"],
    datasets: [
      { data: [12, 19, 7], backgroundColor: ["#f472b6", "#f43f5e", "#ec4899"] }
    ]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Products Sold</h3>
        <Bar data={barData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Sales Growth</h3>
        <Line data={lineData} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-bold mb-2">Category Share</h3>
        <Pie data={pieData} />
      </div>
    </div>
  );
}
