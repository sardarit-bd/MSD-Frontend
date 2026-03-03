"use client";

import Link from "next/link";

const generateSlug = (text) =>
  text
    .toLowerCase()
    .replace(/;/g, "")
    .replace(/,/g, "")
    .replace(/\s+/g, "-");

export default function MedicalTopicsMega({ data }) {
  return (
    <div>

      <div>
        <h3 className="text-[#0F3549] font-bold mb-3 text-sm border-b pb-2">
          Sections
        </h3>

        <div className="grid grid-cols-2 gap-8">
          {data.sections[1].columns.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-2">
              {column.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={`/medical-topics/${generateSlug(item)}`}
                    className="text-gray-600 hover:text-[#1e5c75] text-sm"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}