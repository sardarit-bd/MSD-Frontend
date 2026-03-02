"use client";

import Link from "next/link";

export default function MedicalTopicsMega({
  data,
  onItemClick,
  isMobile = false,
}) {
  if (!data || !data.sections || !data.sections[0] || !data.sections[1]) {
    return (
      <div className={isMobile ? "px-2" : ""}>
        <div className="text-gray-500 text-sm">
          Loading medical topics...
        </div>
      </div>
    );
  }

  const alphabetItems = data.sections[0]?.items || [];

  const sectionsData = data.sections[1] || { columns: [[], []] };
  const firstColumn = sectionsData.columns?.[0] || [];
  const secondColumn = sectionsData.columns?.[1] || [];

  return (
    <div className={isMobile ? "px-2" : ""}>
      {/* INDEX */}
      {alphabetItems.length > 0 && (
        <div className="mb-4 lg:mb-6">
          <h3 className="text-[#0F3549] font-bold mb-2 lg:mb-3 text-xs lg:text-sm border-b pb-1 lg:pb-2">
            Index
          </h3>

          <div className="flex flex-wrap gap-1 lg:gap-2">
            {alphabetItems.map((letter, idx) => (
              <button
                key={idx}
                onClick={() => onItemClick(letter)}
                className={`text-gray-600 hover:text-[#1e5c75] font-medium 
                  hover:bg-gray-100 rounded transition
                  ${
                    isMobile
                      ? "text-xs w-6 h-6"
                      : "text-sm w-7 h-7 lg:w-8 lg:h-8"
                  }
                  flex items-center justify-center`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* SECTIONS */}
      {(firstColumn.length > 0 || secondColumn.length > 0) && (
        <div>
          <h3 className="text-[#0F3549] font-bold mb-2 lg:mb-3 text-xs lg:text-sm border-b pb-1 lg:pb-2">
            Sections
          </h3>

          {/* MOBILE VIEW */}
          {isMobile ? (
            <div className="space-y-4">
              <ul className="space-y-2">
                {[...firstColumn, ...secondColumn].map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`/medical-topics/${item.slug}`}
                      className="text-gray-600 hover:text-[#1e5c75] text-xs block py-1"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            /* DESKTOP VIEW */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
              {/* FIRST COLUMN */}
              <div>
                <ul className="space-y-1 lg:space-y-2">
                  {firstColumn.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/medical-topics/${item.slug}`}
                        className="text-gray-600 hover:text-[#1e5c75] text-xs lg:text-sm"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* SECOND COLUMN */}
              <div>
                <ul className="space-y-1 lg:space-y-2">
                  {secondColumn.map((item, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/medical-topics/${item.slug}`}
                        className="text-gray-600 hover:text-[#1e5c75] text-xs lg:text-sm"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}