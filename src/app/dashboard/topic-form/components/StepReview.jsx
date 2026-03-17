import { Label } from "./TinyUI/tinyUI";

export const StepReview = ({ form }) => {
  const json = JSON.stringify(
    {
      title: form.title,
      author: form.author,
      chapterGroup: form.chapterGroup,
      topics: form.topics.filter(Boolean),
      intro: form.intro.map(({ _id, ...rest }) => rest),
      sections: form.sections.map(({ _id, blocks, ...rest }) => ({
        ...rest,
        blocks: blocks.map(({ _id, ...b }) => b),
      })),
    },
    null,
    2
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        {[
          ["Title", form.title || "—"],
          ["Author", form.author.name || "—"],
          ["Chapter Group", form.chapterGroup || "—"],
          ["Tab Topics", form.topics.filter(Boolean).join(", ") || "—"],
          ["Intro Blocks", form.intro.length],
          ["Sections", form.sections.length],
        ].map(([k, v]) => (
          <div key={k} className="bg-slate-50 rounded-lg px-4 py-3 border border-slate-200">
            <p className="text-xs font-bold tracking-wider uppercase text-slate-400 mb-1">{k}</p>
            <p className="text-sm font-medium text-slate-800 truncate">{v}</p>
          </div>
        ))}
      </div>

      <div>
        <Label>API Payload Preview</Label>
        <pre className="bg-slate-900 text-green-400 text-xs rounded-xl p-4 overflow-auto max-h-80
          font-mono border border-slate-800 leading-relaxed">
          {json}
        </pre>
      </div>
    </div>
  );
};