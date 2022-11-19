import React, { useEffect } from "react";
import style from "./Profile.module.css";
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
    const dispatch = useAppDispatch();
    const avatar = useAppSelector((state) => state.profile.avatar);

    const logoutHandler = () => {
        dispatch(logoutTC());
    };

    useEffect(() => {}, [dispatch, avatar]);

    if (!isLoggedIn) return <Navigate to={PATH.LOGIN} />;

    return (
        <Grid container justifyContent={"center"}>
            <Paper style={{ padding: "0 70px 20px" }}>
                <div className={style.profile}>
                    <h1>Personal information</h1>
                    <div>
                        <img className={style.profileImg} src={avatar!!} alt="profileImg" />
                        <InputTypeFile />
                    </div>
                    <h3>
                        <EditableName />
                    </h3>
                    <p>{email}</p>
                    <Button variant="outlined" onClick={logoutHandler}>
                        Logout
                    </Button>
                </div>
            </Paper>
        </Grid>
    );
};
