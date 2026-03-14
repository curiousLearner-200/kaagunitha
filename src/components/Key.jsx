import { MdSpaceBar } from "react-icons/md";
import { MdBackspace } from "react-icons/md";

export default function Key({ label, onPress }) {

  let cls = "key";

  if (label === "space") cls += " space";
  if (label === "backspace") cls += " backspace";

  let display;

  if (label === "space") {
    display = <MdSpaceBar size={22} />;
  } 
  else if (label === "backspace") {
    display = <MdBackspace size={22} />;
  } 
  else {
    display = label;
  }

  return (
    <button
      className={cls}
      onClick={() => onPress(label)}
    >
      {display}
    </button>
  );
}