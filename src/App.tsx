import React, { useState } from "react";

import Walkthrough from "@components/Walkthrough";

import logo from "./logo.svg";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Walkthrough Example!</p>

        <Walkthrough>
          <Walkthrough.Step id="1">Test1</Walkthrough.Step>

          <Walkthrough.Step id="2">Test2</Walkthrough.Step>

          <Walkthrough.Step id="3">Test3</Walkthrough.Step>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <Walkthrough.Button>
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
            </Walkthrough.Button>

            <Walkthrough.Button>
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
            </Walkthrough.Button>
          </div>
        </Walkthrough>
      </header>
    </div>
  );
}

export default App;
