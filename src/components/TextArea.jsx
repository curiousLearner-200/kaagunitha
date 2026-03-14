export default function TextArea({
  text,
  setText,
  fontSize,
  setCursorPosition,
  handleTyping
}) {
  return (
    <div className="editor-container">
      <textarea
        className="editor"
        id="textArea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onClick={(e) => setCursorPosition(e.target.selectionStart)}
        onKeyUp={(e) => setCursorPosition(e.target.selectionStart)}
        onKeyDown={handleTyping}
        style={{ fontSize: `${fontSize}px` }}
      />
    </div>
  );
}