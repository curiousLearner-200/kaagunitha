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