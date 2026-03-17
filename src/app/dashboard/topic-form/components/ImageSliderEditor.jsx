import { AddBtn, IconBtn, Input, Label, Textarea } from "./TinyUI/tinyUI";

const SlideEditor = ({ slide, onChange, onRemove }) => (
  <div className="border border-slate-200 rounded-lg p-3 space-y-2 bg-slate-50/50">
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Slide</span>
      <IconBtn onClick={onRemove} danger title="Remove slide">✕</IconBtn>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <Label>Slide Title</Label>
        <Input value={slide.slideTitle} onChange={(e) => onChange({ ...slide, slideTitle: e.target.value })} placeholder="Lateral Radiograph..." />
      </div>
      <div>
        <Label>Image URL</Label>
        <Input value={slide.imageUrl} onChange={(e) => onChange({ ...slide, imageUrl: e.target.value })} placeholder="https://..." />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div>
        <Label>Alt Text</Label>
        <Input value={slide.imageAlt} onChange={(e) => onChange({ ...slide, imageAlt: e.target.value })} placeholder="Accessible description" />
      </div>
      <div>
        <Label>Credit</Label>
        <Input value={slide.credit} onChange={(e) => onChange({ ...slide, credit: e.target.value })} placeholder="Image courtesy of..." />
      </div>
    </div>
    <div>
      <Label>Description</Label>
      <Textarea rows={2} value={slide.description} onChange={(e) => onChange({ ...slide, description: e.target.value })} placeholder="Slide description..." />
    </div>
  </div>
);


export const ImageSliderEditor = ({ value, onChange }) => {
  const update = (field, val) => onChange({ ...value, [field]: val });
  const updateSlide = (i, slide) => {
    const slides = [...value.slides];
    slides[i] = slide;
    update("slides", slides);
  };
  const removeSlide = (i) => update("slides", value.slides.filter((_, idx) => idx !== i));
  const addSlide = () => update("slides", [...value.slides, emptySlide()]);

  return (
    <div className="space-y-3">
      <div>
        <Label>Slider Title</Label>
        <Input value={value.title} onChange={(e) => update("title", e.target.value)} placeholder="Radiographs of the Elbow" />
      </div>
      <div className="space-y-2">
        {value.slides.map((slide, i) => (
          <SlideEditor key={slide.id} slide={slide}
            onChange={(s) => updateSlide(i, s)}
            onRemove={() => removeSlide(i)} />
        ))}
      </div>
      <AddBtn onClick={addSlide}>Add Slide</AddBtn>
    </div>
  );
};