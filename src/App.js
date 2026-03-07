import { useState } from "react";
import TitleBar from "./components/TitleBar";
import TextArea from "./components/TextArea";
import Keyboard from "./components/Keyboard";

import { kannadaLayout } from "./layouts/kannadaLayout";
import { processKey } from "./typing_engine/kannadaEngine";

import "./App.css";

export default function App() {

  const [text, setText] = useState("");

  function handleKeyPress(key){

    const newText = processKey(text, key);
    setText(newText);

  }

  return (

    <div className="app">

      <TitleBar />

      <TextArea text={text} />

      <Keyboard
        layout={kannadaLayout}
        onKeyPress={handleKeyPress}
      />

    </div>

  );

}