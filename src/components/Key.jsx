export default function Key({ label, onPress }) {

  let cls = "key";

  if (label === "space") cls += " space";
  if (label === "backspace") cls += " backspace";

  const display = label === "space" ? "Space" :
    label === "backspace" ? "⌫" :
      label;

  return (

    <button
      className={cls}
      onClick={() => onPress(label)}
    >
      {display}
    </button>

  )

}