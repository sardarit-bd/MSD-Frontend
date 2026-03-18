"use client";

import { useState, useEffect, useRef } from "react";
import { ArticleRow } from "./components/ArticleRow";
import Link from "next/link";

// ─── Seed Data ─────────────────────────────────────────────────────────────────
export const TOPICS = [
  {
    id: "t1", title: "Immunology",
    subtopics: [
      { id: "s1", title: "Overview of the Immune System" },
      { id: "s2", title: "Cellular Components" },
      { id: "s3", title: "Molecular Components" },
    ],
  },
  {
    id: "t2", title: "Cardiology",
    subtopics: [
      { id: "s4", title: "Heart Failure" },
      { id: "s5", title: "Arrhythmias" },
    ],
  },
  {
    id: "t3", title: "Neurology",
    subtopics: [
      { id: "s6", title: "Stroke" },
      { id: "s7", title: "Epilepsy" },
    ],
  },
];

export const AUTHORS = [
  { id: "a1", name: "Peter J. Delves", designation: "PhD, UCL" },
  { id: "a2", name: "Sarah K. Mitchell", designation: "MD, Johns Hopkins" },
  { id: "a3", name: "James R. Thornton", designation: "FRCP, Oxford" },
];

export const SEED_ARTICLES = [
  {
    id: "ar1",
    title: "Overview of the Immune System",
    slug: "overview-immune-system",
    status: "published",
    topicId: "t1", subtopicId: "s1",
    authorId: "a1",
    content: "<p>The immune system distinguishes self from nonself...</p>",
    updatedAt: "2025-03-10",
  },
  {
    id: "ar2",
    title: "Cellular Components of the Immune System",
    slug: "cellular-components-immune-system",
    status: "published",
    topicId: "t1", subtopicId: "s2",
    authorId: "a1",
    content: "<p>The immune system consists of cellular components...</p>",
    updatedAt: "2025-03-11",
  },
  {
    id: "ar3",
    title: "Molecular Components of the Immune System",
    slug: "molecular-components-immune-system",
    status: "draft",
    topicId: "t1", subtopicId: "s3",
    authorId: "a2",
    content: "<p>Molecular components work together to destroy antigens...</p>",
    updatedAt: "2025-03-12",
  },
  {
    id: "ar4",
    title: "Heart Failure: Diagnosis and Management",
    slug: "heart-failure-diagnosis-management",
    status: "published",
    topicId: "t2", subtopicId: "s4",
    authorId: "a2",
    content: "<p>Heart failure occurs when the heart cannot pump...</p>",
    updatedAt: "2025-03-08",
  },
  {
    id: "ar5",
    title: "Arrhythmias: Classification and Treatment",
    slug: "arrhythmias-classification-treatment",
    status: "draft",
    topicId: "t2", subtopicId: "s5",
    authorId: "a3",
    content: "<p>Cardiac arrhythmias are abnormalities of the heart rhythm...</p>",
    updatedAt: "2025-03-14",
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const toSlug = (s) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
const today = () => new Date().toISOString().slice(0, 10);



// ─── Confirm Dialog ────────────────────────────────────────────────────────────
function ConfirmDialog({ open, onClose, onConfirm, title, message }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 space-y-4">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-red-600">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-slate-800">{title}</p>
            <p className="text-sm text-slate-500 mt-0.5">{message}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose}
            className="flex-1 px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-100
              hover:bg-slate-200 rounded-xl transition-colors">Cancel</button>
          <button onClick={() => { onConfirm(); onClose(); }}
            className="flex-1 px-4 py-2 text-sm font-semibold text-white bg-red-600
              hover:bg-red-700 rounded-xl transition-colors">Delete</button>
        </div>
      </div>
    </div>
  );
}



// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ArticlesPage() {
  const [articles, setArticles] = useState(SEED_ARTICLES);
  const [drawer, setDrawer] = useState({ open: false, article: null });
  const [confirm, setConfirm] = useState({ open: false, article: null });

  // Filters
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterTopic, setFilterTopic] = useState("all");
  const [filterAuthor, setFilterAuthor] = useState("all");

  // ── CRUD ──
  const handleSave = (form) => {
    if (drawer.article) {
      setArticles((as) =>
        as.map((a) => a.id === drawer.article.id
          ? { ...a, ...form, updatedAt: today() }
          : a
        )
      );
    } else {
      setArticles((as) => [
        { id: uid(), ...form, updatedAt: today() },
        ...as,
      ]);
    }
    setDrawer({ open: false, article: null });
  };

  const handleDelete = () => {
    setArticles((as) => as.filter((a) => a.id !== confirm.article.id));
  };

  // ── Filter ──
  const filtered = articles.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch =
      a.title.toLowerCase().includes(q) ||
      a.slug.toLowerCase().includes(q) ||
      AUTHORS.find((au) => au.id === a.authorId)?.name.toLowerCase().includes(q);
    const matchStatus = filterStatus === "all" || a.status === filterStatus;
    const matchTopic = filterTopic === "all" || a.topicId === filterTopic;
    const matchAuthor = filterAuthor === "all" || a.authorId === filterAuthor;
    return matchSearch && matchStatus && matchTopic && matchAuthor;
  });

  const publishedCount = articles.filter((a) => a.status === "published").length;
  const draftCount = articles.filter((a) => a.status === "draft").length;

  return (
    <div className="min-h-screen bg-[#F7F7F9]">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Articles", value: articles.length, color: "text-slate-800" },
            { label: "Published", value: publishedCount, color: "text-emerald-700" },
            { label: "Drafts", value: draftCount, color: "text-amber-700" },
            { label: "Topics Covered", value: [...new Set(articles.map((a) => a.topicId))].length, color: "text-blue-700" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 px-4 py-3.5">
              <p className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">{s.label}</p>
              <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <label className="flex items-center gap-2 bg-slate-50 border border-slate-200
              rounded-xl px-3.5 py-2.5 flex-1 focus-within:ring-2 focus-within:ring-red-400/25
              focus-within:border-red-300 transition-all cursor-text">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0">
                <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
              </svg>
              <input
                type="text" value={search} placeholder="Search by title, slug, or author…"
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400
                  focus:outline-none" />
              {search && (
                <button onClick={() => setSearch("")}
                  className="text-slate-400 hover:text-slate-600 transition-colors">
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                  </svg>
                </button>
              )}
            </label>

            {/* Topic filter */}
            <select
              value={filterTopic} onChange={(e) => setFilterTopic(e.target.value)}
              className="px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl
                text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-400/25
                focus:border-red-300 transition-all sm:w-44">
              <option value="all">All Topics</option>
              {TOPICS.map((t) => <option key={t.id} value={t.id}>{t.title}</option>)}
            </select>

            {/* Author filter */}
            <select
              value={filterAuthor} onChange={(e) => setFilterAuthor(e.target.value)}
              className="px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl
                text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-400/25
                focus:border-red-300 transition-all sm:w-44">
              <option value="all">All Authors</option>
              {AUTHORS.map((a) => <option key={a.id} value={a.id}>{a.name}</option>)}
            </select>

            {/* Status tabs */}
            <div className="flex gap-1 bg-slate-100 rounded-xl p-1 shrink-0">
              {["all", "published", "draft"].map((f) => (
                <button key={f} onClick={() => setFilterStatus(f)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-all
                    ${filterStatus === f
                      ? "bg-white text-slate-800 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"}`}>
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Active filters summary */}
          {(search || filterTopic !== "all" || filterAuthor !== "all" || filterStatus !== "all") && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 flex-wrap">
              <span className="text-xs text-slate-500">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
              <button
                onClick={() => { setSearch(""); setFilterTopic("all"); setFilterAuthor("all"); setFilterStatus("all"); }}
                className="text-xs font-semibold text-red-600 hover:text-red-700 transition-colors ml-auto">
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* ── Table ── */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-slate-400">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="font-bold text-slate-700">No articles found</p>
              <p className="text-sm text-slate-400 mt-1">Adjust your filters or create a new article.</p>
              <Link
                href={'/dashboard/articles/new'}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold
                  text-red-600 hover:text-red-700 transition-colors">
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                Create first article
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60">
                    <th className="text-left px-5 py-3 text-[11px] font-bold tracking-widest
                      uppercase text-slate-400">Article</th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold tracking-widest
                      uppercase text-slate-400 hidden md:table-cell">Topic / Subtopic</th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold tracking-widest
                      uppercase text-slate-400 hidden lg:table-cell">Author</th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold tracking-widest
                      uppercase text-slate-400">Status</th>
                    <th className="text-left px-4 py-3 text-[11px] font-bold tracking-widest
                      uppercase text-slate-400 hidden sm:table-cell">Updated</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((article) => (
                    <ArticleRow
                      key={article.id}
                      article={article}
                      onEdit={(a) => setDrawer({ open: true, article: a })}
                      onDelete={(a) => setConfirm({ open: true, article: a })}
                    />
                  ))}
                </tbody>
              </table>

              {/* Table footer */}
              <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/40 flex
                items-center justify-between">
                <p className="text-xs text-slate-400">
                  Showing <span className="font-semibold text-slate-600">{filtered.length}</span> of{" "}
                  <span className="font-semibold text-slate-600">{articles.length}</span> articles
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Confirm Delete ── */}
      <ConfirmDialog
        open={confirm.open}
        title="Delete Article"
        message={`"${confirm.article?.title}" will be permanently deleted.`}
        onConfirm={handleDelete}
        onClose={() => setConfirm({ open: false, article: null })}
      />
    </div>
  );
}