import React from "react";

export default function Header({ increaseFont, decreaseFont }) {

  return (
    <header className="header">

      <div className="logo-section">
        <div className="logo-title">Kaagunitha</div>
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

      </div>

    </header>
  );
}