// All the logic of the React's useReducer hook happens here.
// The dispatch functions in App.js refer to the "case" here in
// the big "switch" conditional through "type" parameter.
//
//
//
// Initial state of the reducer

const initialState = {
  display: "0",
  memo: 0,
  eqMemo: 0,
  eqControl: false,
  operation: "none",
  clearDisplay: false,
  clearLastNumber: false,
};

// Removing extra digits after (result.percision)

function ParseFloat(num) {
  //
  // ** percision: the number of digits after floating point
  //
  const percision = 2;

  return num.includes(".")
    ? Number(num.slice(0, num.indexOf(".") + percision + 1))
    : num;
}

// Reducer's operations() function

export const operations = (prevState, action) => {
  //
  // Destructuring and renaming prevState elements

  let {
    display: prevDisplay,
    memo: prevMemo,
    eqMemo: prevEqMemo,
    eqControl,
    operation,
    clearDisplay,
    clearLastNumber,
  } = prevState;

  const operandsStatePortion = {
    ...prevState,
    memo: Number(prevDisplay),
    clearDisplay: true,
  };
  // "switch" decides based on (action.type) which comes from dispatch functions. For numbers, payload is being used which acts like normal props passing in React.

  switch (action.type) {
    //
    // Handling numeral keypad and setting (state.display) base on received payload

    case "NUMBER":
      if (prevDisplay.length < 18) {
        //
        // After an operation is done, the display must be altered with the first digit of the next number. Thus "clearDisplay".

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
            display:
              prevDisplay === "00"
                ? "0"
                : prevDisplay + action.payload.toString(),
            clearLastNumber: true,
          };
        }
      } else if (clearDisplay) {
        return {
          ...prevState,
          display: action.payload.toString(),
          clearDisplay: false,
          clearLastNumber: true,
        };
      } else {
        return {
          ...prevState,
        };
      }
    case "EQUAL":
      //
      // Setting a memory for the equal operand, so it can keep the last input before clicking "equal". "eqControl / prevEqControl" is the boolean controller who checks whether elementary arithmetic operands should initially act as equal in an intermediate trail of operations.

      let eqMemo = action.payload
        ? Number(prevDisplay)
        : !eqControl
        ? Number(prevDisplay)
        : prevEqMemo;

      const statePortion = {
        ...prevState,
        eqMemo,
        eqControl: !action.payload ? true : false,
        clearDisplay: false,
        // operation: "none",
      };
      //
      // SUMMATION result
      //
      if (operation === "sum") {
        const calcSum = () => {
          return ParseFloat((prevMemo + eqMemo).toString());
        };
        const sumResult = calcSum();

        return {
          ...statePortion,
          display: sumResult,
          memo: Number(sumResult),
        };
        //
        // SUBTRACTION result
        //
      } else if (operation === "sub") {
        const calcSub = () => {
          return ParseFloat((prevMemo - eqMemo).toString());
        };

        const subResult = calcSub();

        return {
          ...statePortion,
          display: subResult,
          memo: Number(subResult),
        };
        //
        // MULTIPLICATION result
        //
      } else if (operation === "mul") {
        const calcMul = () => {
          return ParseFloat((prevMemo * eqMemo).toString());
        };

        const mulResult = calcMul();

        return {
          ...statePortion,
          display: mulResult,
          memo: Number(mulResult),
        };
        //
        // DIVISION result
        //
      } else if (operation === "div") {
        const calcDiv = () => {
          return ParseFloat((prevMemo / eqMemo).toString());
        };

        const divResult = calcDiv();

        return {
          ...statePortion,
          display: divResult.toString(),
          memo: Number(divResult),
        };
      } else {
        return {
          ...prevState,
        };
      }
    //
    ///////////////// DISPATCH LOGICS FOR OPERANDS /////////////////
    //
    // Handling SUMMATION dispatch
    //

    case "SUMMATION":
      return {
        ...operandsStatePortion,
        operation: "sum",
      };
    //
    // Hendling SUBTRACTION dispatch
    //
    case "SUBTRACTION":
      return {
        ...operandsStatePortion,
        operation: "sub",
      };
    //
    // Hendling PERCENTAGE dispatch
    //
    case "PERCENTAGE":
      return {
        ...prevState,
        display: (Number(prevDisplay) / 100).toString(),
      };
    //
    // Hendling MULTIPLICATION dispatch
    //
    case "MULTIPLICATION":
      return {
        ...operandsStatePortion,
        operation: "mul",
      };
    //
    // Hendling DIVISION dispatch
    //
    case "DIVISION":
      return {
        ...operandsStatePortion,
        operation: "div",
      };
    //
    // Hendling clear screen (CLEAR dispatch)
    //
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
    //
    // Hendling NEGATION dispatch
    //
    case "NEGATION":
      return {
        ...prevState,
        display: (Number(prevDisplay) * -1).toString(),
      };
    //
    // Hendling FLOATING point
    //
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
