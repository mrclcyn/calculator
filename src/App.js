import "./App.css";
import github from "./github.svg";

import { useReducer, useState } from "react";
import { operations } from "./operations";

function App() {
  //
  // STYLING STATE: to keep elementary operands selected before the result is being reached

  const [selected, setSelected] = useState({
    sum: false,
    sub: false,
    mul: false,
    div: false,
  });

  // DEFINITION OF THE REDUCER WITH AN INITIAL STATE

  const [state, dispatch] = useReducer(operations, {
    display: "0",
    memo: 0,
    eqMemo: 0,
    eqControl: false,
    operation: "none",
    clearDisplay: false,
    clearLastNumber: false,
  });

  // DISPATCH FUNCTIONS

  const equal = (intermediate) => {
    setSelected({
      sum: false,
      sub: false,
      mul: false,
      div: false,
    });
    dispatch({ type: "EQUAL", payload: intermediate || false });
  };
  const enterNumber = (num) => dispatch({ type: "NUMBER", payload: num });
  const clearDisplay = () => {
    !state.clearLastNumber &&
      setSelected({
        sum: false,
        sub: false,
        mul: false,
        div: false,
      });
    dispatch({ type: "CLEAR" });
  };
  const negation = () => dispatch({ type: "NEGATION" });
  const summation = () => {
    equal(true);
    setSelected({ sum: true });
    dispatch({ type: "SUMMATION" });
  };
  const subtraction = () => {
    equal(true);
    setSelected({ sub: true });
    dispatch({ type: "SUBTRACTION" });
  };
  const multiplication = () => {
    equal(true);
    setSelected({ mul: true });
    dispatch({ type: "MULTIPLICATION" });
  };
  const division = () => {
    equal(true);
    setSelected({ div: true });
    dispatch({ type: "DIVISION" });
  };
  const floating = () => dispatch({ type: "FLOATING" });
  const percentage = () => dispatch({ type: "PERCENTAGE" });

  // CONDITIONAL DEFINITION OF "DISPLAY": to limit the length

  let display =
    state.display.length > 17 && !state.display.includes(".")
      ? "Infinity"
      : state.display;

  // THE CALCULATOR VIEW
  //
  console.log(state);
  return (
    <div className="App">
      <div className="calculator">
        <header style={{ fontSize: display.length > 8 && "1.5rem" }}>
          {display.length > 1 && display[0] === "0" && display[1] !== "."
            ? display.slice(1)
            : display}
        </header>

        <div className="first-row">
          <div onClick={() => clearDisplay()} className="col-25">
            {state.clearLastNumber ? "C" : "AC"}
          </div>
          <div onClick={() => negation()} className="col-25">
            ±
          </div>
          <div onClick={() => percentage()} className="col-25">
            %
          </div>
          <div
            style={{ backgroundColor: selected.div && "#2d333b69" }}
            onClick={() => division()}
            className="col-25"
          >
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
          <div
            style={{ backgroundColor: selected.mul && "#2d333b69" }}
            onClick={() => multiplication()}
            className="col-25"
          >
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
          <div
            style={{ backgroundColor: selected.sub && "#2d333b69" }}
            onClick={() => subtraction()}
            className="col-25"
          >
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
            style={{ backgroundColor: selected.sum && "#2d333b69" }}
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
      <div className="copyright">
        <a
          className="github-icon"
          href="https://github.com/mrclcyn/calculator"
          target="_blank"
          rel="noreferrer"
        >
          <img src={github} alt="GitHub Repo of the project" />
        </a>
        <br />
        Made by{" "}
        <div className="mrclcyn-ct">
          <a
            className="mrclcyn"
            href="https://github.com/mrclcyn"
            target="_blank"
            rel="noreferrer"
          >
            mrclcyn
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
