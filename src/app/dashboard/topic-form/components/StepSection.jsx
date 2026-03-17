import { emptyBlock, emptySection } from "../page";
import { BlockEditor } from "./BlockEditor";
import { AddBtn } from "./TinyUI/tinyUI";

export const StepSections = ({ form, setForm }) => {
  const updateSection = (si, section) => {
    const sections = [...form.sections];
    sections[si] = section;
    setForm({ ...form, sections });
  };

  const removeSection = (si) =>
    setForm({ ...form, sections: form.sections.filter((_, i) => i !== si) });

  const addSection = () =>
    setForm({ ...form, sections: [...form.sections, emptySection(form.sections.length + 1)] });

  const addBlock = (si) => {
    const section = { ...form.sections[si] };
    section.blocks = [...section.blocks, emptyBlock(section.blocks.length + 1)];
    updateSection(si, section);
  };
  const updateBlock = (si, bi, block) => {
    const section = { ...form.sections[si] };
    section.blocks = [...section.blocks];
    section.blocks[bi] = block;
    updateSection(si, section);
  };
  const removeBlock = (si, bi) => {
    const section = { ...form.sections[si] };
    section.blocks = section.blocks.filter((_, i) => i !== bi);
    updateSection(si, section);
  };

  return (
    <div className="space-y-6">
      {form.sections.map((section, si) => (
        <div key={section._id} className="border border-slate-200 rounded-xl overflow-hidden">
          {/* Section Header */}
          <div className="bg-slate-800 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <span className="text-xs font-bold tracking-widest uppercase text-slate-400 shrink-0">
                Section {section.order}
              </span>
              <input
                value={section.title}
                onChange={(e) => updateSection(si, { ...section, title: e.target.value })}
                placeholder="Section Title"
                className="flex-1 bg-transparent border-b border-slate-600 text-white text-sm
                  placeholder-slate-500 focus:outline-none focus:border-red-400 pb-0.5 font-medium"
              />
            </div>
            <div className="flex items-center gap-1 ml-3">
              <input
                type="number" min={1} value={section.order}
                onChange={(e) => updateSection(si, { ...section, order: Number(e.target.value) })}
                className="w-14 bg-slate-700 border border-slate-600 text-white text-xs
                  rounded px-2 py-1 focus:outline-none focus:border-red-400"
              />
              {form.sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeSection(si)}
                  className="ml-1 text-slate-500 hover:text-red-400 text-sm px-1 transition-colors"
                >✕</button>
              )}
            </div>
          </div>

          {/* Blocks */}
          <div className="p-4 space-y-4 bg-slate-50">
            {section.blocks.map((block, bi) => (
              <BlockEditor
                key={block._id}
                block={block}
                onChange={(b) => updateBlock(si, bi, b)}
                onRemove={section.blocks.length > 1 ? () => removeBlock(si, bi) : undefined}
              />
            ))}
            <AddBtn onClick={() => addBlock(si)}>Add Block</AddBtn>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="w-full border-2 border-dashed border-slate-300 rounded-xl py-4
          text-sm font-semibold text-slate-400 hover:border-red-300 hover:text-red-500
          transition-colors"
      >
        + Add Section
      </button>
    </div>
  );
};