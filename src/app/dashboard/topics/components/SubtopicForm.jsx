import { useState } from "react";
import { Input, Select } from "./TinyUI";

export function SubtopicForm({ initial, onSave, onClose }) {
  const [form, setForm] = useState(
    initial || { title: "", status: "draft", order: 1 }
  );
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="space-y-4">
      <Input label="Subtopic Title" required placeholder="e.g. Heart Failure"
        value={form.title} onChange={(e) => set("title", e.target.value)} />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Status" value={form.status} onChange={(e) => set("status", e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
        <Input label="Order" type="number" min={1} value={form.order}
          onChange={(e) => set("order", Number(e.target.value))} />
      </div>
      <div className="flex gap-2 pt-2">
        <button onClick={onClose}
          className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-700 bg-slate-100
            hover:bg-slate-200 rounded-lg transition-colors">
          Cancel
        </button>
        <button
          disabled={!form.title.trim()}
          onClick={() => onSave(form)}
          className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600
            hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors">
          {initial ? "Save Changes" : "Add Subtopic"}
        </button>
      </div>
    </div>
  );
}