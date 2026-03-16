"use client"
const TablePreviewIcon = () => (
    <svg width="56" height="44" viewBox="0 0 56 44" xmlns="http://www.w3.org/2000/svg">
        {/* Header row */}
        <rect x="2" y="2" width="52" height="10" rx="1" fill="#c0392b" />
        {/* Row 1 */}
        <rect x="2" y="14" width="25" height="8" rx="1" fill="#e8e8e8" />
        <rect x="29" y="14" width="25" height="8" rx="1" fill="#e8e8e8" />
        {/* Row 2 */}
        <rect x="2" y="24" width="25" height="8" rx="1" fill="#f4f4f4" />
        <rect x="29" y="24" width="25" height="8" rx="1" fill="#f4f4f4" />
        {/* Row 3 */}
        <rect x="2" y="34" width="25" height="8" rx="1" fill="#e8e8e8" />
        <rect x="29" y="34" width="25" height="8" rx="1" fill="#e8e8e8" />
    </svg>
);

export default function TableCard({ content }) {
    return (
        <div className="w-56 my-5 border border-blue-200 rounded-xl bg-blue-50 p-4 font-sans">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Table</p>
            <div className="flex items-start justify-between gap-3">
                <div className="text-left">
                    {
                    content?.map(link => {
                        return <button onClick={() => console.log(link?.id)} className="text-sm text-left font-medium text-red-700 underline underline-offset-2 hover:text-red-900 leading-snug">
                            {link?.text}
                        </button>
                    })
                }
                </div>

                <div className="flex-shrink-0 border border-gray-200 rounded overflow-hidden bg-white">
                    <TablePreviewIcon />
                </div>
            </div>
        </div>
    );
}