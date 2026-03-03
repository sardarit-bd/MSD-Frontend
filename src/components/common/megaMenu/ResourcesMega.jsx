"use client";

import Image from "next/image";

export default function ResourcesMega({ data, onItemClick }) {
  return (
    <div className="space-y-8">

      {/* Top Card Grid */}
      <div className="grid grid-cols-6 gap-6">
        {[
          { name: "3D Models", img: "/resource/resource-3d.jpg" },
          { name: "Audio", img: "/resource/resource-audio.png" },
          { name: "Figures", img: "/resource/resource-figures.gif" },
          { name: "Images", img: "/resource/resource-images.jpg" },
          { name: "Tables", img: "/resource/resource-tables.png" },
          { name: "Videos", img: "/resource/resource-videos.jpg" },
        ].map((item, index) => (
          <div key={index} className="text-center cursor-pointer">
            <div className="relative w-full h-32 border">
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <p className="text-red-600 text-sm mt-2 font-semibold">
              {item.name}
            </p>
          </div>
        ))}
      </div>

      {/* Other Useful Resources */}
      <div>
        <h3 className="text-[#0F3549] text-lg font-semibold mb-4">
          Other Useful Resources
        </h3>

        <div className="grid grid-cols-4 gap-6 text-red-600 text-sm">
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
              className="text-left hover:underline"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}