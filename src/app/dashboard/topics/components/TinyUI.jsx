import { useEffect } from "react";

export const Badge = ({ status }) => (
  <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wider
    uppercase px-2 py-0.5 rounded-full
    ${status === "published"
      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
      : "bg-amber-50 text-amber-700 border border-amber-200"}`}>
    <span className={`w-1 h-1 rounded-full ${status === "published" ? "bg-emerald-500" : "bg-amber-500"}`} />
    {status}
  </span>
);

export const Input = ({ label, required, ...props }) => (
  <div className="space-y-1.5">
    {label && (
      <label className="block text-[11px] font-bold tracking-widest uppercase text-slate-500">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <input
      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg
        text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2
        focus:ring-red-400/30 focus:border-red-400 transition-all"
      {...props}
    />
  </div>
);

export const Textarea = ({ label, ...props }) => (
  <div className="space-y-1.5">
    {label && (
      <label className="block text-[11px] font-bold tracking-widest uppercase text-slate-500">
        {label}
      </label>
    )}
    <textarea
      rows={3}
      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg
        text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2
        focus:ring-red-400/30 focus:border-red-400 transition-all resize-none"
      {...props}
    />
  </div>
);

export const Select = ({ label, children, ...props }) => (
  <div className="space-y-1.5">
    {label && (
      <label className="block text-[11px] font-bold tracking-widest uppercase text-slate-500">
        {label}
      </label>
    )}
    <select
      className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg
        text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400/30
        focus:border-red-400 transition-all"
      {...props}
    >
      {children}
    </select>
  </div>
);

// ─── Modal ─────────────────────────────────────────────────────────────────────
export function Modal({ open, onClose, title, children, maxWidth = "max-w-lg" }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    if (open) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-white rounded-2xl shadow-2xl w-full ${maxWidth}
        max-h-[90vh] flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-200`}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-base font-bold text-slate-800">{title}</h2>
          <button onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400
              hover:bg-slate-100 hover:text-slate-700 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        </div>
        <div className="overflow-y-auto flex-1 px-5 py-4">{children}</div>
      </div>
    </div>
  );
}

// ─── Confirm Dialog ────────────────────────────────────────────────────────────
export function ConfirmDialog({ open, onClose, onConfirm, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-slate-800 text-sm">Confirm Delete</p>
            <p className="text-sm text-slate-500 mt-0.5">{message}</p>
          </div>
        </div>
        <div className="flex gap-2 pt-1">
          <button onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100
              hover:bg-slate-200 rounded-lg transition-colors">
            Cancel
          </button>
          <button onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-red-600
              hover:bg-red-700 rounded-lg transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}