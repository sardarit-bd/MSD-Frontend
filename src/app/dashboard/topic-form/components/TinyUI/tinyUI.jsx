export const Label = ({ children, required }) => (
  <label className="block text-xs font-semibold tracking-widest uppercase text-slate-500 mb-1.5">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

export const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg
      text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2
      focus:ring-red-500/30 focus:border-red-400 transition-all ${className}`}
    {...props}
  />
);

export const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg
      text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2
      focus:ring-red-500/30 focus:border-red-400 transition-all resize-none ${className}`}
    {...props}
  />
);

export const Select = ({ children, className = "", ...props }) => (
  <select
    className={`w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg
      text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500/30
      focus:border-red-400 transition-all ${className}`}
    {...props}
  >
    {children}
  </select>
);

export const IconBtn = ({ onClick, title, danger, children }) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={`p-1.5 rounded-md transition-colors text-xs font-medium
      ${danger
        ? "text-red-400 hover:bg-red-50 hover:text-red-600"
        : "text-slate-400 hover:bg-slate-100 hover:text-slate-600"
      }`}
  >
    {children}
  </button>
);

export const AddBtn = ({ onClick, children }) => (
  <button
    type="button"
    onClick={onClick}
    className="flex items-center gap-1.5 text-xs font-semibold text-red-600
      hover:text-red-700 transition-colors py-1 px-2 rounded-md hover:bg-red-50"
  >
    <span className="text-base leading-none">+</span> {children}
  </button>
);

export const SectionCard = ({ label, onRemove, children, accent = false }) => (
  <div className={`relative border rounded-xl overflow-hidden
    ${accent ? "border-red-200 bg-red-50/30" : "border-slate-200 bg-white"}`}>
    <div className={`flex items-center justify-between px-4 py-2.5 border-b
      ${accent ? "border-red-200 bg-red-50/50" : "border-slate-100 bg-slate-50"}`}>
      <span className="text-xs font-bold tracking-widest uppercase text-slate-500">{label}</span>
      {onRemove && (
        <IconBtn onClick={onRemove} title="Remove" danger>✕</IconBtn>
      )}
    </div>
    <div className="p-4 space-y-4">{children}</div>
  </div>
);

export const Divider = () => <div className="border-t border-slate-100 my-1" />;
