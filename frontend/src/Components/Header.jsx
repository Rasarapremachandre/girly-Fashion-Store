// Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";

// 👉 Get first letter for avatar fallback
const getFirstLetter = (user) => {
  if (!user) return "?";

  const name =
    user.username ||
    user.name ||
    user.user?.username ||
    user.user?.name ||
    user.email;

  return name ? name.charAt(0).toLowerCase() : "?";
};

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);


  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

      // Close dropdown when clicking outside
      useEffect(() => {
        const handleClickOutside = (e) => {
          if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsDropdownOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
          document.removeEventListener("mousedown", handleClickOutside);
      }, []);

      const handleSignOut = () => {
        dispatch(signOutSuccess());
        localStorage.removeItem("user");
        navigate("/");
      };

      const isAdmin = currentUser?.role === "admin";

      useEffect(() => {
      const fetchCartCount = async () => {
        if (!currentUser || currentUser.role === "admin") {
          setCartCount(0);
          return;
        }

        try {
          const res = await fetch(
            `http://localhost:3000/backend/cart/${currentUser._id}`
          );
          const data = await res.json();

          // quantity total (better UX)
          const totalQty = data.reduce(
            (sum, item) => sum + item.quantity,
            0
          );

          setCartCount(totalQty);
        } catch (err) {
          console.error("Cart count fetch error", err);
        }
      };

      fetchCartCount();
    }, [currentUser]);


  return (
    <header className="bg-gradient-to-b from-[#aa75d8] to-[#db377e] shadow-md h-40 relative rounded-b-[50%_50%] ">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-full py-4 px-6 ">

        {/* Logo */}
        <div className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-white">giRly</span>
        </div>

        {/* Navigation */}
        <ul className="hidden md:flex gap-10 text-lg font-semibold text-white ">
          <li>
            <Link to="/" className="hover:text-black">Home</Link>
          </li>

          <li>
            <Link to="/about" className="hover:text-black">About Us</Link>
          </li>

          <li>
            <Link to="/catagories" className="hover:text-black">Categories</Link>
          </li>

          {/* ✅ Admin Dashboard */}
          {isAdmin && (
            <li>
              <Link
                to="/admindashboard"
                className="hover:text-black "
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* ❌ Admin = NO WhatsApp */}
          {!isAdmin && (
            <a
              href="https://wa.me/94715896668?text=Hello%20I%20want%20to%20know%20more%20about%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/30 text-[#d6458e]
                        hover:text-white hover:bg-pink-500 transition"
            >
              <FaWhatsapp size={22} />
            </a>

          )}

          {/* ❌ Admin = NO Cart */}
          {currentUser && !isAdmin && (
            <Link
              to="/cart"
              className="relative p-4 rounded-full bg-white/30 hover:bg-pink-500 transition"
            >
              <FaShoppingCart className="text-pink-500 hover:text-white w-6 h-6" />

              {cartCount > 0 && (
                <span
                  className="absolute -top-1 -right-1
                            bg-red-600 text-white text-xs
                            w-5 h-5 rounded-full
                            flex items-center justify-center
                            font-bold"
                >
                  {cartCount}
                </span>
              )}
            </Link>

          )}


          {/* Auth Section */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>

              {/* Avatar */}
              <div
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-12 h-12 rounded-full object-cover cursor-pointer border-2 border-pink-300
                           flex items-center justify-center bg-pink-500
                           text-white font-bold text-lg select-none"
              >
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt="profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  getFirstLetter(currentUser)
                )}
              </div>

              {/* Dropdown */}
              {isDropdownOpen && (
                <div className="absolute right-0 translate-x-full mt-3
                                w-44 bg-white shadow-xl rounded-lg z-50">

                  {/* ✅ ONLY USER sees My Profile */}
                  {!isAdmin && (
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                  )}

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-2
                              hover:bg-gray-100 text-red-500"
                  >
                    Sign Out
                  </button>
                </div>
              )}

            </div>
          ) : (
            <button
              onClick={() => navigate("/signin")}
              className="bg-white text-pink-500 px-4 py-2 rounded-lg
                         font-semibold hover:bg-black hover:text-white transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
