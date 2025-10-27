// MarkdownEditor.js
import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

/*
  - textarea className must be "textarea"
  - preview className must be "preview"
  - loading indicator className must be "loading 
  This component uses:
    - text: current typed text (two-way binding with textarea)
    - preview: what we render (updated via useEffect)
    - loading: true while preview is being prepared (small debounce)
*/

export default function MarkdownEditor() {
  const [text, setText] = useState(
    `# Hello!\n\nType *Markdown* here.\n\n- Try a list\n- **Bold** text\n\n1. Numbered\n2. Items`
  );

  const [preview, setPreview] = useState(text);
  const [loading, setLoading] = useState(false);

  // useEffect: update preview when text changes.
  // We add a small debounce (300ms) to show the loading indicator
  // and avoid updating on every single keystroke instantly.
  useEffect(() => {
    setLoading(true);

    const t = setTimeout(() => {
      setPreview(text);
      setLoading(false);
    }, 300); // 300ms debounce

    // cleanup if text changes again before timeout
    return () => clearTimeout(t);
  }, [text]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
      {/* Left: input textarea */}
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your Markdown here..."
      />

      {/* Right: preview */}
      <div className="preview-wrapper" style={{ width: "50%", padding: 12 }}>
        {loading && <div className="loading">Rendering preview...</div>}
        <div className="preview" aria-live="polite">
          <ReactMarkdown>{preview}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
