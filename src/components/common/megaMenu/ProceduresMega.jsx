"use client";

import Image from "next/image";

export default function ProceduresMega({ data, onItemClick, isMobile = false }) {
  return (
    <div className={`
      space-y-6 lg:space-y-8 
      ${isMobile ? "max-h-[400px]" : "max-h-[500px] lg:max-h-[600px]"} 
      overflow-y-auto pr-2 lg:pr-3
    `}>

      <h3 className={`
        text-[#0F3549] font-semibold border-b pb-2 lg:pb-3
        ${isMobile ? "text-base" : "text-base lg:text-lg"}
      `}>
        Procedures & Exams
      </h3>

      {data.categories.map((category, index) => (
        <div key={index} className="border-b pb-4 lg:pb-6 last:border-0">

          <h4 className={`
            text-[#0F3549] font-semibold mb-3 lg:mb-4
            ${isMobile ? "text-sm" : "text-sm lg:text-base"}
          `}>
            {category.title} ({category.count})
          </h4>

          {/* Mobile Layout */}
          {isMobile ? (
            <div className="space-y-4">
              {/* Category Image */}
              <div className="relative w-full h-40">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover rounded"
                />
              </div>

              {/* Procedure List */}
              <div className="grid grid-cols-1 gap-2">
                {category.items.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => onItemClick(item)}
                    className="text-left text-red-600 text-xs hover:underline py-1 border-b border-gray-100 last:border-0"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Desktop/Tablet Layout */
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-6">
              {/* Category Image */}
              <div className="relative w-full h-28 lg:h-32">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover rounded hover:scale-105 transition"
                />
              </div>

              {/* Procedure List */}
              <div className="col-span-1 md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 lg:gap-x-6 gap-y-1 lg:gap-y-2">
                  {category.items.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => onItemClick(item)}
                      className="text-left text-red-600 text-xs lg:text-sm hover:underline hover:text-red-700 transition py-0.5"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      ))}

    </div>
  );
}