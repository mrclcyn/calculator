import "./App.css";

// import { useState, useEffect } from "react";
import { useReducer } from "react";

const initialState = {
  display: "0",
  memo: 0,
  eqMemo: 0,
  eqControl: false,
  operation: "none",
  clearDisplay: false,
};

const operations = (prevState, action) => {
  const {
    display: prevDisplay,
    memo: prevMemo,
    eqMemo: prevEqMemo,
    eqControl: prevEqControl,
    operation: prevOperation,
    clearDisplay: prevClearDisplay,
  } = prevState;
  switch (action.type) {
    case "NUMBER":
      if (prevDisplay.length < 15) {
        if (prevClearDisplay) {
          return {
            ...prevState,
            display: action.payload.toString(),
            clearDisplay: false,
          };
        } else {
          return {
            ...prevState,
            display: prevDisplay + action.payload.toString(),
          };
        }
      } else {
        return {
          ...prevState,
        };
      }
    case "EQUAL":
      if (prevOperation === "sum") {
        // if (prevState.eqControl === false) {

        const calcSum = () => {
          return (prevMemo + Number(prevDisplay)).toString();
        };
        const sumResult = calcSum();

        return {
          ...prevState,
          display: sumResult,
          eqControl: true,
          clearDisplay: false,
        };
        // } else {

        //   return {
        //     ...prevState,
        //     display: newDisplay,
        //     memo: Number(newDisplay),
        //   };
        // }
      } else if (prevOperation === "sub") {
        const calcSub = () => {
          return (prevMemo - Number(prevDisplay)).toString();
        };
        const subResult = calcSub();

        return {
          ...prevState,
          display: subResult,
          eqControl: true,
        };
      } else if (prevOperation === "mul") {
        const calcMul = () => {
          return (prevMemo * Number(prevDisplay)).toString();
        };
        const mulResult = calcMul();

        return {
          ...prevState,
          display: mulResult,
          eqControl: true,
        };
      } else if (prevOperation === "div") {
        const calcDiv = () => {
          function ParseFloat(theNumber, percision) {
            theNumber = theNumber.toString();
            theNumber = theNumber.slice(
              0,
              theNumber.indexOf(".") + percision + 1
            );
            return Number(theNumber);
          }
          const final = ParseFloat(prevMemo / Number(prevDisplay), 3);
          return final;
        };
        const divResult = calcDiv();

        return {
          ...prevState,
          display: divResult,
          eqControl: true,
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
      return initialState;
    case "NEGATION":
      return {
        ...prevState,
        display: (Number(prevDisplay) * -1).toString(),
      };
    case "FLOATING":
      if (prevClearDisplay) {
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

function App() {
  const [state, dispatch] = useReducer(operations, initialState);
  console.log(state);

  const equal = () => dispatch({ type: "EQUAL", payload: state });

  const enterNumber = (num) => dispatch({ type: "NUMBER", payload: num });

  const clearDisplay = () => dispatch({ type: "CLEAR" });

  const negation = () => dispatch({ type: "NEGATION" });

  const summation = () => dispatch({ type: "SUMMATION", payload: equal });

  const subtraction = () => dispatch({ type: "SUBTRACTION", payload: equal });

  const multiplication = () =>
    dispatch({ type: "MULTIPLICATION", payload: equal });

  const division = () => dispatch({ type: "DIVISION", payload: equal });

  const floating = () => dispatch({ type: "FLOATING" });

  return (
    <div className="App">
      <div className="calculator">
        <header style={{ fontSize: state.display.length > 8 && "1.5rem" }}>
          {state.display.length > 1 &&
          state.display[0] === "0" &&
          state.display[1] !== "."
            ? state.display.slice(1)
            : state.display}
        </header>
        <div className="first-row">
          <div onClick={() => clearDisplay()} className="col-25">
            AC | C
          </div>
          <div onClick={() => negation()} className="col-25">
            ±
          </div>
          <div className="col-25">%</div>
          <div onClick={() => division()} className="col-25">
            ÷
          </div>
        </div>
        <div className="second-row">
          <div onClick={() => enterNumber(7)} className="col-25">
            7
          </div>
          <div onClick={() => enterNumber(8)} className="col-25">
            8
          </div>
          <div onClick={() => enterNumber(9)} className="col-25">
            9
          </div>
          <div onClick={() => multiplication()} className="col-25">
            ×
          </div>
        </div>
        <div className="third-row">
          <div onClick={() => enterNumber(4)} className="col-25">
            4
          </div>
          <div onClick={() => enterNumber(5)} className="col-25">
            5
          </div>
          <div onClick={() => enterNumber(6)} className="col-25">
            6
          </div>
          <div onClick={() => subtraction()} className="col-25">
            -
          </div>
        </div>
        <div className="forth-row">
          <div onClick={() => enterNumber(1)} className="col-25">
            1
          </div>
          <div onClick={() => enterNumber(2)} className="col-25">
            2
          </div>
          <div onClick={() => enterNumber(3)} className="col-25">
            3
          </div>
          <div
            // style={{ backgroundColor: operation.sum && "#2d333b69" }}
            onClick={() => summation()}
            className="col-25"
          >
            +
          </div>
        </div>
        <div className="fifth-row">
          <div onClick={() => enterNumber(0)} className="col-50 leftAlign">
            0
          </div>
          <div onClick={() => floating()} className="col-25">
            .
          </div>
          <div onClick={() => equal()} className="col-25">
            =
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
