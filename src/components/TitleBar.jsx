import React from "react";

export default function Header({
  increaseFont,
  decreaseFont,
  phonetic,
  setPhonetic
}) {

  return (
    <header className="header">

      <div className="logo-section">
        <div className="logo-title">ಕಾಗುಣಿತ</div>
        <div className="logo-subtitle">easy kannada keyboard</div>
      </div>

      <div className="header-controls">

        <button
          className="font-btn"
          onClick={decreaseFont}
        >
          A-
        </button>

        <button
          className="font-btn"
          onClick={increaseFont}
        >
          A+
        </button>
        <label className="toggle">
          <input
            type="checkbox"
            checked={phonetic}
            onChange={(e) => setPhonetic(e.target.checked)}
          />
          Phonetic
        </label>
      </div>

    </header>
  );
}