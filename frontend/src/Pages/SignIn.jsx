// SignIn.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import signImage from "../assets/signin.png";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import OAuth from "../Components/OAuth";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      dispatch(signInStart());

      const res = await fetch("/backend/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        dispatch(signInFailure(data.message));
        setError(data.message || "Invalid credentials");
        return;
      }

      // ✅ SAVE USER TO REDUX
      dispatch(signInSuccess(data.user));

      // ✅ SAVE USER TO LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ ROLE BASED REDIRECT
      if (data.user.role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }

    } catch (err) {
      dispatch(signInFailure("Something went wrong"));
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full max-w-4xl  rounded-lg shadow-lg overflow-hidden">
        
        {/* Image */}
        <div className="hidden md:flex w-1/2">
          <img src={signImage} alt="Shopping Girl" className="object-cover w-full" />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center text-center">
          <h1 className="text-3xl font-bold mb-6">Sign In</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-pink-200"
              required
            />

            <input
              type="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full px-3 py-2 rounded bg-pink-200"
              required
            />

            {error && <p className="text-red-700 font-bold">{error}</p>}

            <button className="w-full bg-pink-600 text-white py-2 rounded">
              Sign In
            </button>
          </form>

          <p className="my-3 font-bold">Or</p>
          <OAuth />

          <p className="mt-4">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-bold text-pink-900">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
