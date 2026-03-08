import { useState } from "react";

import Header from "./components/TitleBar";
import TextEditor from "./components/TextArea";
import Keyboard from "./components/Keyboard";

import { kannadaLayout } from "./layouts/kannadaLayout";
import { processKey } from "./typing_engine/kannadaEngine";
import { transliterate } from "./engine/phonetic/kannada/phoneticEngine";
import "./App.css";

export default function App() {

  const [text, setText] = useState("");

  const [cursorPos, setCursorPos] = useState(0);

  const [fontSize, setFontSize] = useState(28);

  const increaseFont = () => setFontSize(f => f + 2);
  const decreaseFont = () => setFontSize(f => Math.max(16, f - 2));
  const [phonetic,setPhonetic]=useState(false);
  const [latinBuffer,setLatinBuffer]=useState("");

  const handleTyping = (e) => {
    if (!phonetic) return;
    const key = e.key;
    if (key === "Backspace") {
      e.preventDefault();
      const newBuffer = latinBuffer.slice(0, -1);
      setLatinBuffer(newBuffer);
      const kannada = transliterate(newBuffer);
      setText(kannada);
      return;
    }
  
    if (key === " ") {
      e.preventDefault();
      const newBuffer = latinBuffer + " ";
      setLatinBuffer(newBuffer);
      const kannada = transliterate(newBuffer);
      setText(kannada);
      return;
    }
  
    if (key.length !== 1) return;
  
    e.preventDefault();
    const newBuffer = latinBuffer + key;
    setLatinBuffer(newBuffer);
    const kannada = transliterate(newBuffer);
    setText(kannada);
  
  };

  const insertAtCursor = (value) => {
    const before = text.slice(0, cursorPos);
    const after = text.slice(cursorPos);
    const newText = before + value + after;
    setText(newText);
    setCursorPos(cursorPos + value.length);
  };


  const handleBackspace = () => {

    if (cursorPos === 0) return;

    const before = text.slice(0, cursorPos - 1);
    const after = text.slice(cursorPos);

    setText(before + after);

    setCursorPos(cursorPos - 1);
  };


  const handleKeyPress = (key) => {

    if (key === "space") {
      insertAtCursor(" ");
      return;
    }

    if (key === "backspace") {
      handleBackspace();
      return;
    }

    insertAtCursor(key);
  };


  return (

    <div className="app">

      <Header
        increaseFont={increaseFont}
        decreaseFont={decreaseFont}
        phonetic={phonetic}
        setPhonetic={setPhonetic}
      />

      <TextEditor
        text={text}
        setText={setText}
        fontSize={fontSize}
        setCursorPosition={setCursorPos}
        handleTyping={handleTyping}
      />

      <Keyboard
        layout={kannadaLayout}
        onKeyPress={handleKeyPress}
      />

    </div>

  );

}