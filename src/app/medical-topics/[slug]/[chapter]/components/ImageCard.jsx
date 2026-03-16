import Image from "next/image";

const ExpandIcon = () => (
  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
  </svg>
);

const ImmuneDiagram = () => (
  <svg viewBox="0 0 280 320" className="w-full" xmlns="http://www.w3.org/2000/svg">
    {/* Background */}
    <rect width="280" height="320" fill="white" />

    {/* Title */}
    <text x="140" y="18" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#111">CELLULAR COMPONENTS</text>
    <text x="140" y="29" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#111">OF THE IMMUNE SYSTEM</text>

    {/* Small description text */}
    <text x="140" y="41" textAnchor="middle" fontSize="5" fill="#555">The immune system distinguishes self from nonself and eliminates potentially harmful</text>
    <text x="140" y="48" textAnchor="middle" fontSize="5" fill="#555">nonself molecules and cells from the body. The immune system also has the capacity</text>
    <text x="140" y="55" textAnchor="middle" fontSize="5" fill="#555">to recognize and destroy abnormal cells that derive from host tissues. Any molecule</text>
    <text x="140" y="62" textAnchor="middle" fontSize="5" fill="#555">capable of being recognized by the immune system is considered an antigen.</text>

    {/* Immune System box */}
    <rect x="90" y="70" width="100" height="18" rx="3" fill="white" stroke="#333" strokeWidth="1" />
    <text x="140" y="83" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111">Immune System</text>

    {/* Arrow down */}
    <line x1="140" y1="88" x2="140" y2="98" stroke="#333" strokeWidth="1" markerEnd="url(#arrow)" />

    {/* Outer Surfaces box */}
    <rect x="75" y="98" width="130" height="22" rx="3" fill="white" stroke="#333" strokeWidth="1" />
    <text x="140" y="109" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#333">Outer Surfaces</text>
    <text x="140" y="118" textAnchor="middle" fontSize="5.5" fill="#555">Steps infection before an immune system response</text>

    {/* Arrow down */}
    <line x1="140" y1="120" x2="140" y2="130" stroke="#333" strokeWidth="1" />
    <polygon points="136,129 144,129 140,134" fill="#333" />

    {/* Innate Immunity box */}
    <rect x="85" y="134" width="110" height="18" rx="3" fill="white" stroke="#333" strokeWidth="1" />
    <text x="140" y="147" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#111">Innate Immunity</text>

    {/* Three columns under Innate */}
    {/* Left: Phagocytic cells */}
    <line x1="100" y1="152" x2="60" y2="162" stroke="#333" strokeWidth="0.8" />
    <rect x="18" y="162" width="85" height="16" rx="2" fill="white" stroke="#333" strokeWidth="0.8" />
    <text x="60" y="173" textAnchor="middle" fontSize="6.5" fontWeight="bold" fill="#333">Phagocytic cells</text>

    {/* Middle: Polymorphonuclear */}
    <line x1="140" y1="152" x2="140" y2="162" stroke="#333" strokeWidth="0.8" />
    <rect x="97" y="162" width="86" height="16" rx="2" fill="white" stroke="#333" strokeWidth="0.8" />
    <text x="140" y="170" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#333">Polymorphonuclear</text>
    <text x="140" y="176" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#333">Leukocytes</text>

    {/* Right: Innate Lymphoid */}
    <line x1="180" y1="152" x2="220" y2="162" stroke="#333" strokeWidth="0.8" />
    <rect x="178" y="162" width="85" height="16" rx="2" fill="white" stroke="#333" strokeWidth="0.8" />
    <text x="220" y="170" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#333">Innate Lymphoid</text>
    <text x="220" y="176" textAnchor="middle" fontSize="5.5" fontWeight="bold" fill="#333">Cells</text>

    {/* Left sub-items */}
    <circle cx="25" cy="186" r="3" fill="none" stroke="#e53e3e" strokeWidth="0.8" />
    <text x="31" y="189" fontSize="5.5" fill="#333">Neutrophils</text>
    <circle cx="25" cy="195" r="3" fill="none" stroke="#e53e3e" strokeWidth="0.8" />
    <text x="31" y="198" fontSize="5.5" fill="#333">Monocytes</text>
    <circle cx="25" cy="204" r="3" fill="none" stroke="#e53e3e" strokeWidth="0.8" />
    <text x="31" y="207" fontSize="5.5" fill="#333">Macrophages</text>

    {/* Middle sub-items */}
    <circle cx="103" cy="186" r="3" fill="none" stroke="#2b6cb0" strokeWidth="0.8" />
    <text x="109" y="189" fontSize="5" fill="#333">Polymorphonuclear</text>
    <circle cx="103" cy="195" r="3" fill="none" stroke="#2b6cb0" strokeWidth="0.8" />
    <text x="109" y="198" fontSize="5.5" fill="#333">Leukocytes</text>
    <circle cx="103" cy="204" r="3" fill="none" stroke="#2b6cb0" strokeWidth="0.8" />
    <text x="109" y="207" fontSize="5.5" fill="#333">Basophils</text>

    {/* Right sub-item */}
    <circle cx="185" cy="186" r="3" fill="none" stroke="#333" strokeWidth="0.8" />
    <text x="191" y="189" fontSize="5.5" fill="#333">Natural Killer Cells</text>

    {/* Arrow down to Acquired */}
    <line x1="140" y1="210" x2="140" y2="220" stroke="#333" strokeWidth="1" />
    <polygon points="136,219 144,219 140,224" fill="#333" />

    {/* Acquired Immunity box */}
    <rect x="75" y="224" width="130" height="18" rx="3" fill="white" stroke="#333" strokeWidth="1" />
    <text x="140" y="234" textAnchor="middle" fontSize="7" fill="#555">Can respond nearly immediately with the innate immune response</text>
    <text x="140" y="241" textAnchor="middle" fontSize="7.5" fontWeight="bold" fill="#111">Acquired Immunity</text>

    {/* Two columns */}
    <line x1="110" y1="242" x2="80" y2="256" stroke="#333" strokeWidth="0.8" />
    <line x1="170" y1="242" x2="200" y2="256" stroke="#333" strokeWidth="0.8" />

    {/* Humoral Immunity */}
    <rect x="18" y="256" width="125" height="28" rx="2" fill="white" stroke="#333" strokeWidth="0.8" />
    <text x="80" y="267" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#333">Humoral Immunity</text>
    <text x="80" y="276" textAnchor="middle" fontSize="5.5" fill="#555">(B cells → plasma cells</text>
    <text x="80" y="282" textAnchor="middle" fontSize="5.5" fill="#555">Includes plasma cells)</text>

    {/* Cell-Mediated Immunity */}
    <rect x="138" y="256" width="125" height="28" rx="2" fill="white" stroke="#333" strokeWidth="0.8" />
    <text x="200" y="267" textAnchor="middle" fontSize="7" fontWeight="bold" fill="#333">Cell-Mediated Immunity</text>
    <text x="200" y="276" textAnchor="middle" fontSize="5.5" fill="#555">T-cell responses</text>

    {/* Arrow defs */}
    <defs>
      <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
        <path d="M0,0 L0,6 L6,3 z" fill="#333" />
      </marker>
    </defs>
  </svg>
);

