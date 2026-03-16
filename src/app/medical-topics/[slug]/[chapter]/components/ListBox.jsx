const pearlsData = {
    title: "Pearls & Pitfalls",
    items: [
        "Splint displaced supracondylar humeral fractures in the position that they are in; do not try to reduce them.",
    ]
}

export default function ListBox({ data = pearlsData }) {
  return (
    <div className="max-w-xs border border-blue-200 rounded-lg bg-blue-50 px-4 pt-3 pb-4 font-sans">
      <p className="text-sm font-bold text-gray-800 mb-2">{data?.title}</p>
      <ul className="list-disc list-outside ml-4 space-y-1">
        {data?.items.map((item, i) => (
          <li key={i} className="text-sm text-gray-700 leading-snug">{item}</li>
        ))}
      </ul>
    </div>
  );
}