export const logUnicode = (char) => {
    if (char.length > 0){
    const code = char.codePointAt(0)
      .toString(16)
      .toUpperCase()
      .padStart(4,"0");
  
    console.log(`${char}  U+${code}`);
    }
  };