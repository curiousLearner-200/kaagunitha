import { matras } from "../layouts/kannadaLayout";

export function processKey(currentText, key) {

  if(key === "space") return currentText + " ";

  if(key === "backspace")
    return currentText.slice(0, -1);

  return currentText + key;
}