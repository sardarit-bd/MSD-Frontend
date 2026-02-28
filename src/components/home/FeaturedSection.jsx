"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, ChevronRight as ChevronRightIcon, X } from "lucide-react";
import { featuredItems, quickLinks } from "@/constants/featuredItems";


export default function FeaturedSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState("");

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredItems.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? featuredItems.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  // মডাল ওপেন ফাংশন
  const openModal = (linkName) => {
    setSelectedLink(linkName);
    setIsModalOpen(true);
    // মডাল ওপেন থাকলে body স্ক্রল বন্ধ
    document.body.style.overflow = 'hidden';
  };

  // মডাল ক্লোজ ফাংশন
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedLink("");
    // মডাল বন্ধ থাকলে body স্ক্রল চালু
    document.body.style.overflow = 'unset';
  };

  const currentItem = featuredItems[currentIndex];

  return (
    <>
      <section className="bg-[#f2f2f2] py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8">
          
          {/* LEFT SIDE - Featured Content with Carousel */}
          <div className="col-span-2">
            <h2 className="text-sm font-bold tracking-widest text-gray-600 mb-4">
              FEATURED CONTENT
            </h2>

            <div 
              className="bg-white grid grid-cols-2 shadow-sm relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {/* Image */}
              <div className="relative h-[335px]">
                <img
                  src={currentItem.image}
                  alt={currentItem.alt}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-800">
                    {currentItem.title}
                  </h3>

                  <p className="text-sm italic mt-2 text-gray-600">
                    <strong>{currentItem.author}</strong><br />
                    {currentItem.credentials}
                  </p>

                  <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                    {currentItem.description}
                  </p>

                  <p className="text-red-600 text-sm mt-3 cursor-pointer hover:underline">
                    Read All
                  </p>
                </div>

                {/* Navigation Arrows and Dots */}
                <div className="flex items-center justify-between mt-4">
                  {/* Left/Right Arrows */}
                  <div className="flex gap-2">
                    <button 
                      onClick={prevSlide}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition cursor-pointer"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft className="text-blue-400" size={18} />
                    </button>
                    <button 
                      onClick={nextSlide}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition cursor-pointer"
                      aria-label="Next slide"
                    >
                      <ChevronRight className="text-blue-400" size={18} />
                    </button>
                  </div>

                  {/* Dots */}
                  <div className="flex gap-2">
                    {featuredItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                          index === currentIndex 
                            ? "bg-[#1e5c75] w-6" 
                            : "bg-gray-400 hover:bg-gray-500"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Quick Links */}
          <div>
            <h2 className="text-sm font-bold tracking-widest text-gray-600 mb-4">
              QUICK LINKS
            </h2>

            <div className="bg-white p-6 shadow-sm space-y-4 h-[335px]">
              {quickLinks.map((item, index) => (
                <div
                  key={index}
                  onClick={() => openModal(item.name)}
                  className="flex justify-between items-center border rounded px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer transition"
                >
                  <span>{item.name}</span>
                  <ChevronRightIcon size={18} />
                </div>
              ))}
            </div>

            {/* App Download Section (commented out) */}
            {/* <div className="bg-white p-4 mt-6 shadow-sm flex gap-4 items-center">
              <div className="w-20 h-20 bg-gray-200 flex items-center justify-center text-xs">
                QR
              </div>
              <div>
                <p className="text-sm font-semibold">
                  Download the Free MSD Manuals App
                </p>
                <div className="flex gap-2 mt-2">
                  <div className="bg-black text-white text-xs px-3 py-1 rounded">
                    App Store
                  </div>
                  <div className="bg-black text-white text-xs px-3 py-1 rounded">
                    Google Play
                  </div>
                </div>
              </div>
            </div> */}
          </div>

        </div>
      </section>

      {/* Coming Soon Modal */}
      {isModalOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 z-50"
            onClick={closeModal}
          />
          
          {/* Modal */}
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg shadow-xl z-50">
            <div className="p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-[#1e5c75]">
                  {selectedLink}
                </h3>
                <button 
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-100 rounded-full transition cursor-pointer"
                >
                  <X size={20} className="text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="text-center py-8">
                <div className="mb-4">
                  <svg 
                    className="w-20 h-20 mx-auto text-[#1e5c75]" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                  Coming Soon!
                </h4>
                <p className="text-gray-600">
                  We're working hard to bring you this feature.
                </p>
                <p className="text-gray-600 mt-2">
                  Stay tuned for updates.
                </p>
              </div>

              {/* Footer */}
              <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 bg-[#1e5c75] text-white rounded hover:bg-[#0F3549] transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}