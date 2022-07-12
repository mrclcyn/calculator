export const handleNum = (display, setDisplay, num) => {
  display.length < 20
    ? display === "0"
      ? setDisplay(num.toString())
      : setDisplay(display + num.toString())
    : alert("Oh! such a big number is not acceptable!");
};

export const handleClear = () => {};

export const handleNegation = (display, setDisplay) => {
  if (display[0] !== "-") {
    const newDisplay = display.unshift("-");
    setDisplay(newDisplay);
  } else {
    const newDisplay = display.shift();
  }
};
