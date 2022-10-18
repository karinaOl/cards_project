import React from 'react';
import './App.css';
import {HashRouter} from "react-router-dom";
import {Main} from "./Main/Main";
import ButtonAppBar from "./Main/ButtonAppBar";
import {ErrorSnackbar} from "./common/ErrorSnackbar/ErrorSnackbar";

function App() {
    return (
        <div className="App">
            <HashRouter>
                <ButtonAppBar/>
                <ErrorSnackbar/>
                <Main/>
            </HashRouter>
        </div>
    );
}

export default App;
