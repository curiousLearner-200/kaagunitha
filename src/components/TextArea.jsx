export default function TextArea({ text }) {

    return (
      <textarea
        value={text}
        readOnly
        rows={6}
        style={{width:"100%"}}
      />
    );
  
  }