import { useState } from "react";

import Header from "./components/TitleBar";
import TextEditor from "./components/TextArea";
import Keyboard from "./components/Keyboard";

import { kannadaLayout } from "./layouts/kannadaLayout";
import { transliterate } from "./engine/phonetic/kannada/phoneticEngine";

import "./App.css";

export default function App(){

  const [text,setText]=useState("");
  const [cursorPos,setCursorPos]=useState(0);
  const [fontSize,setFontSize]=useState(28);

  const [phonetic,setPhonetic]=useState(false);

  /* phonetic IME state */

  const [latinBuffer,setLatinBuffer]=useState("");
  const [segmentStart,setSegmentStart]=useState(0);

  /* ---------- FONT ---------- */

  const increaseFont=()=>setFontSize(f=>f+2);
  const decreaseFont=()=>setFontSize(f=>Math.max(16,f-2));

  /* ---------- APPLY SEGMENT (LIVE PREVIEW) ---------- */

  const applySegment=(buffer)=>{

    const converted = transliterate(buffer);

    setText(prev=>{
      const before = prev.slice(0,segmentStart);
      const after = prev.slice(cursorPos);
      return before + converted + after;
    });

    setCursorPos(segmentStart + converted.length);
  };

  /* ---------- COMMIT SEGMENT ---------- */

  const commitSegment=()=>{

    if(latinBuffer==="") return;

    const converted = transliterate(latinBuffer);

    setText(prev=>{
      const before = prev.slice(0,segmentStart);
      const after = prev.slice(cursorPos);
      return before + converted + after;
    });

    const newCursor = segmentStart + converted.length;

    setCursorPos(newCursor);

    setLatinBuffer("");
    setSegmentStart(newCursor);
  };

  /* ---------- INSERT TEXT ---------- */

  const insertAtCursor=(value)=>{

    setText(prev=>{
      const before = prev.slice(0,cursorPos);
      const after = prev.slice(cursorPos);
      return before + value + after;
    });

    setCursorPos(pos=>pos + value.length);

    setLatinBuffer("");
    setSegmentStart(cursorPos + value.length);
  };

  /* ---------- BACKSPACE ---------- */

  const handleBackspace=()=>{

    if(cursorPos===0) return;

    setText(prev=>{
      const before = prev.slice(0,cursorPos-1);
      const after = prev.slice(cursorPos);
      return before + after;
    });

    const newPos = cursorPos-1;

    setCursorPos(newPos);

    setLatinBuffer("");
    setSegmentStart(newPos);
  };

  /* ---------- PHYSICAL KEYBOARD ---------- */

  const handleTyping=(e)=>{

    if(!phonetic) return;

    const key = e.key;
    if(
      key === "Shift" ||
      key === "Control" ||
      key === "Alt" ||
      key === "Meta" ||
      key === "CapsLock" ||
      key === "Tab" ||
      key === "Enter" ||
      key === "ArrowRight" ||
      key === "ArrowLeft"
    ){
      return;
    }

    /* BACKSPACE */

    if(key==="Backspace"){

      e.preventDefault();

      if(latinBuffer.length>0){

        const newBuffer = latinBuffer.slice(0,-1);

        setLatinBuffer(newBuffer);

        applySegment(newBuffer);

      }else{

        handleBackspace();

      }

      return;
    }

    /* ALPHABET CHECK */

    const isAlphabet = /^[a-zA-Z]$/.test(key);

    /* COMMIT BOUNDARY (ANY NON LETTER) */

    if(!isAlphabet){

      e.preventDefault();

      commitSegment();

      insertAtCursor(key);

      return;
    }

    /* PHONETIC INPUT */

    e.preventDefault();

    const newBuffer = latinBuffer + key;

    if(latinBuffer===""){
      setSegmentStart(cursorPos);
    }

    setLatinBuffer(newBuffer);

    applySegment(newBuffer);
  };

  /* ---------- VIRTUAL KEYBOARD ---------- */

  const handleKeyPress=(key)=>{

    commitSegment();

    if(key==="space"){
      insertAtCursor(" ");
      return;
    }

    if(key==="backspace"){
      handleBackspace();
      return;
    }

    insertAtCursor(key);
  };

  return(

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