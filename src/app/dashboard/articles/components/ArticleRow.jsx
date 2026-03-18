import Link from "next/link";
import { AUTHORS, TOPICS } from "../page";


const getTopicById = (id) => TOPICS.find((t) => t.id === id);
const getSubtopicById = (topicId, subId) =>
  TOPICS.find((t) => t.id === topicId)?.subtopics.find((s) => s.id === subId);
const getAuthorById = (id, authors) => authors.find((a) => a.id === id);

// ─── Atoms ─────────────────────────────────────────────────────────────────────
const Badge = ({ status }) => (
  <span className={`inline-flex items-center gap-1 text-[10px] font-bold tracking-wider
    uppercase px-2 py-0.5 rounded-full border
    ${status === "published"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : "bg-amber-50 text-amber-700 border-amber-200"}`}>
    <span className={`w-1 h-1 rounded-full ${status === "published" ? "bg-emerald-500" : "bg-amber-500"}`} />
    {status}
  </span>
);

const Inp = ({ label, required, hint, ...props }) => (
  <div className="space-y-1.5">
    {label && (
      <label className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
        {hint && <span className="text-[10px] text-slate-400">{hint}</span>}
      </label>
    )}
    <input
      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl
        text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2
        focus:ring-red-400/30 focus:border-red-400 transition-all"
      {...props}
    />
  </div>
);

const Sel = ({ label, required, children, ...props }) => (
  <div className="space-y-1.5">
    {label && (
      <label className="block text-[11px] font-bold tracking-widest uppercase text-slate-500">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    )}
    <select
      className="w-full px-3 py-2.5 text-sm bg-white border border-slate-200 rounded-xl
        text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-400/30
        focus:border-red-400 transition-all"
      {...props}>
      {children}
    </select>
  </div>
);


export function ArticleRow({ article, onEdit, onDelete }) {
  const topic = getTopicById(article.topicId);
  const sub = getSubtopicById(article.topicId, article.subtopicId);
  const author = AUTHORS.find((a) => a.id === article.authorId);

  return (
    <tr className="group hover:bg-slate-50/80 transition-colors border-b border-slate-100
      last:border-0">
      {/* Title */}
      <td className="px-5 py-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center
            shrink-0 mt-0.5 group-hover:bg-red-50 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor"
              className="w-4 h-4 text-slate-400 group-hover:text-red-500 transition-colors">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-800 leading-tight truncate max-w-xs">
              {article.title}
            </p>
            <p className="text-xs font-mono text-slate-400 mt-0.5 truncate max-w-xs">
              /{article.slug}
            </p>
          </div>
        </div>
      </td>

      {/* Topic / Subtopic */}
      <td className="px-4 py-4 hidden md:table-cell">
        <div className="space-y-1">
          <p className="text-xs font-semibold text-slate-700 truncate max-w-[160px]">
            {topic?.title ?? "—"}
          </p>
          <p className="text-xs text-slate-400 truncate max-w-[160px]">
            {sub?.title ?? "—"}
          </p>
        </div>
      </td>

      {/* Author */}
      <td className="px-4 py-4 hidden lg:table-cell">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-red-600
            flex items-center justify-center shrink-0">
            <span className="text-white text-[10px] font-bold">
              {author?.name.split(" ").map((n) => n[0]).slice(0, 2).join("") ?? "?"}
            </span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate max-w-[120px]">
              {author?.name ?? "—"}
            </p>
            <p className="text-[10px] text-slate-400">{author?.designation}</p>
          </div>
        </div>
      </td>

      {/* Status */}
      <td className="px-4 py-4">
        <Badge status={article.status} />
      </td>

      {/* Updated */}
      <td className="px-4 py-4 hidden sm:table-cell">
        <span className="text-xs text-slate-400">{article.updatedAt}</span>
      </td>

      {/* Actions */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-1 justify-end">
          <Link
            href={'/dashboard/articles/new'}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400
              hover:bg-blue-50 hover:text-blue-600 transition-colors" title="Edit">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
            </svg>
          </Link>
          <button onClick={() => onDelete(article)}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400
              hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </td>
    </tr>
  );
}
