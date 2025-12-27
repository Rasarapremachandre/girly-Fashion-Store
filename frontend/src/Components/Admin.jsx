import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUsers, FaBoxOpen, FaShoppingCart, FaListAlt } from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Admin() {
  const [dateTime, setDateTime] = useState(new Date());
  const [calendarDate, setCalendarDate] = useState(new Date());
  const [userCount, setUserCount] = useState(0); 
  const [productCount, setProductCount] = useState(0);


  useEffect(() => {
    const timer = setInterval(() => setDateTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);







    // ✅ Fetch total users from backend
  useEffect(() => {
    const fetchUserCount = async () => {
      try {
        const res = await fetch("http://localhost:3000/backend/user/count");
        const data = await res.json();
        setUserCount(data.count || 0);
      } catch (err) {
        console.error("Error fetching user count:", err);
      }
    };
    fetchUserCount();
  }, []);


useEffect(() => {
  const fetchProductCount = async () => {
    try {
      const res = await fetch("http://localhost:3000/backend/products/count");
      const data = await res.json();

      setProductCount(data?.count ?? 0);
    } catch (err) {
      console.error("Error fetching product count:", err);
    }
  };

  fetchProductCount();
}, []);




const stats = [
  {
    label: "Total Users",
    value: userCount,
    icon: <FaUsers className="w-12 h-12 text-pink-600" />,
  },
  {
    label: "Categories",
    value: 4,
    icon: <FaListAlt className="w-12 h-12 text-pink-600" />,
  },
  {
    label: "All Products",
    value: productCount, // ✅ DB value
    icon: <FaBoxOpen className="w-12 h-12 text-pink-600" />,
  },
  {
    label: "Sold Products",
    value: 87,
    icon: <FaShoppingCart className="w-12 h-12 text-pink-600" />,
  },
];






  const notifications = [
    { id: 1, text: "New user registered: Janith" },
    { id: 2, text: "Product 'Dress 2025' sold" },
    { id: 3, text: "Stock alert: Only 2 Sarees left" },
  ];

  // Data
  const weeklySales = [
    { week: "Week 1", sales: 120 },
    { week: "Week 2", sales: 200 },
    { week: "Week 3", sales: 150 },
    { week: "Week 4", sales: 250 },
  ];

  const monthlySales = [
    { month: "Jan", sales: 400 },
    { month: "Feb", sales: 300 },
    { month: "Mar", sales: 500 },
    { month: "Apr", sales: 700 },
    { month: "May", sales: 600 },
    { month: "Jun", sales: 800 },
    { month: "Jul", sales: 750 },
    { month: "Aug", sales: 900 },
    { month: "Sep", sales: 650 },
    { month: "Oct", sales: 700 },
    { month: "Nov", sales: 850 },
    { month: "Dec", sales: 950 },
  ];

  const yearlySales = [
    { year: "2019", sales: 5000 },
    { year: "2020", sales: 6500 },
    { year: "2021", sales: 7000 },
    { year: "2022", sales: 8000 },
    { year: "2023", sales: 9000 },
  ];

  return (
    <div className="space-y-10 p-6  min-h-screen">
      {/* Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-10">
        {/* Left: Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex items-center bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition">
              <div className="mr-5 bg-pink-100 p-4 rounded-full">{stat.icon}</div>
              <div>
                <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                <p className="text-gray-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Middle: Clock + Calendar */}
        <div className="flex flex-col space-y-6 items-center">
          <div className="bg-white p-6 rounded-2xl shadow-md w-full text-center">
            <p className="text-gray-500 text-lg">{dateTime.toLocaleDateString()}</p>
            <p className="text-3xl font-bold text-gray-800 mt-2">{dateTime.toLocaleTimeString()}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md w-full">
            <Calendar onChange={setCalendarDate} value={calendarDate} className="w-full rounded-lg shadow-sm" />
          </div>
        </div>

        {/* Right: Notifications */}
        <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-pink-600">Notifications</h3>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {notifications.map(note => (
              <div key={note.id} className="p-3 bg-pink-50 rounded-lg text-gray-700 shadow-sm">{note.text}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Graph Section - 3 separate charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Sales */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-72">
          <h3 className="text-lg font-semibold text-pink-600 mb-4">Weekly Sales</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={weeklySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Sales */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-72">
          <h3 className="text-lg font-semibold text-pink-600 mb-4">Monthly Sales</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#ec4899" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Yearly Sales */}
        <div className="bg-white p-6 rounded-2xl shadow-md h-72">
          <h3 className="text-lg font-semibold text-pink-600 mb-4">Yearly Sales</h3>
          <ResponsiveContainer width="100%" height="85%">
            <LineChart data={yearlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
