import { AddBtn, IconBtn, Input, Label } from "./TinyUI/tinyUI";

export const TableEditor = ({ value, onChange }) => {
  const updateRow = (i, val) => {
    const rows = [...value];
    rows[i] = { ...rows[i], text: val };
    onChange(rows);
  };
  const removeRow = (i) => onChange(value.filter((_, idx) => idx !== i));
  const addRow = () => onChange([...value, { id: value.length + 1, text: "" }]);

  return (
    <div className="space-y-2">
      <Label>Table References</Label>
      {value.map((row, i) => (
        <div key={row.id} className="flex gap-2 items-center">
          <span className="text-xs text-slate-400 w-6 text-right shrink-0">{row.id}</span>
          <Input value={row.text} onChange={(e) => updateRow(i, e.target.value)} placeholder="Table name or label..." />
          <IconBtn onClick={() => removeRow(i)} danger title="Remove">✕</IconBtn>
        </div>
      ))}
      <AddBtn onClick={addRow}>Add Row</AddBtn>
    </div>
  );
};