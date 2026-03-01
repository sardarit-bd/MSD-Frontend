"use client";

export default function MedicalTopicsMega({ data, onItemClick, isMobile = false }) {
  return (
    <div className={isMobile ? "px-2" : ""}>
      {/* Index Section - Responsive */}
      <div className="mb-4 lg:mb-6">
        <h3 className="text-[#0F3549] font-bold mb-2 lg:mb-3 text-xs lg:text-sm border-b pb-1 lg:pb-2">
          Index
        </h3>
        <div className="flex flex-wrap gap-1 lg:gap-2">
          {data.sections[0].items.map((letter, idx) => (
            <button
              key={idx}
              onClick={() => onItemClick(letter)}
              className={`
                text-gray-600 hover:text-[#1e5c75] font-medium 
                hover:bg-gray-100 rounded transition
                ${isMobile 
                  ? "text-xs w-6 h-6" 
                  : "text-sm w-7 h-7 lg:w-8 lg:h-8"
                }
                flex items-center justify-center
              `}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Sections Section - Responsive Grid */}
      <div>
        <h3 className="text-[#0F3549] font-bold mb-2 lg:mb-3 text-xs lg:text-sm border-b pb-1 lg:pb-2">
          Sections
        </h3>
        
        {/* Mobile View - Single Column */}
        {isMobile ? (
          <div className="space-y-4">
            {data.sections[1].columns.map((column, colIndex) => (
              <div key={colIndex}>
                {colIndex === 1 && (
                  <h4 className="text-[#0F3549] font-semibold text-xs mb-2 mt-2">
                    Inquiries; Poisoning
                  </h4>
                )}
                <ul className="space-y-2">
                  {column.map((item, idx) => (
                    <li key={idx}>
                      <button
                        onClick={() => onItemClick(item)}
                        className="text-gray-600 hover:text-[#1e5c75] text-xs lg:text-sm text-left w-full py-1"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          /* Desktop/Tablet View - Two Columns */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
            {/* First Column */}
            <div>
              <ul className="space-y-1 lg:space-y-2">
                {data.sections[1].columns[0].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onItemClick(item)}
                      className="text-gray-600 hover:text-[#1e5c75] text-xs lg:text-sm text-left py-0.5 lg:py-1"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Second Column */}
            <div>
              <h4 className="text-[#0F3549] font-semibold text-xs lg:text-sm mb-1 lg:mb-2">
                Inquiries; Poisoning
              </h4>
              <ul className="space-y-1 lg:space-y-2">
                {data.sections[1].columns[1].map((item, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => onItemClick(item)}
                      className="text-gray-600 hover:text-[#1e5c75] text-xs lg:text-sm text-left py-0.5 lg:py-1"
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}