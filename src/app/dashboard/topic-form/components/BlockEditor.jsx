import { ImageCardEditor } from "./ImageCardEditor";
import { ImageSliderEditor } from "./ImageSliderEditor";
import { ListBoxEditor } from "./ListBoxEditor";
import { TableEditor } from "./TableEditor";
import { TextBlockEditor } from "./TextBlockEditor";
import { Divider, Input, Label, SectionCard, Select } from "./TinyUI/tinyUI";


const BLOCK_TYPES = ["text_block", "image_card", "image_slider", "list_box", "table"];
const BLOCK_CONTENT_MAP = {
  text_block: (b, onUpdate) => (
    <TextBlockEditor value={b.textContent} onChange={(v) => onUpdate("textContent", v)} />
  ),
  image_card: (b, onUpdate) => (
    <ImageCardEditor value={b.imageCard} onChange={(v) => onUpdate("imageCard", v)} />
  ),
  image_slider: (b, onUpdate) => (
    <ImageSliderEditor value={b.imageSlider} onChange={(v) => onUpdate("imageSlider", v)} />
  ),
  list_box: (b, onUpdate) => (
    <ListBoxEditor value={b.listBox} onChange={(v) => onUpdate("listBox", v)} />
  ),
  table: (b, onUpdate) => (
    <TableEditor value={b.tableItems} onChange={(v) => onUpdate("tableItems", v)} />
  ),
};
export const BlockEditor = ({ block, onChange, onRemove, typeOptions, label }) => {
  const update = (field, val) => onChange({ ...block, [field]: val });

  return (
    <SectionCard label={label || `Block ${block.order ?? ""}`} onRemove={onRemove}>
      <div className="grid grid-cols-2 gap-3 items-end">
        <div>
          <Label>Block Type <span className="text-red-500">*</span></Label>
          <Select value={block.type} onChange={(e) => update("type", e.target.value)}>
            {(typeOptions || BLOCK_TYPES).map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </Select>
        </div>
        {block.order !== undefined && (
          <div>
            <Label>Order</Label>
            <Input type="number" min={1} value={block.order}
              onChange={(e) => update("order", Number(e.target.value))} className="w-24" />
          </div>
        )}
      </div>
      <Divider />
      {BLOCK_CONTENT_MAP[block.type]?.(block, update)}
    </SectionCard>
  );
};