import "./App.css";

import { useState } from "react";

import Output from "./components/Output";
import Btns from "./components/Btns";

const App = () => {
  const [display, setDisplay] = useState("0");
  const [chosenBtn, setChosenBtn] = useState("none");

  console.log(chosenBtn);

  return (
    <div className="App">
      <div className="calculator">
        <Output display={display} setDisplay={setDisplay} />
        <Btns chosenBtn={chosenBtn} setChosenBtn={setChosenBtn} />
      </div>
    </div>
  );
};

export default App;



//

//

//

//

//

// MUST DEFINE ALL THE STATES IN ONE OBJECT STATE: https://www.w3schools.com/REACT/react_usestate.asp

//

//

//

//

//

//

//
import "./App.css";

import { useState, useEffect } from "react";

function App() {
  const [display, setDisplay] = useState("0");
  const [memo, setMemo] = useState(0);
  const [eqMemo, setEqMemo] = useState(0);
  const [eqMemoControl, setEqMemoControl] = useState(false);
  const [operation, setOperation] = useState("none");
  const [clearDisplay, setClearDisplay] = useState(false);

  const handleNumber = (num) => {
    if (display.length < 20) {
      if (clearDisplay) {
        setDisplay(num.toString());
        setClearDisplay(false);
      } else {
        setDisplay(display + num.toString());
      }
    } else alert("Oh! Such a big number is not acceptable!");
  };

  const handleNegation = () => {
    setDisplay((Number(display) * -1).toString());
  };

  const handleFloat = () => {
    !display.includes(".") && setDisplay(display + ".");
  };

  const handleSummation = () => {
    setEqMemoControl(false);
    setMemo(Number(display));
    handleEqual();
    setOperation("sum");
    setClearDisplay(true);
  };

  useEffect(() => {}, [memo]);

  // const handleSubtraction = () => {
  //   handleEqual();
  //   setMemo(Number(display));
  //   setOperation("sub");
  //   // setDisplay("0");
  // };

  const handleEqual = () => {
    if (operation === "sum") {
      if (eqMemoControl === false) {
        setEqMemo(Number(display));
        setDisplay((memo + eqMemo).toString());
        setEqMemoControl(true);
      } else {
        setMemo(() => Number(() => setDisplay((memo + eqMemo).toString())));
      }
    }
    // operation === "sub" && setDisplay((memo - Number(display)).toString());
  };

  // const handleOperation = () => {
  //   if (operation !== "none") {
  //     setMemo(Number(display));
  //   }
  //   if (operation === "sum") {
  //     setDisplay((memo + Number(display)).toString());
  //     setMemo(Number(display));
  //   }
  // };

  const handleClear = () => {
    setDisplay("0");
  };

  console.log(
    `operation:${operation}\nmemo:${memo}\neqMemo:${eqMemo}\neqMemoControl:${eqMemoControl}\ndisplay:${display}`
  );

  useEffect(() => {
    // MUST BE CHECKED FOR MINUS FLOAT NUMBERS BETWEEN 0 AND -1 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if (display.length > 1 && display[0] === "0" && display[1] !== ".") {
      setDisplay(display.slice(1));
    }
  }, [display]);

  useEffect(() => {}, [operation, memo, display]);

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
          <div onClick={() => handleNegation()} className="col-25">
            +/-
          </div>
          <div className="col-25">%</div>
          <div className="col-25">/</div>
        </div>
        <div className="second-row">
          <div onClick={() => handleNumber(7)} className="col-25">
            7
          </div>
          <div onClick={() => handleNumber(8)} className="col-25">
            8
          </div>
          <div onClick={() => handleNumber(9)} className="col-25">
            9
          </div>
          <div className="col-25">X</div>
        </div>
        <div className="third-row">
          <div onClick={() => handleNumber(4)} className="col-25">
            4
          </div>
          <div onClick={() => handleNumber(5)} className="col-25">
            5
          </div>
          <div onClick={() => handleNumber(6)} className="col-25">
            6
          </div>
          <div className="col-25">-</div>
        </div>
        <div className="forth-row">
          <div onClick={() => handleNumber(1)} className="col-25">
            1
          </div>
          <div onClick={() => handleNumber(2)} className="col-25">
            2
          </div>
          <div onClick={() => handleNumber(3)} className="col-25">
            3
          </div>
          <div
            // style={{ backgroundColor: operation.sum && "#2d333b69" }}
            onClick={() => handleSummation()}
            className="col-25"
          >
            +
          </div>
        </div>
        <div className="fifth-row">
          <div onClick={() => handleNumber(0)} className="col-50 leftAlign">
            0
          </div>
          <div onClick={() => handleFloat()} className="col-25">
            .
          </div>
          <div onClick={() => handleEqual()} className="col-25">
            =
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
