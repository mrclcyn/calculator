import "./App.css";
import { useReducer } from "react";

import { operations } from "./operations";

function App() {
  // defining the reducer with an initial state

  const [state, dispatch] = useReducer(operations, {
    display: "0",
    memo: 0,
    eqMemo: 0,
    eqControl: false,
    operation: "none",
    clearDisplay: false,
    clearLastNumber: false,
  });
  console.log(state);

  // dispatch functions

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
            {state.clearLastNumber ? "C" : "AC"}
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
