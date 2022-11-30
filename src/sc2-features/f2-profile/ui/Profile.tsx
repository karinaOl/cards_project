import React from "react";
import { useAppDispatch, useAppSelector } from "../../../sc1-main/m2-bll/store";
import { Navigate } from "react-router-dom";
import { PATH } from "../../../sc1-main/m1-ui/Main/Pages";
import { logoutTC } from "../bll/profileReducer";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { EditableName } from "../../../sc1-main/m1-ui/common/EditableName/EditableName";
import { InputTypeFile } from "../../../sc1-main/m1-ui/common/InputTypeFile/InputTypeFile";

export const Profile = () => {
    const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
    const email = useAppSelector((state) => state.profile.email);
    const isLoading = useAppSelector((state) => state.app.isLoading);
    const dispatch = useAppDispatch();

    const logoutHandler = () => {
        dispatch(logoutTC());
    };

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />;

    return (
        <Grid container justifyContent={"center"}>
            <Paper style={{ padding: "10px 60px 50px 70px" }}>
                <div>
                    <h2>Personal information</h2>
                    <InputTypeFile />
                    <h3>
                        <EditableName />
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                        <span style={{ marginBottom: "15px" }}>{email}</span>
                        <Button variant="outlined" onClick={logoutHandler} disabled={isLoading}>
                            Logout
                        </Button>
                    </div>
                </div>
            </Paper>
        </Grid>
    );
};
