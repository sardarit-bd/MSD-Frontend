"use client"
import { useState } from "react";
import QuillEditor from "./QuillEditor";
import { Label, Textarea } from "./TinyUI/tinyUI";

export const TextBlockEditor = ({ value, onChange }) => {
 const [content, setContent] = useState("");
 console.log(content)
    return (
        <div>
            <Label>HTML Content</Label>
            {/* <Textarea
      rows={6}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="<p class='text-sm text-gray-800'>Paste HTML content here...</p>"
      className="font-mono text-xs"
    /> */}
    <QuillEditor value={content} onChange={setContent} />

      <h3>Preview:</h3>
      <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
    )
};