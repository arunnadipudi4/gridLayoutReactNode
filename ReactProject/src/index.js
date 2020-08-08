import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

import SearchContainer from "./Components/Container/SearchContainer";

function App() {
  return (
    <div className="App">
      <SearchContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
