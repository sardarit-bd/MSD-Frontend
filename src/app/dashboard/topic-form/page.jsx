"use client";

import { useState} from "react";
import { StepBasicInfo } from "./components/StepBasicInfo";
import { StepSections } from "./components/StepSection";
import { StepReview } from "./components/StepReview";
import { StepIntro } from "./components/StepIntro";



export const emptyImageCard = () => ({
  title: "", content: "", image: "", video: "", links: [], footer: "",
});

export const emptySlide = () => ({
  id: Date.now(), imageUrl: "", imageAlt: "", slideTitle: "", description: "", credit: "",
});

export const emptyBlock = (order = 1) => ({
  _id: crypto.randomUUID(),
  order,
  type: "text_block",
  textContent: "",
  imageCard: emptyImageCard(),
  imageSlider: { title: "", slides: [emptySlide()] },
  listBox: { title: "", items: [""] },
  tableItems: [{ id: 1, text: "" }],
});
export const emptyIntroBlock = () => ({
  _id: crypto.randomUUID(),
  type: "text_block",
  textContent: "",
  imageCard: emptyImageCard(),
});

export const emptySection = (order = 1) => ({
  _id: crypto.randomUUID(),
  order,
  title: "",
  blocks: [emptyBlock(1)],
});

const initialForm = {
  title: "",
  author: { name: "", designation: "" },
  topics: [""],
  intro: [emptyIntroBlock()],
  sections: [emptySection(1)],
};


const STEPS = [
  { id: "basic",    label: "Basic Info",  icon: "①" },
  { id: "intro",    label: "Intro",       icon: "②" },
  { id: "sections", label: "Sections",    icon: "③" },
  { id: "review",   label: "Review",      icon: "④" },
];

// ─── Main Form ────────────────────────────────────────────────────────────────

export default function TopicForm() {
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const payload = {
        title: form.title,
        author: form.author,
        chapterGroup: form.chapterGroup,
        topics: form.topics.filter(Boolean),
        intro: form.intro.map(({ _id, ...rest }) => rest),
        sections: form.sections.map(({ _id, blocks, ...rest }) => ({
          ...rest,
          blocks: blocks.map(({ _id, ...b }) => b),
        })),
      };
      const res = await fetch("/api/topics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setStep(0);
    setSubmitted(false);
    setError(null);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/30 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-10 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <span className="text-3xl">✓</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Topic Created</h2>
          <p className="text-slate-500 text-sm mb-6">
            <span className="font-semibold text-slate-700">{form.title}</span> has been saved successfully.
          </p>
          <button onClick={handleReset}
            className="px-6 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-lg
              hover:bg-red-700 transition-colors">
            Create Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50/20">
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-black">M</span>
            </div>
            <div>
              <p className="text-xs font-bold tracking-widest uppercase text-slate-400">MSD Manual</p>
              <p className="text-sm font-semibold text-slate-800 -mt-0.5">New Topic</p>
            </div>
          </div>

          {/* Step Progress */}
          <div className="flex items-center gap-1">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => i < step + 1 && setStep(i)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold
                  transition-all ${i === step
                    ? "bg-red-600 text-white"
                    : i < step
                      ? "bg-slate-100 text-slate-600 hover:bg-slate-200 cursor-pointer"
                      : "bg-transparent text-slate-400 cursor-default"
                  }`}
              >
                <span>{s.icon}</span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {STEPS[step].label}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Step {step + 1} of {STEPS.length}
            {form.title && step > 0 && (
              <span className="ml-2 text-slate-400">· {form.title}</span>
            )}
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6">
            {step === 0 && <StepBasicInfo form={form} setForm={setForm} />}
            {step === 1 && <StepIntro form={form} setForm={setForm} />}
            {step === 2 && <StepSections form={form} setForm={setForm} />}
            {step === 3 && <StepReview form={form} />}
          </div>

          {/* Footer Nav */}
          <div className="border-t border-slate-100 bg-slate-50 px-6 py-4 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-5 py-2 text-sm font-semibold text-slate-600 rounded-lg border
                border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed
                transition-all"
            >
              ← Back
            </button>

            <div className="flex items-center gap-1">
              {STEPS.map((_, i) => (
                <div key={i} className={`rounded-full transition-all
                  ${i === step ? "w-5 h-2 bg-red-600" : i < step ? "w-2 h-2 bg-red-300" : "w-2 h-2 bg-slate-300"}`} />
              ))}
            </div>

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                disabled={step === 0 && !form.title.trim()}
                className="px-5 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg
                  hover:bg-red-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting || !form.title.trim()}
                className="px-6 py-2 text-sm font-semibold text-white bg-red-600 rounded-lg
                  hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all
                  flex items-center gap-2"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Saving...
                  </>
                ) : "Publish Topic ↗"}
              </button>
            )}
          </div>

          {error && (
            <div className="mx-6 mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}