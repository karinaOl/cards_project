import React, { useEffect } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import { Main } from "./Main/Main";
import ButtonAppBar from "./Main/ButtonAppBar";
import { ErrorSnackbar } from "./common/ErrorSnackbar/ErrorSnackbar";
import { CircularProgress, LinearProgress } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../m2-bll/store";
import { initializeAppTC } from "../m2-bll/appReducer";

export const App = () => {
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const isInitialized = useAppSelector((state) => state.app.isInitialized);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC());
    }, [dispatch]);

    if (!isInitialized) {
        return (
            <div className="circularProgress">
                <CircularProgress />
            </div>
        );
    }

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
