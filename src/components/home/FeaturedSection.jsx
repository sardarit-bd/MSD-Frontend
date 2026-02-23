"use client";

import { ChevronRight } from "lucide-react";

export default function FeaturedSection() {
  return (
    <section className="bg-[#f2f2f2] py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8">
        
        {/* LEFT SIDE - Featured Content */}
        <div className="col-span-2">
          <h2 className="text-sm font-bold tracking-widest text-gray-600 mb-4">
            FEATURED CONTENT
          </h2>

          <div className="bg-white grid grid-cols-2 shadow-sm">
            
            {/* Image */}
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1588776814546-b8e4c3a6e2b5"
                alt="Sore Throat"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800">
                  Sore Throat
                </h3>

                <p className="text-sm italic mt-2 text-gray-600">
                  <strong>Marvin P. Fried</strong><br />
                  MD, Montefiore Medical Center, The University Hospital of
                  Albert Einstein College of Medicine
                </p>

                <p className="text-sm text-gray-700 mt-4 leading-relaxed">
                  Sore throat is pain in the posterior pharynx that occurs with
                  or without swallowing. Pain can be severe; many patients
                  refuse oral intake. Sore throat results from infection; the
                  most common...
                </p>

                <p className="text-red-600 text-sm mt-3 cursor-pointer">
                  Read All
                </p>
              </div>

              {/* Slider Dots */}
              <div className="flex gap-2 mt-4">
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                <span className="w-3 h-3 bg-gray-400 rounded-full"></span>
                <span className="w-3 h-3 bg-[#1e5c75] rounded-full"></span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE - Quick Links */}
        <div>
          <h2 className="text-sm font-bold tracking-widest text-gray-600 mb-4">
            QUICK LINKS
          </h2>

          <div className="bg-white p-6 shadow-sm space-y-4">
            {[
              "CLINICAL CALCULATORS",
              "NORMAL LAB VALUE",
              "PROCEDURE & EXAM VIDEOS",
              "OTHER RESOURCES",
            ].map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border rounded px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                <span>{item}</span>
                <ChevronRight size={18} />
              </div>
            ))}
          </div>

          {/* App Download Section */}
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
  );
}