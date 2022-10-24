import React from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Main } from "./Main/Main";
import ButtonAppBar from "./Main/ButtonAppBar";
import { ErrorSnackbar } from "./common/ErrorSnackbar/ErrorSnackbar";
import { LinearProgress } from "@mui/material";
import { useAppSelector } from "../m2-bll/store";

export const App = () => {
    const isLoading = useAppSelector((state) => state.app.isLoading);

    return (
        <div className="App">
            <HashRouter>
                <ButtonAppBar />
                {isLoading && <LinearProgress />}
                <ErrorSnackbar />
                <Main />
            </HashRouter>
        </div>
    );
};
