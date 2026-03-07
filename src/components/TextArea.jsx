import { useRef } from "react";

export default function TextEditor({
  text,
  setText,
  fontSize,
  setCursorPosition
}) {

  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSelect = () => {
    const pos = textareaRef.current.selectionStart;
    setCursorPosition(pos);
  };

  return (

    <div className="editor-container">

      <textarea
        ref={textareaRef}
        className="editor"
        value={text}
        onChange={handleChange}
        onClick={handleSelect}
        onKeyUp={handleSelect}
        style={{ fontSize: `${fontSize}px` }}
      />

    </div>

  );
}