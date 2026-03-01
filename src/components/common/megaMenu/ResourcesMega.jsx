"use client";

import Image from "next/image";

export default function ResourcesMega({ data, onItemClick, isMobile = false }) {
  return (
    <div className="space-y-6 lg:space-y-8">

      {/* Top Card Grid - Responsive */}
      <div className={`
        grid gap-3 lg:gap-6
        ${isMobile 
          ? "grid-cols-3" 
          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
        }
      `}>
        {[
          { name: "3D Models", img: "/resource/resource-3d.jpg" },
          { name: "Audio", img: "/resource/resource-audio.png" },
          { name: "Figures", img: "/resource/resource-figures.gif" },
          { name: "Images", img: "/resource/resource-images.jpg" },
          { name: "Tables", img: "/resource/resource-tables.png" },
          { name: "Videos", img: "/resource/resource-videos.jpg" },
        ].map((item, index) => (
          <div 
            key={index} 
            onClick={() => onItemClick(item.name)}
            className="text-center cursor-pointer group"
          >
            <div className={`
              relative w-full border rounded-lg overflow-hidden
              ${isMobile ? "h-20" : "h-24 sm:h-28 lg:h-32"}
              group-hover:shadow-lg transition
            `}>
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-105 transition"
              />
            </div>
            <p className={`
              text-red-600 mt-1 lg:mt-2 font-semibold
              ${isMobile ? "text-xs" : "text-xs sm:text-sm"}
              group-hover:text-red-700 transition
            `}>
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* Other Useful Resources - Responsive */}
      <div>
        <h3 className={`
          text-[#0F3549] font-semibold mb-3 lg:mb-4
          ${isMobile ? "text-base" : "text-base lg:text-lg"}
        `}>
          Other Useful Resources
        </h3>

        <div className={`
          grid gap-2 lg:gap-6 text-red-600
          ${isMobile 
            ? "grid-cols-2 text-xs" 
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 text-xs lg:text-sm"
          }
        `}>
          {[
            "Abbreviations",
            "Case Studies",
            "Clinical Calculators",
            "Quizzes",
            "Unit of Measure Conversions",
            "Normal Laboratory Values",
            "Symptoms"
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => onItemClick(item)}
              className={`
                text-left hover:underline 
                ${isMobile 
                  ? "py-1.5" 
                  : "py-1 lg:py-0.5 hover:text-red-700"
                }
                transition
              `}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}