import { emptyIntroBlock } from "../page";

const { BlockEditor } = require("./BlockEditor");
const { AddBtn } = require("./TinyUI/tinyUI");

const INTRO_BLOCK_TYPES = ["text_block", "image_card"];

export const StepIntro = ({ form, setForm }) => {
  const updateBlock = (i, block) => {
    const intro = [...form.intro];
    intro[i] = block;
    setForm({ ...form, intro });
  };
  const removeBlock = (i) => setForm({ ...form, intro: form.intro.filter((_, idx) => idx !== i) });
  const addBlock = () => setForm({ ...form, intro: [...form.intro, emptyIntroBlock()] });

  return (
    <div className="space-y-4">
      {form.intro.map((block, i) => (
        <BlockEditor
          key={block._id}
          block={block}
          label={`Intro Block ${i + 1}`}
          typeOptions={INTRO_BLOCK_TYPES}
          onChange={(b) => updateBlock(i, b)}
          onRemove={form.intro.length > 1 ? () => removeBlock(i) : undefined}
        />
      ))}
      <AddBtn onClick={addBlock}>Add Intro Block</AddBtn>
    </div>
  );
};