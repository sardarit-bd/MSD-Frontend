"use client";

import Image from "next/image";

export default function CommentaryMega({ data, onItemClick, isMobile = false }) {
  return (
    <div className="space-y-4 lg:space-y-6">

      <h3 className={`
        text-[#0F3549] font-semibold border-b pb-2 lg:pb-3
        ${isMobile ? "text-base" : "text-base lg:text-lg"}
      `}>
        Commentary
      </h3>

      <div className={`
        space-y-3 lg:space-y-4 
        ${isMobile ? "max-h-[350px]" : "max-h-[350px] lg:max-h-[400px]"} 
        overflow-y-auto pr-1 lg:pr-2
      `}>
        {data.articles.map((article, index) => (
          <div
            key={index}
            className={`
              flex gap-3 lg:gap-4 p-2 lg:p-3 
              hover:bg-gray-50 cursor-pointer 
              transition rounded
              ${isMobile ? "flex-col" : "flex-row"}
            `}
            onClick={() => onItemClick(article.title)}
          >
            {/* Image - Responsive */}
            <div className={`
              relative flex-shrink-0
              ${isMobile 
                ? "w-full h-32" 
                : "w-16 h-16 lg:w-20 lg:h-20"
              }
            `}>
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover rounded hover:scale-105 transition"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              {/* Category - Responsive */}
              <span className={`
                text-red-600 font-semibold uppercase
                ${isMobile ? "text-[10px]" : "text-[10px] lg:text-xs"}
              `}>
                {article.category}
              </span>

              {/* Title - Responsive */}
              <h4 className={`
                font-semibold text-[#0F3549] mt-0.5 lg:mt-1
                ${isMobile ? "text-sm" : "text-sm lg:text-base"}
              `}>
                {article.title}
              </h4>

              {/* Date - Responsive */}
              <p className={`
                text-gray-500 mt-0.5 lg:mt-1
                ${isMobile ? "text-[10px]" : "text-[10px] lg:text-xs"}
              `}>
                {article.date}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}