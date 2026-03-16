"use client"
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { toPascalCaseAlpha } from "./page";
import { chapters } from "./data";

const MultimediaIcon = () => (
  <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="1.5" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 21h8M12 17v4" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10 10l4-2.5v5L10 10z" />
  </svg>
);

const Arrow = ({ className = "" }) => (
  <span className={`text-sm select-none ${className}`}>→</span>
);

const inThisTopic = [
  { label: "Immune Response", icon: <Arrow className="text-gray-400" /> },
  { label: "Geriatrics Essentials", icon: <Arrow className="text-gray-400" /> },
  { label: "Multimedia", icon: <MultimediaIcon /> },
];

// const otherTopics = [
//   "Overview of the Immune System",
//   "Cellular Components of the Immune System",
//   "Molecular Components of the Immune System",
//   "Human Leukocyte Antigen (HLA) System",
//   "Complement System",
//   "Immunotherapeutics",
// ];

export function slugToPascalCase(str) {
  return str
    ?.replace(/[^a-zA-Z-]/g, "")   // keep only letters and hyphen
    ?.split("-")
    ?.filter(Boolean)
    ?.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    ?.join("");
}
export default function Sidebar() {
  const { chapter, slug } = useParams()
  const ch = slugToPascalCase(chapter)
  console.log(ch)
  const otherTopics = chapters[ch]
  const searchParams = useSearchParams()
  const param = searchParams?.get('topic') || otherTopics?.[0]

  const topic = toPascalCaseAlpha(param)
  return (
    <div className="w-64 font-sans flex flex-col gap-4">

      {/* In This Topic */}
      {/* <div className="border border-gray-200">
        <div className="bg-gray-600 px-4 py-2.5 flex items-center justify-between">
          <span className="text-xs font-bold tracking-widest text-white uppercase">In This Topic</span>
          <span className="text-white text-lg leading-none">−</span>
        </div>
        <div className="px-3 py-3 flex flex-col gap-2">
          {inThisTopic.map(({ label, icon }) => (
            <div key={label} className="flex items-center gap-2 cursor-pointer group">
              <span className="flex-shrink-0">{icon}</span>
              <span className="text-sm text-red-700 font-medium group-hover:underline">{label}</span>
            </div>
          ))}
        </div>
      </div> */}

      {/* Other Topics in This Chapter */}
      <div className="border border-gray-200">
        <div className="bg-gray-600 px-4 py-2.5">
          <span className="text-xs font-bold tracking-widest text-white uppercase">Other Topics in This Chapter</span>
        </div>
        <div className="px-3 py-3 flex flex-col gap-2">
          {otherTopics.map(label => (
            <Link key={label} href={`/medical-topics/${slug}/${chapter}?topic=${label?.toLowerCase()}`} className="flex items-start gap-2 cursor-pointer group">
              <Arrow className={`mt-0.5 flex-shrink-0 ${topic === toPascalCaseAlpha(label) ? "text-gray-700" : "text-gray-400"}`} />
              <span
                className={`text-sm leading-snug ${topic === toPascalCaseAlpha(label)
                  ? "text-red-800 font-bold underline"
                  : "text-red-700 font-medium group-hover:underline"
                  }`}
              >
                {label}
              </span>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}