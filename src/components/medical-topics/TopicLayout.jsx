"use client";
import { useState } from "react";
import Image from "next/image";

export default function TopicLayout({ data }) {
  const [openIndex, setOpenIndex] = useState(null);
 
  console.log("Topic: ", data)

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-8">

        {/* LEFT SIDE */}
        <div className="flex-1">
          <h1 className="text-3xl font-semibold mb-6">
            {data.title}
          </h1>

          {data.sections.map((section, index) => (
            <div key={index} className="mb-4 border-b pb-2">
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className="flex justify-between w-full text-left font-medium"
              >
                {section.title}
                <span>{openIndex === index ? "-" : "+"}</span>
              </button>

              {openIndex === index && section.children && (
                <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-700">
                  {section.children.map((child, i) => (
                    <li key={i}>• {child.title || child}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-96 relative h-80">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
}