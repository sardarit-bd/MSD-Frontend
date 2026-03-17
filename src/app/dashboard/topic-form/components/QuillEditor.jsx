"use client";

import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

export default function QuillEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const init = async () => {
      const Quill = (await import("quill")).default;

      if (quillRef.current) return;

      const quill = new Quill(editorRef.current, {
        theme: "snow",
        placeholder: "Write something...",
      });

      // Set initial value
      if (value) {
        quill.root.innerHTML = value;
      }

      // Listen for changes
      quill.on("text-change", () => {
        onChange?.(quill.root.innerHTML); // send HTML
      });

      quillRef.current = quill;
    };

    init();
  }, []);

  return <div ref={editorRef} style={{ height: "250px" }} />;
}