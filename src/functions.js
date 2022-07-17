export const handleNum = (allTheStates, num) => {
  const { display, setDisplay } = allTheStates;
  display.length < 20
    ? display === "0"
      ? setDisplay(num.toString())
      : setDisplay(display + num.toString())
    : alert("Oh! such a big number is not acceptable!");
};

export const handleClear = () => {};

export const handleNegation = (allTheStates) => {
  const { display, setDisplay } = setDisplay((Number(display) * -1).toString());
};

export const handleFloat = (display, setDisplay) => {
  !display.includes(".") && setDisplay(display + ".");
};

export const handleSum = (display, setDisplay, memo, setMemo) => {
  if (display !== "0") {
    setMemo(Number(display));
    setDisplay("0");
  }
};

// export const handleClick = (btn) => {
//   if (Number(btn)) {
//     return btn;
//   }
// };
