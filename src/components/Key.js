import { MdSpaceBar } from "react-icons/md";
import { MdBackspace } from "react-icons/md";

export default function Key({ label, onPress }) {

  let cssClassName = "key";

  if (label === "space") cssClassName += " space";
  if (label === "backspace") cssClassName += " backspace";

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
      className={cssClassName}
      onClick={() => onPress(label)}
    >
      {display}
    </button>
  );
}