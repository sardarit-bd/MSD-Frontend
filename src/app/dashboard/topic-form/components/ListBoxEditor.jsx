import { AddBtn, IconBtn, Input, Label } from "./TinyUI/tinyUI";

export const ListBoxEditor = ({ value, onChange }) => {
  const update = (field, val) => onChange({ ...value, [field]: val });
  const updateItem = (i, val) => {
    const items = [...value.items];
    items[i] = val;
    update("items", items);
  };
  const removeItem = (i) => update("items", value.items.filter((_, idx) => idx !== i));
  const addItem = () => update("items", [...value.items, ""]);

  return (
    <div className="space-y-3">
      <div>
        <Label>Box Title</Label>
        <Input value={value.title} onChange={(e) => update("title", e.target.value)} placeholder="Pearls & Pitfalls" />
      </div>
      <div className="space-y-2">
        {value.items.map((item, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="text-xs text-slate-400 pt-2.5 select-none">{i + 1}.</span>
            <Input value={item} onChange={(e) => updateItem(i, e.target.value)} placeholder="List item..." />
            <IconBtn onClick={() => removeItem(i)} danger title="Remove">✕</IconBtn>
          </div>
        ))}
      </div>
      <AddBtn onClick={addItem}>Add Item</AddBtn>
    </div>
  );
};
