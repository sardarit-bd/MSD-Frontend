"use client";

import Image from "next/image";

export default function CommentaryMega({ data, onItemClick }) {
  return (
    <div className="space-y-6">

      <h3 className="text-[#0F3549] text-lg font-semibold border-b pb-3">
        Commentary
      </h3>

      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {data.articles.map((article, index) => (
          <div
            key={index}
            className="flex gap-4 p-3 hover:bg-gray-50 cursor-pointer transition"
            onClick={() => onItemClick(article.title)}
          >
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover rounded"
              />
            </div>

            <div>
              <span className="text-xs text-red-600 font-semibold uppercase">
                {article.category}
              </span>

              <h4 className="text-sm font-semibold text-[#0F3549] mt-1">
                {article.title}
              </h4>

              <p className="text-xs text-gray-500 mt-1">
                {article.date}
              </p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}