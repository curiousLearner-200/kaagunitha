import { useState } from "react";

import Header from "./components/TitleBar";
import TextArea from "./components/TextArea";
import Keyboard from "./components/Keyboard";

import { kannadaLayout } from "./layouts/kannadaLayout";
import { transliterate } from "./engine/phonetic/kannada/phoneticEngine";

import "./App.css";

export default function App() {

  const [text, setText] = useState("");
  const [cursorPos, setCursorPos] = useState(0);
  const [fontSize, setFontSize] = useState(28);
  const [phonetic, setPhonetic] = useState(false);
  const [bufferText, setBufferText] = useState("");
  const [segmentStart, setSegmentStart] = useState(0);

  const increaseFont = () => setFontSize(f => f + 2);
  const decreaseFont = () => setFontSize(f => Math.max(16, f - 2));

  const applySegment = (buffer) => {
    const converted = transliterate(buffer);
    setText(prev => {
      const before = prev.slice(0, segmentStart);
      const after = prev.slice(cursorPos);
      return before + converted + after;
    });
    setCursorPos(segmentStart + converted.length);
  };

  const commitSegment = () => {
    if (bufferText === "") return;
    const converted = transliterate(bufferText);
    setText(prev => {
      const before = prev.slice(0, segmentStart);
      const after = prev.slice(cursorPos);
      return before + converted + after;
    });
    const newCursor = segmentStart + converted.length;
    setCursorPos(newCursor);
    setBufferText("");
    setSegmentStart(newCursor);
  };

  const insertAtCursor = (value) => { 
    setText(prev => {
      const before = prev.slice(0, cursorPos);
      const after = prev.slice(cursorPos);
      return before + value + after;
    });
    setCursorPos(pos => pos + value.length);
    setBufferText("");
    setSegmentStart(cursorPos + value.length);
  };

  const handleEnter = () => {
    commitSegment();
    insertAtCursor("\n");
    return;
  }

  const handleDelete = () => {
    setText(prev => {
      if (cursorPos >= prev.length) return prev;
  
      const before = prev.slice(0, cursorPos);
      const after = prev.slice(cursorPos + 1);
      return before + after;
    });
  
    setBufferText("");
    setSegmentStart(cursorPos);
  };

  const handleBackspace = () => {
    if (cursorPos === 0) return;
    setText(prev => {
      const before = prev.slice(0, cursorPos - 1);
      const after = prev.slice(cursorPos);
      return before + after;
    });
    const newPos = cursorPos - 1;
    setCursorPos(newPos);
    setBufferText("");
    setSegmentStart(newPos);
  };

  const handleTyping = (e) => {
    if (!phonetic) return;

    const key = e.key;
    if (key === "Enter") {
      e.preventDefault();
      handleEnter();
      return;
    }

    if (key === "Delete") {
      e.preventDefault();
      commitSegment();
      handleDelete();
      return;
    }
    
    if (
      key === "Shift" ||
      key === "Control" ||
      key === "Alt" ||
      key === "Meta" ||
      key === "CapsLock" ||
      key === "Tab" ||
      key === "Enter" ||
      key === "ArrowRight" ||
      key === "ArrowLeft" ||
      key === "ArrowDown" ||
      key === "ArrowUp" ||
      key === "Home"     
    ) {
      return;
    }

    if (key === "Backspace") {
      e.preventDefault();
      if (bufferText.length > 0) {
        const newBuffer = bufferText.slice(0, -1);
        setBufferText(newBuffer);
        applySegment(newBuffer);
      } else {
        handleBackspace();
      }
      return;
    }

    const isAlphabet = /^[a-zA-Z]$/.test(key);
    if (!isAlphabet) {
      e.preventDefault();
      commitSegment();
      insertAtCursor(key);
      return;
    }

    e.preventDefault();
    const newBuffer = bufferText + key;
    if (bufferText === "") {
      setSegmentStart(cursorPos);
    }
    setBufferText(newBuffer);
    applySegment(newBuffer);
  };

  const handleKeyPress = (key) => {
    commitSegment();
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

      <TextArea
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