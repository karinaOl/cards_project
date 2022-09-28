import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Main} from "./Main/Main";

function App() {
  return (
    <div className="App">
      <HashRouter>
          <Main/>
      </HashRouter>
    </div>
  );
}

export default App;
