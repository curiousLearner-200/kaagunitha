export const logUnicode = (text) => {
  if (!text) return;

  for (const char of text) {
    const code = char
      .codePointAt(0)
      .toString(16)
      .toUpperCase()
      .padStart(4, "0");

    console.log(`${char}  U+${code}`);
  }
};

export const copyAll = () => {
  // Get the text field
  var transliteratedText = document.getElementById("textArea");

  // Select the text field
  transliteratedText.select();

   // Copy the text inside the text field
  navigator.clipboard.writeText(transliteratedText.value);

  // Alert the copied text
  alert("Copied text to clipboard");
}