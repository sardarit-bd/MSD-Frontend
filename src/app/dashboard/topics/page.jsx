"use client";

import { useState } from "react";
import { TopicCard } from "./components/TopicCard";
import { ConfirmDialog, Modal } from "./components/TinyUI";
import { TopicForm } from "./components/TopicForm";
import { SubtopicForm } from "./components/SubtopicForm";

// ─── Seed Data ─────────────────────────────────────────────────────────────────
const SEED = [
  {
    id: "t1", title: "Immunology", slug: "immunology",
    description: "Study of the immune system and immune responses.",
    status: "published", subtopics: [
      { id: "s1", title: "Overview of the Immune System", status: "published", order: 1 },
      { id: "s2", title: "Cellular Components", status: "published", order: 2 },
      { id: "s3", title: "Molecular Components", status: "draft", order: 3 },
    ],
  },
  {
    id: "t2", title: "Cardiology", slug: "cardiology",
    description: "Disorders of the heart and blood vessels.",
    status: "published", subtopics: [
      { id: "s4", title: "Heart Failure", status: "published", order: 1 },
      { id: "s5", title: "Arrhythmias", status: "draft", order: 2 },
    ],
  },
  {
    id: "t3", title: "Neurology", slug: "neurology",
    description: "Diseases of the nervous system.",
    status: "draft", subtopics: [],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
const uid = () => Math.random().toString(36).slice(2, 9);
const slug = (s) => s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");



// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function TopicsPage() {
  const [topics, setTopics] = useState(SEED);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Modal state
  const [topicModal, setTopicModal] = useState({ open: false, topic: null });
  const [subModal, setSubModal] = useState({ open: false, topicId: null, sub: null });
  const [confirm, setConfirm] = useState({ open: false, message: "", onConfirm: () => { } });

  // ── Topic CRUD ──
  const saveTopicHandler = (form) => {
    console.log("form", form)
    // ----------- ---------------------------------
    // ------ Here call Backend API ---------------
    //---------------------------------------------
    
    if (topicModal.topic) {
      setTopics((ts) => ts.map((t) => t.id === topicModal.topic.id ? { ...t, ...form } : t));
    } else {
      setTopics((ts) => [...ts, { id: uid(), subtopics: [], ...form }]);
    }
    setTopicModal({ open: false, topic: null });
  };

  const deleteTopic = (id) =>
    setConfirm({
      open: true,
      message: "This will permanently delete the topic and all its subtopics.",
      onConfirm: () => setTopics((ts) => ts.filter((t) => t.id !== id)),
    });

  // ── Subtopic CRUD ──
  const saveSubHandler = (form) => {
    const { topicId, sub } = subModal;
    setTopics((ts) =>
      ts.map((t) => {
        if (t.id !== topicId) return t;
        if (sub) {
          return { ...t, subtopics: t.subtopics.map((s) => s.id === sub.id ? { ...s, ...form } : s) };
        }
        return { ...t, subtopics: [...t.subtopics, { id: uid(), ...form }] };
      })
    );
    setSubModal({ open: false, topicId: null, sub: null });
  };

  const deleteSub = (topicId, subId) =>
    setConfirm({
      open: true,
      message: "This will permanently delete this subtopic.",
      onConfirm: () =>
        setTopics((ts) =>
          ts.map((t) =>
            t.id === topicId ? { ...t, subtopics: t.subtopics.filter((s) => s.id !== subId) } : t
          )
        ),
    });

  const toggleSubStatus = (topicId, subId) =>
    setTopics((ts) =>
      ts.map((t) =>
        t.id !== topicId ? t : {
          ...t,
          subtopics: t.subtopics.map((s) =>
            s.id !== subId ? s : { ...s, status: s.status === "published" ? "draft" : "published" }
          ),
        }
      )
    );

  // ── Filter ──
  const filtered = topics.filter((t) => {
    const matchSearch =
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.slug.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || t.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const totalSubs = topics.reduce((n, t) => n + t.subtopics.length, 0);
  const publishedTopics = topics.filter((t) => t.status === "published").length;

  return (
    <div className="min-h-screen bg-[#F7F7F9]">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Total Topics", value: topics.length, color: "text-slate-800" },
            { label: "Published", value: publishedTopics, color: "text-emerald-700" },
            { label: "Drafts", value: topics.length - publishedTopics, color: "text-amber-700" },
            { label: "Subtopics", value: totalSubs, color: "text-blue-700" },
          ].map((stat) => (
            <div key={stat.label}
              className="bg-white rounded-xl border border-slate-200 px-4 py-3.5">
              <p className="text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">
                {stat.label}
              </p>
              <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ── Search & Filter ── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <label className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl
            px-3.5 py-2.5 flex-1 focus-within:ring-2 focus-within:ring-red-400/25
            focus-within:border-red-300 transition-all cursor-text">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-slate-400 shrink-0">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <input
              type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search topics by title or slug…"
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

          <div className="flex gap-1.5 bg-white border border-slate-200 rounded-xl p-1.5 shrink-0">
            {["all", "published", "draft"].map((f) => (
              <button
                key={f}
                onClick={() => setFilterStatus(f)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg capitalize transition-all
                  ${filterStatus === f
                    ? "bg-slate-900 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}>
                {f}
              </button>
            ))}
          </div>

          <button
            onClick={() => setTopicModal({ open: true, topic: null })}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 active:scale-95
            text-white text-xs font-semibold px-3 py-2 rounded-lg transition-all shadow-sm
            shadow-red-200">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            <span className="hidden sm:inline">New Topic</span>
          </button>
        </div>

        {/* ── Topic List ── */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 py-16 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-slate-400">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-slate-800 font-bold">No topics found</p>
            <p className="text-slate-400 text-sm mt-1">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            {filtered.map((topic) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                onEdit={(t) => setTopicModal({ open: true, topic: t })}
                onDelete={deleteTopic}
                onAddSub={(tid) => setSubModal({ open: true, topicId: tid, sub: null })}
                onEditSub={(tid, s) => setSubModal({ open: true, topicId: tid, sub: s })}
                onDeleteSub={deleteSub}
                onToggleSubStatus={toggleSubStatus}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      <Modal
        open={topicModal.open}
        onClose={() => setTopicModal({ open: false, topic: null })}
        title={topicModal.topic ? "Edit Topic" : "Create New Topic"}>
        <TopicForm
          initial={topicModal.topic}
          onSave={saveTopicHandler}
          onClose={() => setTopicModal({ open: false, topic: null })}
        />
      </Modal>

      <Modal
        open={subModal.open}
        onClose={() => setSubModal({ open: false, topicId: null, sub: null })}
        title={subModal.sub ? "Edit Subtopic" : "Add Subtopic"}>
        <SubtopicForm
          initial={subModal.sub}
          onSave={saveSubHandler}
          onClose={() => setSubModal({ open: false, topicId: null, sub: null })}
        />
      </Modal>

      <ConfirmDialog
        open={confirm.open}
        message={confirm.message}
        onConfirm={confirm.onConfirm}
        onClose={() => setConfirm({ ...confirm, open: false })}
      />
    </div>
  );
}