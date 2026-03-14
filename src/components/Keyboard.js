import Key from "./Key";

export default function Keyboard({ layout, onKeyPress }) {
  return (
    <div className="keyboard-container">
      <div className="main-keyboard">

        {/* Row 1 – Matras */}
        <div className="row row13">
          {layout.matras.map(k =>
            <Key key={k} label={k} onPress={onKeyPress} />
          )}
        </div>

        {/* Row 2 – Vowels */}
        <div className="row row13">
          {layout.vowels.map(k =>
            <Key key={k} label={k} onPress={onKeyPress} />
          )}
        </div>

        {/* Rows 3-7 */}
        {layout.rows.map((r, i) => (
          <div className="row row5" key={i}>
            {r.map(k =>
              <Key key={k} label={k} onPress={onKeyPress} />
            )}
          </div>
        ))}

        {/* Row 8 */}
        <div className="row rowBottom">
          {layout.bottom.map(k =>
            <Key key={k} label={k} onPress={onKeyPress} />
          )}
        </div>

        {/* Numericals */}
        <div className="row rowDigits">
          {layout.digits.map(k =>
            <Key key={k} label={k} onPress={onKeyPress} />
          )}
        </div>
      </div>

      {/* Side Panel */}
      <div className="side-panel">
        {layout.side.map(k =>
          <Key key={k} label={k} onPress={onKeyPress} />
        )}
      </div>
    </div>
  )
}