export default function ImageCard({content}) {
  return (
    <div className="w-full my-5 border border-gray-200 rounded-lg overflow-hidden shadow-sm font-sans bg-white">
      {/* Header */}
      <div className="flex items-start justify-between p-3 gap-2">
        <h3 className="text-sm font-bold text-cyan-700 leading-snug">
          {content?.title}
        </h3>
        <button className="flex-shrink-0 bg-teal-600 hover:bg-teal-700 p-1.5 rounded transition-colors">
          <ExpandIcon />
        </button>
      </div>

 <div className="px-3 py-3 text-center">
        <p className="text-xs text-gray-600 leading-snug">
          <div dangerouslySetInnerHTML={{ __html: content?.content }}></div>
        </p>
      </div>

      {/* Image area */}
      <div className="relative mx-3 mb-1 border border-gray-200 rounded overflow-hidden">
        {/* IMAGE badge */}
        <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2 py-0.5 z-10">
          IMAGE
        </div>
        {/* Diagram */}
        <div className="bg-white pt-1">
         <Image src={content?.image} width={500} height={500}></Image>
        </div>
      </div>

      {/* Copyright */}
      <div className="px-3 py-3 text-center">
        <p className="text-xs text-gray-600 leading-snug">
          {content?.footer}
        </p>
      </div>
    </div>
  );
}