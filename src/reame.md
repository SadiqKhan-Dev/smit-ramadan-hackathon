import React from "react";
import { House, Store, ArrowRight, ArrowLeft } from "lucide-react";
import "./index.css"
import tdhouse from "../public/3d-rendering.jpg"
import housed from "../public/house-design.jpg"

const HeroSection = () => {
  return (
    <div className="min-h-screen bg-[#e67e22] flex items-center justify-center px-6 py-10">
      {/* Main Card Container */}
      <div className="w-full max-w-7xl bg-white rounded-2xl shadow-2xl p-10 relative">

        {/* ================= NAVBAR ================= */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-[#e67e22] rounded-full"></div>
            <h1 className="text-xl font-semibold text-gray-800">
              SolidCraft
            </h1>
          </div>

          <div className="hidden md:flex gap-10 text-gray-600 font-medium">
            <a href="#" className="hover:text-black transition">About</a>
            <a href="#" className="hover:text-black transition">Projects</a>
            <a href="#" className="hover:text-black transition">Workflow</a>
            <a href="#" className="hover:text-black transition">Career</a>
          </div>

          <button className="border border-gray-300 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
            Contact
          </button>
        </div>

        {/* ================= HERO CONTENT ================= */}
        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Foundation of Excellence, <br />
              Structure of Strength
            </h2>

            <p className="text-gray-600 mt-6 max-w-md">
              Excellence is the foundation upon which we build. Our construction
              company stands for unwavering quality and the creation of
              structures that embody strength and longevity.
            </p>

            <button className="mt-8 bg-[#e67e22] text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition">
              Start a Project
            </button>

            {/* Small Arrow Button */}

          </div>

          {/* RIGHT CONTENT */}
          <div className="">

            {/* Stats */}
            <div className="flex justify-end gap-10 mb-6 text-right">
              <div>
                <h3 className="text-xl font-bold text-[#e67e22]">15+</h3>
                <p className="text-sm text-gray-500">Years Of Experience</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#e67e22]">100+</h3>
                <p className="text-sm text-gray-500">Projects Delivered</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#e67e22]">98%</h3>
                <p className="text-sm text-gray-500">Client Satisfaction</p>
              </div>
            </div>

            {/* Image */}
            <div className="gap-4 overflow-hidden flex">

              <img src={tdhouse}
                alt="Building"
                className="w-40 h-50.5 object-cover rounded-lg"
              />
              <img src={housed}
                alt="meeting team"
                className="w-full h-87.5 object-cover rounded-lg"
              />
            </div>

          </div>
        </div>

        {/* ================= BOTTOM SERVICE CARDS ================= */}
        <div className="flex mt-10 w-150 h-80 justify-between align-middle">
            <button className="w-20 h-10 bg-[#e67e22] mt-60 text-white rounded-md flex items-center align-middle justify-center hover:opacity-90 transition text-6xl">
              <ArrowLeft />
            </button>
            <button className="w-20 h-10 bg-[#ffffff] mt-70 text-[#e67e22] rounded-md flex items-center align-middle justify-center hover:opacity-90 transition text-6xl">
              <ArrowRight />
            </button>
       
          </div>

          <div className="flex gap-2 justify-around ml-30 w-150">
            {/* Card 1 */}
            <div className="bg-[#e67e22] text-white p-6 w-150 rounded-xl">
              <p className="mb-2"><House /></p>
              <h4 className="text-lg font-semibold mb-3">
                Residential Construction
              </h4>
              <p className="text-base">
                We offer comprehensive residential construction services,
                from building new homes to renovating existing properties.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#e67e22] text-white p-6 w-150 rounded-xl">
              <p className="mb-2"><Store /></p>
              <h4 className="text-lg font-semibold mb-3">
                Commercial Construction
              </h4>
              <p className="text-sm opacity-90">
                We provide expertise in constructing commercial spaces such
                as offices, retail outlets, and industrial developments.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroSection;