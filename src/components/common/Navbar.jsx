"use client";

import navItems from "@/constants/navLinks";
import { Search, ChevronDown, Settings } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#1e5c75] text-white">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        
        {/* Left Side */}
        <div className="flex items-center gap-6">
          
          {/* Toggle Buttons */}
          <div className="flex items-center bg-white rounded overflow-hidden text-sm font-semibold">
            <button className="px-4 py-1 bg-white text-[#1e5c75] border-r">
              Professional
            </button>
            <button className="px-4 py-1 text-red-600 bg-gray-100">
              Consumer
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          
          {/* Search */}
          <div className="flex items-center bg-white rounded-full px-4 py-2 w-80">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 text-sm outline-none text-black"
            />
            <Search size={18} className="text-gray-500" />
          </div>

          <Settings size={20} />

          <div className="flex items-center border border-white rounded px-3 py-1 text-sm gap-2">
            <span>ENGLISH</span>
            <ChevronDown size={16} />
          </div>

          <div className="flex items-center gap-3 text-lg">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold">
              f
            </div>
            <div className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center font-bold">
              x
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          
          {/* Logo Left */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              MSD MANUAL
            </h1>
            <p className="text-sm -mt-1 text-gray-200">
              Professional Version
            </p>
          </div>

          {/* Menu Right */}
          <div className="flex items-center gap-8 text-sm font-semibold tracking-wide">
            {navItems.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="hover:text-gray-300 transition"
              >
                {link.name}
              </a>
            ))}
            <ChevronDown size={16} />
            <Search size={18} />
          </div>
        </div>
      </div>
    </nav>
  );
}