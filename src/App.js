import "./App.css";

import { useState } from "react";

import { handleNum, handleClear } from "./functions";

function App() {
  const [display, setDisplay] = useState("0");

  return (
    <div className="App">
      <div className="calculator">
        <header style={{ fontSize: display.length > 8 && "1.5rem" }}>
          {display}
        </header>
        <div className="first-row">
          <div onClick={() => handleClear()} className="col-25">
            AC | C
          </div>
          <div className="col-25">+/-</div>
          <div className="col-25">%</div>
          <div className="col-25">/</div>
        </div>
        <div className="second-row">
          <div
            onClick={() => handleNum(display, setDisplay, 7)}
            className="col-25"
          >
            7
          </div>
          <div
            onClick={() => handleNum(display, setDisplay, 8)}
            className="col-25"
          >
            8
          </div>
          <div
            onClick={() => handleNum(display, setDisplay, 9)}
            className="col-25"
          >
            9
          </div>
          <div className="col-25">X</div>
        </div>
        <div className="third-row">
          <div
            onClick={() => handleNum(display, setDisplay, 4)}
            className="col-25"
          >
            4
          </div>
          <div
            onClick={() => handleNum(display, setDisplay, 5)}
            className="col-25"
          >
            5
          </div>
          <div
            onClick={() => handleNum(display, setDisplay, 6)}
            className="col-25"
          >
            6
          </div>
          <div className="col-25">-</div>
        </div>
        <div className="forth-row">
          <div
            onClick={() => handleNum(display, setDisplay, 1)}
            className="col-25"
          >
            1
          </div>
          <div
            onClick={() => handleNum(display, setDisplay, 2)}
            className="col-25"
          >
            2
          </div>
          <div
            onClick={() => handleNum(display, setDisplay, 3)}
            className="col-25"
          >
            3
          </div>
          <div className="col-25">+</div>
        </div>
        <div className="fifth-row">
          <div
            onClick={() => handleNum(display, setDisplay, 0)}
            className="col-50 leftAlign"
          >
            0
          </div>
          <div className="col-25">.</div>
          <div className="col-25">=</div>
        </div>
      </div>
    </div>
  );
}

export default App;
