import { Input, Label, Textarea } from "./TinyUI/tinyUI";

export const ImageCardEditor = ({ value, onChange }) => {
  const update = (field, val) => onChange({ ...value, [field]: val });
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Card Title</Label>
          <Input value={value.title} onChange={(e) => update("title", e.target.value)} placeholder="Cellular Components..." />
        </div>
        <div>
          <Label>Image URL</Label>
          <Input value={value.image} onChange={(e) => update("image", e.target.value)} placeholder="https://..." />
        </div>
      </div>
      <div>
        <Label>Caption / Content</Label>
        <Textarea rows={2} value={value.content} onChange={(e) => update("content", e.target.value)} placeholder="Image description..." />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label>Video URL</Label>
          <Input value={value.video} onChange={(e) => update("video", e.target.value)} placeholder="https://... (optional)" />
        </div>
        <div>
          <Label>Footer Text</Label>
          <Input value={value.footer} onChange={(e) => update("footer", e.target.value)} placeholder="Copyright © ..." />
        </div>
      </div>
      {value.image && (
        <div className="rounded-lg overflow-hidden border border-slate-200 bg-slate-50 p-2">
          <img src={value.image} alt="preview" className="max-h-32 object-contain mx-auto rounded" />
        </div>
      )}
    </div>
  );
};
