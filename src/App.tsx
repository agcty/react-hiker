import React, { useState } from "react";

import Hiker from "@components/Hiker";

import logo from "./logo.svg";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Walkthrough Example!</p>

        <Hiker>
          <Hiker.Step id="1">Test1</Hiker.Step>

          <Hiker.Step id="2">Test2</Hiker.Step>

          <Hiker.Step id="3">Test3</Hiker.Step>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <Hiker.Button>
              {({ back }) => (
                <button
                  type="button"
                  style={{ marginTop: "60px" }}
                  onClick={() => {
                    back();
                  }}
                >
                  Back
                </button>
              )}
            </Hiker.Button>

            <Hiker.Button>
              {({ next }) => (
                <button
                  type="button"
                  style={{ marginTop: "60px" }}
                  onClick={() => {
                    next();
                  }}
                >
                  Next
                </button>
              )}
            </Hiker.Button>
          </div>
        </Hiker>
      </header>
    </div>
  );
}

export default App;
