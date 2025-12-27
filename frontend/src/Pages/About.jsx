// AboutUs.jsx
import React from "react";
import HCategories from "../Components/HCategories";
import { FaFacebookF, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";
import missionImage from "../assets/mission.png";
import vissionImage from "../assets/vission.png";
import Categories from "./Catagories";



export default function About() {
  return (
    <div className="min-h-screen p-6 font-sans py-20  ">
      {/* Header */}
      <header className="text-center  mb-12">
        <h1 className="text-4xl font-extrabold text-white mb-8 " style={{ letterSpacing: "1.5em" }}>ABOUT US</h1>
        <p className="text-white max-w-3xl mx-auto leading-relaxed text-lg ">
          We are a leading company committed to delivering high-quality products and
          services. Our goal is to provide an exceptional experience to our clients
          and build lasting relationships. <br />
          <br />
          We strive to innovate, inspire, and create value through everything we do.
        </p>
      </header>

{/* Mission & Vision Section */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-20">

  {/* Mission */}
  <div className="bg-pink-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition p-6">
    <img
      src={missionImage}
      alt="Mission"
      className="w-full h-auto object-contain rounded-xl"

    />
    <h2 className="text-3xl text-pink-600 font-bold mt-6">Mission...</h2>
    <p className="text-gray-600 mt-3 leading-relaxed text-justify">
        Our mission is to consistently deliver high-quality products that 
        enhance our customers’ lives, exceed their expectations, and provide 
        real value. We strive to understand their needs, innovate continuously, 
        and maintain the highest standards in every aspect of our work. By 
        fostering trust, reliability, and exceptional customer experiences,
         we aim to create long-term relationships that go beyond simple transactions.
    </p>
  </div>

  {/* Vision */}
  <div className="bg-pink-200 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition p-6">
    <img
      src={vissionImage}
      alt="Vision"
      className="w-full h-auto object-contain rounded-xl"

    />
    <h2 className="text-3xl text-pink-600 font-bold mt-6">Vision...</h2>
    <p className="text-gray-600 mt-3 leading-relaxed text-justify">
          Our vision is to become a globally recognized leader in our industry, 
          renowned for driving innovation, sustainability, and excellence in every 
          project we undertake. We aspire to set new benchmarks for quality and service, 
          influence positive change in our sector, and inspire both our customers and our 
          employees to reach their full potential. Our ultimate goal is to create a legacy 
          of innovation, ethical business practices, and lasting impact on communities worldwide.
    </p>
  </div>

</div>


      {/* Categories Showcase */}
      <div className="mt-20 max-w-6xl mx-auto">
        <Categories />
      </div>

      {/* Contact Us */}
      <div className="mt-28 text-center">
        <h1 className="text-4xl font-extrabold text-white mb-8 " style={{ letterSpacing: "1.5em" }}>CONTACT US</h1>


        <p className="text-white max-w-2xl mx-auto mb-10 text-lg">
          Reach out to us anytime! Connect with us on social media and let's build
          your dream style together
        </p>

        <div className="flex justify-center gap-8 flex-wrap">
          <a
            href="#"
            className="p-4 rounded-full shadow-lg bg-white/30 backdrop-blur-md
                      text-[#d6458e] hover:text-white hover:bg-gradient-to-r
                      hover:from-pink-500 hover:to-purple-500 transition-all 
                      duration-300 hover:scale-110 ring-2 ring-pink-200"
          >
            <FaFacebookF size={24} />
          </a>

          <a
            href="#"
            className="p-4 rounded-full shadow-lg bg-white/30 backdrop-blur-md
                      text-[#d6458e] hover:text-white hover:bg-gradient-to-r
                      hover:from-pink-500 hover:to-purple-500 transition-all 
                      duration-300 hover:scale-110 ring-2 ring-pink-200"
          >
            <FaInstagram size={24} />
          </a>

          <a
            href="#"
            className="p-4 rounded-full shadow-lg bg-white/30 backdrop-blur-md
                      text-[#d6458e] hover:text-white hover:bg-gradient-to-r
                      hover:from-pink-500 hover:to-purple-500 transition-all 
                      duration-300 hover:scale-110 ring-2 ring-pink-200"
          >
            <FaTwitter size={24} />
          </a>

<a
  href="https://wa.me/94715896668?text=Hello%20I%20want%20to%20know%20more%20about%20your%20products"
  target="_blank"
  rel="noopener noreferrer"
  className="p-4 rounded-full shadow-lg bg-white/30 backdrop-blur-md
            text-[#d6458e] hover:text-white hover:bg-gradient-to-r
            hover:from-pink-500 hover:to-purple-500 transition-all 
            duration-300 hover:scale-110 ring-2 ring-pink-200"
>
  <FaWhatsapp size={24} />
</a>

        </div>
      </div>

    </div>
  );
}
