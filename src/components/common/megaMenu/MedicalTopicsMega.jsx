"use client";

export default function MedicalTopicsMega({ data, onItemClick }) {
  return (
    <div>
      <div className="mb-6">
        <h3 className="text-[#0F3549] font-bold mb-3 text-sm border-b pb-2">
          Index
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.sections[0].items.map((letter, idx) => (
            <button
              key={idx}
              onClick={() => onItemClick(letter)}
              className="text-gray-600 hover:text-[#1e5c75] text-sm font-medium w-7 h-7 flex items-center justify-center hover:bg-gray-100 rounded"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#0F3549] font-bold mb-3 text-sm border-b pb-2">
          Sections
        </h3>
        <div className="grid grid-cols-2 gap-8">
          {data.sections[1].columns.map((column, colIndex) => (
            <ul key={colIndex} className="space-y-2">
              {column.map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={() => onItemClick(item)}
                    className="text-gray-600 hover:text-[#1e5c75] text-sm"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
}