"use client";

import Image from "next/image";

export default function ProceduresMega({ data, onItemClick }) {
  return (
    <div className="space-y-8 max-h-[600px] overflow-y-auto pr-3">

      <h3 className="text-[#0F3549] text-lg font-semibold border-b pb-3">
        Procedures & Exams
      </h3>

      {data.categories.map((category, index) => (
        <div key={index} className="border-b pb-6">

          <h4 className="text-[#0F3549] font-semibold mb-4">
            {category.title} ({category.count})
          </h4>

          <div className="grid grid-cols-4 gap-6">
            
            {/* Category Image */}
            <div className="relative w-full h-32">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover rounded"
              />
            </div>

            {/* Procedure List */}
            <div className="col-span-3 grid grid-cols-2 gap-x-6 gap-y-2">
              {category.items.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onItemClick(item)}
                  className="text-left text-red-600 text-sm hover:underline"
                >
                  {item}
                </button>
              ))}
            </div>

          </div>
        </div>
      ))}

    </div>
  );
}