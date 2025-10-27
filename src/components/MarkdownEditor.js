import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor() {
  const [text, setText] = useState(
    `# Hello!\n\nType *Markdown* here.\n\n- Try a list\n- **Bold** text\n\n1. Numbered\n2. Items`
  );

  const [preview, setPreview] = useState(text);
  const [loading, setLoading] = useState(false);

 
  useEffect(() => {
    setLoading(true);

    const t = setTimeout(() => {
      setPreview(text);
      setLoading(false);
    }, 300); 

    return () => clearTimeout(t);
  }, [text]);

  return (
    <div style={{ display: "flex", width: "100%", height: "100%" }}>
     
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type your Markdown here..."
      />

      <div className="preview-wrapper" style={{ width: "50%", padding: 12 }}>
        {loading && <div className="loading">Rendering preview...</div>}
        <div className="preview" aria-live="polite">
          <ReactMarkdown>{preview}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
