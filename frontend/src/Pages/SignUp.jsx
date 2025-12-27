// SignUp.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signImage from "../assets/signin.png";
import OAuth from "../Components/OAuth";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/backend/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      alert("Account created successfully");
      navigate("/signin");

    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-4xl rounded-lg shadow-lg overflow-hidden">

        <div className="hidden md:flex w-1/2">
          <img src={signImage} alt="Shopping Girl" className="object-cover w-full" />
        </div>

        <div className="w-full md:w-1/2 p-10 text-center">
          <h1 className="text-3xl font-bold mb-6">Sign Up</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-pink-200"
              required
            />

            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-pink-200"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-pink-200"
              required
            />

            {error && <p className="text-red-700 font-bold">{error}</p>}

            <button className="w-full bg-pink-600 text-white py-2 rounded">
              Sign Up
            </button>
          </form>

          <p className="my-3 font-bold">Or</p>
          <OAuth />

          <p className="mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="font-bold text-pink-900">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
