// Footer.jsx
import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-[#aa75d8] to-[#db377e]   text-white py-10 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div>
          <h2 className="text-2xl font-extrabold text-white">
            <span className="text-white">girly</span><span className="text-white">...</span>
          </h2>
          <p className="mt-4 text-black font-bold text-lg">
            Complete your style with <br /> awesome clothes from us.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-6">
            <a href="#" className="bg-white text-pink-600 p-2 rounded-full">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="bg-white text-pink-600 p-2 rounded-full">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="bg-white text-pink-600 p-2 rounded-full">
              <FaTwitter size={2} />
            </a>

            <a
              href="https://wa.me/94715896668?text=Hello%20I%20want%20to%20know%20more%20about%20your%20products"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full bg-white/30 text-[#d6458e]
                        hover:text-white hover:bg-pink-500 transition"
            >
              <FaWhatsapp size={20} />
            </a>
            
          </div>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-extrabold text-lg mb-4">Company</h3>
          <ul className="space-y-2 text-white text-lg">
            <li><a href="/">Home</a></li>
            <li><a href="about">About Us</a></li>
            <li><a href="catagories">Catogories</a></li>
            <li><a href="signin">Sign In</a></li>
            
          </ul>
        </div>

        {/* Pages Links */}
        <div>
          <h3 className="font-extrabold text-lg mb-4">Pages</h3>
          <ul className="space-y-2 text-white text-lg">
            <li><a href="/casualwears">Casual Wears</a></li>
            <li><a href="/TopsPants">Tops & Pants</a></li>
            <li><a href="/frocks">Frocks</a></li>
            <li><a href="/partydreseses">Party Dresses</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
