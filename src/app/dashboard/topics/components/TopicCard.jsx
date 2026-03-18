import { useState } from "react";
import { Badge } from "./TinyUI";

export function SubtopicRow({ sub, onEdit, onDelete, onToggleStatus }) {
  return (
    <div className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-slate-50
      group transition-colors border border-transparent hover:border-slate-100">
      <div className="w-5 h-5 rounded-md bg-slate-100 flex items-center justify-center shrink-0">
        <span className="text-[10px] font-bold text-slate-500">{sub.order}</span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-slate-800 truncate">{sub.title}</p>
      </div>
      <Badge status={sub.status} />
      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => onToggleStatus(sub.id)}
          title="Toggle status"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400
            hover:bg-slate-200 hover:text-emerald-600 transition-colors">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
          </svg>
        </button>
        <button onClick={() => onEdit(sub)}
          title="Edit"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400
            hover:bg-slate-200 hover:text-blue-600 transition-colors">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
          </svg>
        </button>
        <button onClick={() => onDelete(sub.id)}
          title="Delete"
          className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400
            hover:bg-red-50 hover:text-red-600 transition-colors">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
            <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function TopicCard({ topic, onEdit, onDelete, onEditSub, onDeleteSub, onAddSub, onToggleSubStatus }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden
      hover:border-slate-300 hover:shadow-sm transition-all duration-200">

      {/* Card Header */}
      <div className="px-5 py-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-10 h-10 rounded-xl bg-red-50 border border-red-100 flex items-center
            justify-center shrink-0 mt-0.5">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.396 0 2.698.37 3.8 1.015A7.978 7.978 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.969 7.969 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>

          {/* Title & Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-bold text-slate-900 leading-tight">{topic.title}</h3>
              <Badge status={topic.status} />
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-mono">/{topic.slug}</p>
            {topic.description && (
              <p className="text-sm text-slate-500 mt-1.5 leading-relaxed line-clamp-2">
                {topic.description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0 ml-1">
            <button onClick={() => onEdit(topic)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400
                hover:bg-slate-100 hover:text-blue-600 transition-colors" title="Edit topic">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              </svg>
            </button>
            <button onClick={() => onDelete(topic.id)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400
                hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete topic">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-4 mt-3 pt-3 border-t border-slate-100">
          <button
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500
              hover:text-red-600 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
            </svg>
            {topic.subtopics.length} subtopic{topic.subtopics.length !== 1 ? "s" : ""}
          </button>

          <span className="text-slate-200">·</span>
          <span className="text-xs text-slate-400">
            {topic.subtopics.filter((s) => s.status === "published").length} published
          </span>

          <button
            onClick={() => setExpanded((e) => !e)}
            className="ml-auto flex items-center gap-1 text-xs font-semibold text-slate-500
              hover:text-slate-700 transition-colors">
            <span>{expanded ? "Collapse" : "Expand"}</span>
            <svg viewBox="0 0 20 20" fill="currentColor"
              className={`w-3.5 h-3.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}>
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {/* Subtopics Panel */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/60 px-4 py-3">
          {topic.subtopics.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-4">No subtopics yet.</p>
          ) : (
            <div className="space-y-0.5">
              {[...topic.subtopics]
                .sort((a, b) => a.order - b.order)
                .map((sub) => (
                  <SubtopicRow
                    key={sub.id} sub={sub}
                    onEdit={(s) => onEditSub(topic.id, s)}
                    onDelete={(sid) => onDeleteSub(topic.id, sid)}
                    onToggleStatus={(sid) => onToggleSubStatus(topic.id, sid)}
                  />
                ))}
            </div>
          )}
          <button
            onClick={() => onAddSub(topic.id)}
            className="mt-3 flex items-center gap-1.5 text-xs font-bold text-red-600
              hover:text-red-700 transition-colors px-3 py-1.5 rounded-lg
              hover:bg-red-50 border border-dashed border-red-200 w-full justify-center">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add Subtopic
          </button>
        </div>
      )}
    </div>
  );
}