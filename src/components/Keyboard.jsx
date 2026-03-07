import Key from "./Key";

export default function Keyboard({ layout, onKeyPress }) {

  return (
    <div className="keyboard">

      {layout.map((row, index) => (
        <div key={index} className="row">

          {row.map((key) => (
            <Key
              key={key}
              label={key}
              onClick={onKeyPress}
            />
          ))}

        </div>
      ))}

    </div>
  );

}