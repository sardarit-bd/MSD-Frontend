// components/Navbar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Settings, Menu, X } from "lucide-react";
import Image from "next/image";
import ResourcesMega from "./megaMenu/ResourcesMega";
import MedicalTopicsMega from "./megaMenu/MedicalTopicsMega";
import CommentaryMega from "./megaMenu/CommentaryMega";
import ProceduresMega from "./megaMenu/ProceduresMega";
import navigationService from "@/lib/services/navigation.service";

export default function Navbar() {
  // States
  const [navItems, setNavItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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

  // Fetch navigation data
  useEffect(() => {
    const loadNavigation = async () => {
      try {
        setIsLoading(true);
        const data = await navigationService.getNavigation();
        setNavItems(data);
      } catch (error) {
        console.error('Failed to load navigation:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNavigation();

    // Refresh navigation periodically (every 5 minutes)
    const interval = setInterval(loadNavigation, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle scroll lock
  useEffect(() => {
    document.body.style.overflow = (openMegaMenu !== null || mobileMenuOpen) ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [openMegaMenu, mobileMenuOpen]);

  // Click outside handlers (same as before)
  useEffect(() => {
    function handleClickOutside(event) {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }

      if (mobileMenuOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
        setMobileMegaMenu(null);
      }

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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMegaMenu, mobileMenuOpen]);

  // Loading skeleton
  if (isLoading) {
    return <NavbarSkeleton />;
  }

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

  const closeMegaMenu = () => setOpenMegaMenu(null);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setMobileMegaMenu(null);
  };
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileMegaMenu(null);
  };

  const handleMobileMegaMenu = (index) => {
    setMobileMegaMenu(mobileMegaMenu === index ? null : index);
  };

  // Render mega menu content based on item name
  const renderMegaMenuContent = (link, isMobile = false) => {
    const props = {
      data: link.megaMenu,
      onItemClick: (item) => handleMegaMenuItemClick(link.name, item),
      isMobile
    };

    switch (link.slug) {
      case "medical-topics":
        return <MedicalTopicsMega {...props} />;

      case "resources":
        return <ResourcesMega {...props} />;

      case "commentary":
        return <CommentaryMega {...props} />;

      case "procedures":
        return <ProceduresMega {...props} />;

      default:
        return null;
    }
  };

  return (
    <nav className="w-full bg-[#1e5c75] text-white">
      {/* Top Section - Same as before */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        {/* ... (keep your existing top section JSX) ... */}
      </div>

      {/* Bottom Section - Desktop */}
      <div className="border-t border-white/20 hidden sm:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-3 lg:py-4">
          <div className="flex items-center justify-between relative">

            {/* Logo - Same as before */}
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

            {/* Dynamic Menu Items */}
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
                              {renderMegaMenuContent(link)}
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

      {/* Mobile Menu - Same structure but with dynamic content */}
      {mobileMenuOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={closeMobileMenu} />

          <div ref={mobileMenuRef} className="fixed right-0 top-0 h-full w-[300px] bg-[#1e5c75] z-50 overflow-y-auto shadow-xl">
            <div className="p-4">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/20">
                <h2 className="text-white font-bold text-lg">Menu</h2>
                <button onClick={closeMobileMenu} className="cursor-pointer p-2 hover:bg-white/10 rounded">
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

              {/* Dynamic Mobile Menu Items */}
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

                        {mobileMegaMenu === index && (
                          <div className="pb-3 pl-2">
                            {renderMegaMenuContent(link, true)}
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

              {/* Mobile Language and Social - Same as before */}
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
                    <button onClick={() => handleSocialClick("facebook")} className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white">f</button>
                    <button onClick={() => handleSocialClick("twitter")} className="w-8 h-8 bg-teal-400 rounded-full flex items-center justify-center font-bold text-white">x</button>
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

// Loading Skeleton Component
function NavbarSkeleton() {
  return (
    <nav className="w-full bg-[#1e5c75] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="h-8 w-48 bg-white/20 animate-pulse rounded" />
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-64 bg-white/20 animate-pulse rounded-full" />
            <div className="h-8 w-24 bg-white/20 animate-pulse rounded" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="h-12 w-48 bg-white/20 animate-pulse rounded" />
            <div className="flex gap-8">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="h-4 w-20 bg-white/20 animate-pulse rounded" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}