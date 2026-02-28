"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Settings } from "lucide-react";
import Image from "next/image";
import navItems from "@/constants/navLinks";
import ResourcesMega from "./megaMenu/ResourcesMega";
import MedicalTopicsMega from "./megaMenu/MedicalTopicsMega";


export default function Navbar() {
  // States for dynamic interactions
  const [selectedTab, setSelectedTab] = useState("professional");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMegaMenu, setOpenMegaMenu] = useState(null);

  // Refs
  const languageRef = useRef(null);
  const megaMenuRef = useRef(null);
  const megaMenuDropdownRef = useRef(null);
  const backdropRef = useRef(null);

  // Handle scroll lock when mega menu is open
  useEffect(() => {
    if (openMegaMenu !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openMegaMenu]);

  // Handle click outside for both dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      // Language dropdown
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }

      // Mega menu close logic
      if (openMegaMenu !== null) {
        if (backdropRef.current && backdropRef.current === event.target) {
          setOpenMegaMenu(null);
          return;
        }

        const isClickOnMegaMenuButton = megaMenuRef.current && megaMenuRef.current.contains(event.target);

        const isClickOnMegaMenuDropdown = megaMenuDropdownRef.current && megaMenuDropdownRef.current.contains(event.target);

        if (!isClickOnMegaMenuButton && !isClickOnMegaMenuDropdown) {
          setOpenMegaMenu(null);
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMegaMenu]);

  // Handlers
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const handleLanguageSelect = (lang) => {
    console.log("Selected language:", lang);
    setLanguageOpen(false);
  };

  const handleMenuClick = (item) => {
    console.log("Menu clicked:", item);
  };

  const handleMegaMenuItemClick = (item, link) => {
    console.log(`Mega menu ${item} - ${link} clicked`);
    setOpenMegaMenu(null);
  };

  const handleSocialClick = (platform) => {
    console.log("Social icon clicked:", platform);
  };
  const closeMegaMenu = () => {
    setOpenMegaMenu(null);
  };

  return (
    <nav className="w-full bg-[#1e5c75] text-white">

      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">

        {/* Left Side */}
        <div className="flex items-center gap-6">
          <div className="flex items-center bg-white rounded overflow-hidden text-sm font-semibold">
            <button
              onClick={() => setSelectedTab("professional")}
              className={`px-4 py-1 transition-colors cursor-pointer ${selectedTab === "professional"
                ? "bg-[#0F3549] text-white font-bold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } border-r`}
            >
              Professional
            </button>
            <button
              onClick={() => setSelectedTab("consumer")}
              className={`px-4 py-1 transition-colors cursor-pointer ${selectedTab === "consumer"
                ? "bg-[#0F3549] text-white font-bold"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              Consumer
            </button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-4 py-2 w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search"
              className="flex-1 text-sm outline-none text-black"
            />
            <button type="submit" className="focus:outline-none cursor-pointer">
              <Search size={18} className="text-gray-500 hover:text-gray-700" />
            </button>
          </form>

          <button
            onClick={() => console.log("Settings clicked")}
            className="hover:opacity-80 cursor-pointer"
          >
            <Settings size={20} />
          </button>

          <div className="relative" ref={languageRef}>
            <button
              onClick={() => setLanguageOpen(!languageOpen)}
              className="flex items-center border border-white rounded px-3 py-1 text-sm gap-2 hover:bg-white/10 transition cursor-pointer"
            >
              <span>ENGLISH</span>
              <ChevronDown size={16} className={`transition-transform ${languageOpen ? "rotate-180" : ""}`} />
            </button>

            {languageOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-50">
                {["ENGLISH", "SPANISH", "FRENCH", "GERMAN"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageSelect(lang)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 text-lg">
            <button
              onClick={() => handleSocialClick("facebook")}
              className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold hover:bg-blue-600 transition cursor-pointer"
            >
              f
            </button>
            <button
              onClick={() => handleSocialClick("twitter")}
              className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center font-bold hover:bg-teal-500 transition cursor-pointer"
            >
              x
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between relative">

          <button
            onClick={() => console.log("Logo clicked")}
            className="flex items-center gap-1 hover:opacity-80 transition cursor-pointer"
          >
            <div className="relative w-12 h-12">
              <Image
                src="/images/mm_logo.svg"
                alt="MSD Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                MSD MANUAL
              </h1>
              <p className="text-sm -mt-1 text-gray-200">
                {selectedTab === "professional" ? "Professional Version" : "Consumer Version"}
              </p>
            </div>
          </button>

          <div className="flex items-center gap-8 text-sm font-semibold tracking-wide" ref={megaMenuRef}>
            {navItems.map((link, index) => (
              <div key={index} className="relative">
                {link.megaMenu ? (
                  <>
                    <button
                      onClick={() => setOpenMegaMenu(openMegaMenu === index ? null : index)}
                      className="flex items-center gap-1 hover:text-gray-300 transition cursor-pointer"
                    >
                      {link.name}
                      <ChevronDown size={14} className={`transition-transform ${openMegaMenu === index ? "rotate-180" : ""}`} />
                    </button>

                    {/* Mega Menu Dropdown - Full Width */}
                    {openMegaMenu === index && (
                      <>
                        <div
                          ref={backdropRef}
                          className="fixed inset-0 bg-black/20 z-40 cursor-pointer"
                          onClick={closeMegaMenu}
                        />

                        <div
                          ref={megaMenuDropdownRef}
                          className="fixed left-1/2 transform -translate-x-1/2 top-[140px] w-full max-w-7xl bg-white shadow-xl z-50 rounded-lg"
                        >
                          <div className="px-6 py-6">
                            {/* Medical Topics Mega Menu */}
                            {link.name === "MEDICAL TOPICS" && (
                              <MedicalTopicsMega
                                data={link.megaMenu}
                                onItemClick={(item) =>
                                  handleMegaMenuItemClick(link.name, item)
                                }
                              />
                            )}

                            {/* Resources Mega Menu */}
                            {link.name === "RESOURCES" && (
                              <ResourcesMega
                                data={link.megaMenu}
                                onItemClick={(item) =>
                                  handleMegaMenuItemClick(link.name, item)
                                }
                              />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <button
                    onClick={() => handleMenuClick(link.name)}
                    className="hover:text-gray-300 transition cursor-pointer"
                  >
                    {link.name}
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={() => console.log("More menu clicked")}
              className="cursor-pointer"
            >
              <ChevronDown size={16} />
            </button>
            <button
              onClick={() => console.log("Search icon clicked")}
              className="cursor-pointer"
            >
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}