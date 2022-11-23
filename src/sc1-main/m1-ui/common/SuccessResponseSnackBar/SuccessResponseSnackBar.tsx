import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { useAppSelector } from "../../../m2-bll/store";
import { setResponseMessageAC } from "../../../m2-bll/appReducer";
import { useDispatch } from "react-redux";
import { Alert } from "../ErrorSnackbar/ErrorSnackbar";

export const SuccessResponseSnackBar = () => {
    const dispatch = useDispatch();
    const responseMessage = useAppSelector((state) => state.app.responseMessage);

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setResponseMessageAC(null));
    };
    return (
        <Snackbar open={responseMessage !== null} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
                {responseMessage}
            </Alert>
        </Snackbar>
    );
};
