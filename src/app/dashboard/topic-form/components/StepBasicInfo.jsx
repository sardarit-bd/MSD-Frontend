import { AddBtn, IconBtn, Input, Label, Select } from "./TinyUI/tinyUI";
const CHAPTER_GROUPS = [
  "BiologyOfTheImmuneSystem",
  "AllergicAutoimmuneAndOtherHypersensitivityDisorders",
  "ImmunodeficiencyDisorders",
  "Transplantation",
];
export const StepBasicInfo = ({ form, setForm }) => {

  const updateTopic = (i, val) => {
    const topics = [...form.topics];
    topics[i] = val;
    setForm({ ...form, topics });
  };
  const removeTopic = (i) =>
    setForm({ ...form, topics: form.topics.filter((_, idx) => idx !== i) });
  const addTopic = () => setForm({ ...form, topics: [...form.topics, ""] });

  return (
    <div className="space-y-6">
      <div>
        <Label required>Article Title</Label>
        <Input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Overview of the Immune System"
          className="text-base font-medium"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label required>Author Name</Label>
          <Input
            value={form.author.name}
            onChange={(e) => setForm({ ...form, author: { ...form.author, name: e.target.value } })}
            placeholder="Peter J. Delves"
          />
        </div>
        <div>
          <Label>Designation</Label>
          <Input
            value={form.author.designation}
            onChange={(e) => setForm({ ...form, author: { ...form.author, designation: e.target.value } })}
            placeholder="PhD, University College London"
          />
        </div>
      </div>

     <div className="grid grid-cols-2 gap-4">
       <div>
        <Label>Topic</Label>
        <Select
          value={form.topic || ""}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
        >
          <option value="">— Select Topic —</option>
          {CHAPTER_GROUPS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Select>
      </div>
       <div>
        <Label>Sub Topic</Label>
        <Select
          value={form.subTopic || ""}
          onChange={(e) => setForm({ ...form, subTopic: e.target.value })}
        >
          <option value="">— Select Sub Topic group —</option>
          {CHAPTER_GROUPS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </Select>
      </div>
     </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label>Tab Topics</Label>
          <AddBtn onClick={addTopic}>Add</AddBtn>
        </div>
        <div className="space-y-2">
          {form.topics.map((t, i) => (
            <div key={i} className="flex gap-2">
              <Input
                value={t}
                onChange={(e) => updateTopic(i, e.target.value)}
                placeholder="e.g. Immune Response"
              />
              <IconBtn onClick={() => removeTopic(i)} danger>✕</IconBtn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};