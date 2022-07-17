const initialState = {
  display: "0",
  memo: 0,
  eqMemo: 0,
  eqControl: false,
  operation: "none",
  clearDisplay: false,
  clearLastNumber: false,
};

export const operations = (prevState, action) => {
  const {
    display: prevDisplay,
    memo: prevMemo,
    eqMemo: prevEqMemo,
    eqControl: prevEqControl,
    operation,
    clearDisplay,
    clearLastNumber,
  } = prevState;

  switch (action.type) {
    case "NUMBER":
      if (prevDisplay.length < 15) {
        if (clearDisplay) {
          return {
            ...prevState,
            display: action.payload.toString(),
            clearDisplay: false,
            clearLastNumber: true,
          };
        } else {
          return {
            ...prevState,
            display: prevDisplay + action.payload.toString(),
            clearLastNumber: true,
          };
        }
      } else {
        return {
          ...prevState,
        };
      }
    case "EQUAL":
      const eqMemo = !prevEqControl ? Number(prevDisplay) : prevEqMemo;
      const statePortion = {
        ...prevState,
        eqMemo,
        eqControl: true,
        clearDisplay: false,
      };

      // SUMMATION

      if (operation === "sum") {
        const calcSum = () => {
          return (prevMemo + eqMemo).toString();
        };
        const sumResult = calcSum();

        return {
          ...statePortion,
          display: sumResult,
          memo: Number(sumResult),
        };

        // SUBTRACTION
      } else if (operation === "sub") {
        const calcSub = () => {
          return (prevMemo - eqMemo).toString();
        };
        const subResult = calcSub();

        return {
          ...statePortion,
          display: subResult,
          memo: Number(subResult),
        };

        // MULTIPLICATION
      } else if (operation === "mul") {
        const calcMul = () => {
          return (prevMemo * eqMemo).toString();
        };
        const mulResult = calcMul();

        return {
          ...statePortion,
          display: mulResult,
          memo: Number(mulResult),
        };
      } else if (operation === "div") {
        const calcDiv = () => {
          function ParseFloat(theNumber, percision) {
            theNumber = theNumber.toString();
            theNumber = theNumber.slice(
              0,
              theNumber.indexOf(".") + percision + 1
            );
            return Number(theNumber);
          }
          const final = ParseFloat(prevMemo / eqMemo, 2);
          return final;
        };
        const divResult = calcDiv();

        return {
          ...statePortion,
          display: divResult,
          memo: Number(divResult),
        };
      } else {
        return {
          ...prevState,
        };
      }
    case "SUMMATION":
      return {
        ...prevState,
        // eqControl: false,
        memo: Number(prevDisplay),
        operation: "sum",
        clearDisplay: true,
      };

    case "SUBTRACTION":
      return {
        ...prevState,
        memo: Number(prevDisplay),
        operation: "sub",
        clearDisplay: true,
      };

    case "MULTIPLICATION":
      return {
        ...prevState,
        memo: Number(prevDisplay),
        operation: "mul",
        clearDisplay: true,
      };
    case "DIVISION":
      return {
        ...prevState,
        memo: Number(prevDisplay),
        operation: "div",
        clearDisplay: true,
      };
    case "CLEAR":
      if (clearLastNumber) {
        return {
          ...prevState,
          display: "0",
          clearLastNumber: false,
        };
      } else {
        return initialState;
      }
    case "NEGATION":
      return {
        ...prevState,
        display: (Number(prevDisplay) * -1).toString(),
      };
    case "FLOATING":
      if (clearDisplay) {
        return {
          ...prevState,
          display: "0.",
          clearDisplay: false,
        };
      } else {
        return {
          ...prevState,
          display: !prevDisplay.includes(".") ? prevDisplay + "." : prevDisplay,
        };
      }
    default:
      return "Error";
  }
};
