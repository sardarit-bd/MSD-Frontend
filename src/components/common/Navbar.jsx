"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Settings, Menu, X } from "lucide-react";
import Image from "next/image";
import navItems from "@/constants/navLinks";
import ResourcesMega from "./megaMenu/ResourcesMega";
import MedicalTopicsMega from "./megaMenu/MedicalTopicsMega";
import CommentaryMega from "./megaMenu/CommentaryMega";
import ProceduresMega from "./megaMenu/ProceduresMega";

export default function Navbar() {
  // States for dynamic interactions
  const [selectedTab, setSelectedTab] = useState("professional");
  const [languageOpen, setLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openMegaMenu, setOpenMegaMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileMegaMenu, setMobileMegaMenu] = useState(null);

  // Refs
  const languageRef = useRef(null);
  const megaMenuRef = useRef(null);
  const megaMenuDropdownRef = useRef(null);
  const backdropRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Handle scroll lock when mega menu or mobile menu is open
  useEffect(() => {
    if (openMegaMenu !== null || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openMegaMenu, mobileMenuOpen]);

  // Handle click outside for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      // Language dropdown
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }

      // Mobile menu close on outside click
      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setMobileMegaMenu(null);
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
  }, [openMegaMenu, mobileMenuOpen]);

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
    setMobileMenuOpen(false);
    setMobileMegaMenu(null);
  };

  const handleSocialClick = (platform) => {
    console.log("Social icon clicked:", platform);
  };

  const closeMegaMenu = () => {
    setOpenMegaMenu(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileMegaMenu(null);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileMegaMenu(null);
  };

  const handleMobileMegaMenu = (index) => {
    if (mobileMegaMenu === index) {
      setMobileMegaMenu(null);
    } else {
      setMobileMegaMenu(index);
    }
  };

  return (
    <nav className="w-full bg-[#1e5c75] text-white">
      {/* Top Section - Responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
          
          {/* Left Side - Mobile Toggle and Tabs */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-6">
              {/* Toggle Buttons - Responsive */}
              <div className="flex items-center bg-white rounded overflow-hidden text-xs sm:text-sm font-semibold">
                <button
                  onClick={() => setSelectedTab("professional")}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                    selectedTab === "professional"
                      ? "bg-[#0F3549] text-white font-bold"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  } border-r`}
                >
                  Professional
                </button>
                <button
                  onClick={() => setSelectedTab("consumer")}
                  className={`px-3 sm:px-4 py-1 sm:py-1.5 transition-colors cursor-pointer whitespace-nowrap ${
                    selectedTab === "consumer"
                      ? "bg-[#0F3549] text-white font-bold"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  Consumer
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="sm:hidden cursor-pointer p-2 hover:bg-white/10 rounded"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Right Side - Desktop */}
          <div className="hidden sm:flex items-center gap-2 lg:gap-4 w-full sm:w-auto justify-end">
            {/* Search - Responsive */}
            <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-3 lg:px-4 py-1.5 lg:py-2 w-full sm:w-64 lg:w-80">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="flex-1 text-xs lg:text-sm outline-none text-black"
              />
              <button type="submit" className="focus:outline-none cursor-pointer">
                <Search size={16} className="text-gray-500 hover:text-gray-700" />
              </button>
            </form>

            {/* Settings */}
            <button
              onClick={() => console.log("Settings clicked")}
              className="hover:opacity-80 cursor-pointer hidden lg:block"
            >
              <Settings size={20} />
            </button>

            {/* Language Dropdown */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center border border-white rounded px-2 lg:px-3 py-1 text-xs lg:text-sm gap-1 lg:gap-2 hover:bg-white/10 transition cursor-pointer whitespace-nowrap"
              >
                <span>ENGLISH</span>
                <ChevronDown size={14} className={`transition-transform ${languageOpen ? "rotate-180" : ""}`} />
              </button>

              {languageOpen && (
                <div className="absolute right-0 mt-2 w-28 lg:w-32 bg-white rounded shadow-lg z-50">
                  {["ENGLISH", "SPANISH", "FRENCH", "GERMAN"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => handleLanguageSelect(lang)}
                      className="block w-full text-left px-3 lg:px-4 py-2 text-xs lg:text-sm text-gray-700 hover:bg-gray-100 transition cursor-pointer"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 lg:gap-3 text-lg">
              <button
                onClick={() => handleSocialClick("facebook")}
                className="w-7 h-7 lg:w-8 lg:h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-sm lg:text-base hover:bg-blue-600 transition cursor-pointer"
              >
                f
              </button>
              <button
                onClick={() => handleSocialClick("twitter")}
                className="w-7 h-7 lg:w-8 lg:h-8 bg-teal-400 rounded-full flex items-center justify-center font-bold text-sm lg:text-base hover:bg-teal-500 transition cursor-pointer"
              >
                x
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Desktop */}
      <div className="border-t border-white/20 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between relative">
            
            {/* Logo */}
            <button
              onClick={() => console.log("Logo clicked")}
              className="flex items-center gap-1 hover:opacity-80 transition cursor-pointer"
            >
              <div className="relative w-10 h-10 lg:w-12 lg:h-12">
                <Image
                  src="/images/mm_logo.svg"
                  alt="MSD Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold tracking-wide">
                  MSD MANUAL
                </h1>
                <p className="text-xs lg:text-sm -mt-1 text-gray-200">
                  {selectedTab === "professional" ? "Professional Version" : "Consumer Version"}
                </p>
              </div>
            </button>

            {/* Menu Items - Responsive */}
            <div className="flex items-center gap-4 lg:gap-8 text-xs lg:text-sm font-semibold tracking-wide" ref={megaMenuRef}>
              {navItems.map((link, index) => (
                <div key={index} className="relative">
                  {link.megaMenu ? (
                    <>
                      <button
                        onClick={() => setOpenMegaMenu(openMegaMenu === index ? null : index)}
                        className="flex items-center gap-1 hover:text-gray-300 transition cursor-pointer whitespace-nowrap"
                      >
                        {link.name}
                        <ChevronDown size={12} className={`transition-transform ${openMegaMenu === index ? "rotate-180" : ""}`} />
                      </button>

                      {/* Mega Menu Dropdown */}
                      {openMegaMenu === index && (
                        <>
                          <div
                            ref={backdropRef}
                            className="fixed inset-0 bg-black/20 z-40 cursor-pointer"
                            onClick={closeMegaMenu}
                          />

                          <div
                            ref={megaMenuDropdownRef}
                            className="fixed left-1/2 transform -translate-x-1/2 top-[140px] w-11/12 lg:w-full max-w-7xl bg-white shadow-xl z-50 rounded-lg max-h-[70vh] overflow-y-auto"
                          >
                            <div className="px-4 lg:px-6 py-4 lg:py-6">
                              {link.name === "MEDICAL TOPICS" && (
                                <MedicalTopicsMega
                                  data={link.megaMenu}
                                  onItemClick={(item) =>
                                    handleMegaMenuItemClick(link.name, item)
                                  }
                                />
                              )}
                              {link.name === "RESOURCES" && (
                                <ResourcesMega
                                  data={link.megaMenu}
                                  onItemClick={(item) =>
                                    handleMegaMenuItemClick(link.name, item)
                                  }
                                />
                              )}
                              {link.name === "COMMENTARY" && (
                                <CommentaryMega
                                  data={link.megaMenu}
                                  onItemClick={(item) =>
                                    handleMegaMenuItemClick(link.name, item)
                                  }
                                />
                              )}
                              {link.name === "PROCEDURES" && (
                                <ProceduresMega
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
                      className="hover:text-gray-300 transition cursor-pointer whitespace-nowrap"
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
                <ChevronDown size={14} />
              </button>
              <button
                onClick={() => console.log("Search icon clicked")}
                className="cursor-pointer"
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeMobileMenu}
          />
          
          {/* Mobile Menu Content */}
          <div 
            ref={mobileMenuRef}
            className="fixed right-0 top-0 h-full w-[300px] bg-[#1e5c75] z-50 overflow-y-auto shadow-xl"
          >
            <div className="p-4">
              {/* Mobile Menu Header with Close Button */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
                <h2 className="text-white font-bold text-lg">Menu</h2>
                <button
                  onClick={closeMobileMenu}
                  className="cursor-pointer p-2 hover:bg-white/10 rounded"
                  aria-label="Close menu"
                >
                  <X size={24} className="text-white" />
                </button>
              </div>

              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full px-4 py-2 mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  className="flex-1 text-sm outline-none text-black"
                />
                <button type="submit" className="focus:outline-none cursor-pointer">
                  <Search size={18} className="text-gray-500" />
                </button>
              </form>

              {/* Mobile Menu Items */}
              <div className="space-y-2">
                {navItems.map((link, index) => (
                  <div key={index} className="border-b border-white/20 last:border-0">
                    {link.megaMenu ? (
                      <>
                        <button
                          onClick={() => handleMobileMegaMenu(index)}
                          className="flex items-center justify-between w-full py-3 text-left text-white font-semibold"
                        >
                          <span>{link.name}</span>
                          <ChevronDown size={16} className={`transition-transform ${mobileMegaMenu === index ? "rotate-180" : ""}`} />
                        </button>
                        
                        {/* Mobile Mega Menu Content */}
                        {mobileMegaMenu === index && (
                          <div className="pb-3 pl-2">
                            {link.name === "MEDICAL TOPICS" && (
                              <MedicalTopicsMega
                                data={link.megaMenu}
                                onItemClick={(item) => {
                                  handleMegaMenuItemClick(link.name, item);
                                  closeMobileMenu();
                                }}
                                isMobile={true}
                              />
                            )}
                            {link.name === "RESOURCES" && (
                              <ResourcesMega
                                data={link.megaMenu}
                                onItemClick={(item) => {
                                  handleMegaMenuItemClick(link.name, item);
                                  closeMobileMenu();
                                }}
                                isMobile={true}
                              />
                            )}
                            {link.name === "COMMENTARY" && (
                              <CommentaryMega
                                data={link.megaMenu}
                                onItemClick={(item) => {
                                  handleMegaMenuItemClick(link.name, item);
                                  closeMobileMenu();
                                }}
                                isMobile={true}
                              />
                            )}
                            {link.name === "PROCEDURES" && (
                              <ProceduresMega
                                data={link.megaMenu}
                                onItemClick={(item) => {
                                  handleMegaMenuItemClick(link.name, item);
                                  closeMobileMenu();
                                }}
                                isMobile={true}
                              />
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          handleMenuClick(link.name);
                          closeMobileMenu();
                        }}
                        className="block w-full text-left py-3 text-white font-semibold"
                      >
                        {link.name}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile Language and Social */}
              <div className="mt-6 pt-4 border-t border-white/20">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setLanguageOpen(!languageOpen)}
                    className="flex items-center gap-2 text-white text-sm"
                  >
                    <span>ENGLISH</span>
                    <ChevronDown size={14} />
                  </button>
                  
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSocialClick("facebook")}
                      className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white"
                    >
                      f
                    </button>
                    <button
                      onClick={() => handleSocialClick("twitter")}
                      className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center font-bold text-white"
                    >
                      x
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}