import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Main} from "./Main/Main";
import ButtonAppBar from "./Main/ButtonAppBar";

function App() {
  return (
    <div className="App">
      <HashRouter>
          <ButtonAppBar/>
          <Main/>
      </HashRouter>
    </div>
  );
}

export default App;
