import React, { useState, useEffect } from "react";


export default function AllUsers() {
    const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users from backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/backend/user");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl uppercase font-extrabold bg-gradient-to-r from-pink-700 to-purple-700 bg-clip-text text-transparent mb-6">All Users</h2>
      <table className="w-full bg-white text-start rounded shadow-md">
        <thead>
          <tr className="bg-pink-600 text-white">
            <th className="p-4 text-center">ID</th>
            <th className="p-4 text-center">User Name</th>
            <th className="p-2 text-left">First Name</th>
            <th className="p-2 text-left">Last Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-center">Contact Info</th>
            <th className="p-2 text-left">Address</th>
            <th className="p-2 text-center">Purchased Items</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b hover:bg-gray-50">
              <td className="p-2 text-center">{user.id}</td>
              <td className="p-2 text-center">{user.username}</td>
              <td className="p-2 text-left">{user.firstName}</td>
              <td className="p-2 text-left">{user.lastName}</td>
              <td className="p-2 text-left">{user.email}</td>
              <td className="p-2 text-center">{user.contact}</td>
              <td className="p-2 text-left">{user.address}</td>
              <td className="p-2 text-center">
                {user.purchased ? (
                  <span className="text-green-600 font-semibold">Yes</span>
                ) : (
                  <span className="text-red-600 font-semibold">No</span>
                )}
              </td>
              <td className="p-2 text-center">
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
}
