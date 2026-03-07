export default function TextEditor({text}) {

  return (
    <div className="editor-container">

      <textarea
        className="editor"
        value={text}
        readOnly
      />

    </div>
  );

}